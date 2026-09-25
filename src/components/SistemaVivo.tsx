"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { textos, type Idioma } from "@/lib/i18n";
import { useMovimentoReduzido } from "@/lib/movimento";

/*
 * Peça central do Hero: a frase da bio ("fluxos que continuam de pé quando
 * uma peça falha") como um sistema que o visitante pode quebrar.
 *
 * Uma API publica ~2,2 mensagens por segundo numa fila consumida por dois
 * workers com prefetch 1. Derrubar um worker devolve a mensagem que estava
 * com ele para a fila (reentrega, como o RabbitMQ faz com o que não recebeu
 * ack). Cada worker dá conta de ~1,7 mensagem/s: um sozinho fica para trás e
 * a fila cresce devagar; os dois juntos escoam o acumulado. Algumas
 * mensagens são "venenosas": falham sempre e, na terceira tentativa, vão para
 * a DLQ. Se ninguém mexer, um caos automático derruba o worker 2 de tempos
 * em tempos para a ideia aparecer sozinha.
 *
 * O laço mexe direto nos atributos do SVG (pool de círculos) e só usa estado
 * do React para o que muda devagar: workers e leituras.
 */

type Etapa = "indoFila" | "naFila" | "indoWorker" | "processando" | "indoBanco" | "voltando" | "indoDlq";

type Mensagem = {
  slot: number;
  etapa: Etapa;
  t: number;
  dur: number;
  worker: number;
  tentativas: number;
  venenosa: boolean;
  // fração do caminho fila→worker de onde a volta começa
  de: number;
};

const POOL = 40;
const TICKS = 14;
const INTERVALO = 0.45;
const CAMINHOS = {
  apiFila: "M78 160 H118",
  fila0: "M238 160 C270 160 268 86 300 86",
  fila1: "M238 160 C270 160 268 234 300 234",
  banco0: "M396 86 C424 86 446 104 446 138",
  banco1: "M396 234 C424 234 446 216 446 186",
  filaDlq: "M178 184 V250",
} as const;
type NomeCaminho = keyof typeof CAMINHOS;
const WORKER_Y = [86, 234];

type Leituras = { entregues: number; fila: number; reentregas: number; dlq: number };

export function SistemaVivo({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma].sistema;
  const tf = textos[idioma].figura;

  const caixa = useRef<HTMLDivElement>(null);
  const caminhos = useRef<Partial<Record<NomeCaminho, SVGPathElement | null>>>({});
  const pontos = useRef<Array<SVGCircleElement | null>>([]);
  const ticks = useRef<Array<SVGRectElement | null>>([]);
  const barras = useRef<Array<SVGLineElement | null>>([]);
  const dlqItens = useRef<Array<SVGRectElement | null>>([]);
  const excesso = useRef<SVGTextElement | null>(null);

  const [workers, setWorkers] = useState([true, true]);
  const workersRef = useRef([true, true]);
  const [leituras, setLeituras] = useState<Leituras>({ entregues: 0, fila: 0, reentregas: 0, dlq: 0 });
  const [caos, setCaos] = useState(false);
  const [escolha, setEscolha] = useState<"rodar" | "parar" | null>(null);
  const reduzido = useMovimentoReduzido();
  const [visivel, setVisivel] = useState(false);

  // Estado do motor: fora do React, sobrevive a pausas
  const motor = useRef({
    msgs: [] as Mensagem[],
    fila: [] as Mensagem[],
    livres: Array.from({ length: POOL }, (_, i) => i),
    atual: [null, null] as Array<Mensagem | null>,
    acumulado: 0,
    relogio: 0,
    ultimaLeitura: 0,
    contagem: 0,
    entregues: 0,
    reentregas: 0,
    dlq: 0,
    tocou: false,
    caosAtivo: false,
  });


  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const observador = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting));
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // Derrubar ou religar: o que estava com o worker volta para a fila
  const mudarWorker = useCallback((w: number, ligado: boolean) => {
    const m = motor.current;
    workersRef.current[w] = ligado;
    setWorkers([...workersRef.current]);
    if (!ligado) {
      const msg = m.atual[w];
      if (msg) {
        msg.de = msg.etapa === "indoWorker" ? Math.min(1, msg.t / msg.dur) : 1;
        msg.etapa = "voltando";
        msg.t = 0;
        msg.dur = 0.35 * Math.max(0.3, msg.de);
        m.reentregas += 1;
        m.atual[w] = null;
      }
    }
  }, []);

  const tocar = useCallback(
    (w: number) => {
      const m = motor.current;
      // O primeiro toque desliga o caos e desfaz o que ele tinha derrubado
      if (!m.tocou) {
        m.tocou = true;
        if (m.caosAtivo) {
          m.caosAtivo = false;
          setCaos(false);
          if (w !== 1) mudarWorker(1, true);
          else {
            mudarWorker(1, true);
            return;
          }
        }
      }
      mudarWorker(w, !workersRef.current[w]);
    },
    [mudarWorker],
  );

  const parado = escolha === "parar" || (escolha === null && reduzido);
  const rodando = visivel && !parado;

  useEffect(() => {
    if (!rodando) return;
    const m = motor.current;
    const comprimentos: Partial<Record<NomeCaminho, number>> = {};
    const comprimento = (nome: NomeCaminho) =>
      (comprimentos[nome] ??= caminhos.current[nome]?.getTotalLength() ?? 1);

    function ponto(nome: NomeCaminho, f: number) {
      const caminho = caminhos.current[nome];
      if (!caminho) return { x: 0, y: 0 };
      return caminho.getPointAtLength(Math.max(0, Math.min(1, f)) * comprimento(nome));
    }

    function soltar(msg: Mensagem) {
      m.msgs = m.msgs.filter((x) => x !== msg);
      m.livres.push(msg.slot);
      pontos.current[msg.slot]?.setAttribute("opacity", "0");
    }

    function passo(dt: number) {
      m.relogio += dt;

      // Caos automático enquanto ninguém mexeu: worker 2 cai aos 7 s de cada
      // ciclo de 16 s e volta aos 12 s.
      if (!m.tocou) {
        const fase = m.relogio % 16;
        const deveriaCair = fase > 7 && fase < 12;
        if (deveriaCair !== m.caosAtivo) {
          m.caosAtivo = deveriaCair;
          setCaos(deveriaCair);
          mudarWorker(1, !deveriaCair);
        }
      }

      // Produtor
      m.acumulado += dt;
      if (m.acumulado >= INTERVALO) {
        m.acumulado -= INTERVALO;
        if (m.livres.length > 0 && m.fila.length < 60) {
          m.contagem += 1;
          m.msgs.push({
            slot: m.livres.shift()!,
            etapa: "indoFila",
            t: 0,
            dur: 0.45,
            worker: -1,
            tentativas: 0,
            venenosa: m.contagem % 23 === 0,
            de: 0,
          });
        }
      }

      for (const msg of [...m.msgs]) {
        msg.t += dt;
        if (msg.t < msg.dur || msg.etapa === "naFila") continue;
        switch (msg.etapa) {
          case "indoFila":
            msg.etapa = "naFila";
            m.fila.push(msg);
            break;
          case "indoWorker":
            msg.etapa = "processando";
            msg.t = 0;
            msg.dur = 0.26 + Math.random() * 0.14;
            break;
          case "processando": {
            const w = msg.worker;
            m.atual[w] = null;
            const falhou = msg.venenosa || Math.random() < 0.03;
            if (!falhou) {
              msg.etapa = "indoBanco";
              msg.t = 0;
              msg.dur = 0.4;
            } else {
              msg.tentativas += 1;
              msg.etapa = "voltando";
              msg.de = 1;
              msg.t = 0;
              msg.dur = 0.35;
            }
            break;
          }
          case "indoBanco":
            m.entregues += 1;
            soltar(msg);
            break;
          case "voltando":
            if (msg.tentativas >= 3) {
              msg.etapa = "indoDlq";
              msg.t = 0;
              msg.dur = 0.45;
            } else {
              // Volta para a cabeça da fila, como um nack com requeue
              if (msg.tentativas > 0) m.reentregas += 1;
              msg.etapa = "naFila";
              msg.worker = -1;
              m.fila.unshift(msg);
            }
            break;
          case "indoDlq":
            m.dlq += 1;
            soltar(msg);
            break;
        }
      }

      // Despacho: prefetch 1, cada worker pega a próxima quando fica livre
      for (const w of m.relogio % 2 < 1 ? [0, 1] : [1, 0]) {
        if (workersRef.current[w] && !m.atual[w] && m.fila.length > 0) {
          const msg = m.fila.shift()!;
          msg.etapa = "indoWorker";
          msg.worker = w;
          msg.t = 0;
          msg.dur = 0.25;
          m.atual[w] = msg;
        }
      }
    }

    function desenhar() {
      for (const msg of m.msgs) {
        const el = pontos.current[msg.slot];
        if (!el) continue;
        if (msg.etapa === "naFila") {
          el.setAttribute("opacity", "0");
          continue;
        }
        const f = msg.t / msg.dur;
        const w = Math.max(0, msg.worker);
        let p: { x: number; y: number };
        if (msg.etapa === "indoFila") p = ponto("apiFila", f);
        else if (msg.etapa === "indoWorker") p = ponto(w === 0 ? "fila0" : "fila1", f);
        else if (msg.etapa === "processando") p = { x: 382, y: WORKER_Y[w] - 12 };
        else if (msg.etapa === "indoBanco") p = ponto(w === 0 ? "banco0" : "banco1", f);
        else if (msg.etapa === "voltando") p = ponto(w === 0 ? "fila0" : "fila1", msg.de * (1 - f));
        else p = ponto("filaDlq", f);
        el.setAttribute("cx", p.x.toFixed(1));
        el.setAttribute("cy", p.y.toFixed(1));
        el.setAttribute("opacity", "1");
        el.setAttribute("fill", msg.tentativas > 0 ? "var(--foreground)" : "var(--signal)");
      }

      ticks.current.forEach((el, k) => {
        if (!el) return;
        const msg = m.fila[k];
        el.setAttribute("opacity", msg ? "1" : "0");
        if (msg) el.setAttribute("fill", msg.tentativas > 0 ? "var(--foreground)" : "var(--signal)");
      });
      excesso.current?.replaceChildren(m.fila.length > TICKS ? `+${m.fila.length - TICKS}` : "");

      barras.current.forEach((el, w) => {
        if (!el) return;
        const msg = m.atual[w];
        const f = msg && msg.etapa === "processando" ? Math.min(1, msg.t / msg.dur) : 0;
        el.setAttribute("x2", (310 + 76 * f).toFixed(1));
        el.setAttribute("opacity", f > 0 ? "1" : "0");
      });

      dlqItens.current.forEach((el, k) => {
        el?.setAttribute("opacity", k < Math.min(m.dlq, 8) ? "1" : "0");
      });

      if (m.relogio - m.ultimaLeitura > 0.25) {
        m.ultimaLeitura = m.relogio;
        setLeituras((antes) =>
          antes.entregues === m.entregues &&
          antes.fila === m.fila.length &&
          antes.reentregas === m.reentregas &&
          antes.dlq === m.dlq
            ? antes
            : { entregues: m.entregues, fila: m.fila.length, reentregas: m.reentregas, dlq: m.dlq },
        );
      }
    }

    let raf = 0;
    let anterior = performance.now();
    const quadro = (agora: number) => {
      const dt = Math.min(0.05, (agora - anterior) / 1000);
      anterior = agora;
      passo(dt);
      desenhar();
      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
  }, [rodando, mudarWorker]);

  function aoTeclar(evento: KeyboardEvent<SVGGElement>, w: number) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      tocar(w);
    }
  }

  const leiturasLista: Array<[string, number, boolean]> = [
    [t.entregues, leituras.entregues, false],
    [t.fila, leituras.fila, leituras.fila > 3],
    [t.reentregas, leituras.reentregas, false],
    [t.dlq, leituras.dlq, false],
  ];

  return (
    <div
      ref={caixa}
      className="moldura-figura relative isolate overflow-hidden rounded-[12px] border border-border"
    >
      <span aria-hidden className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 size-2.5 border-r border-b border-border-strong" />

      <div className="flex items-center justify-between px-5 pt-4 font-mono text-[10.5px] tracking-[0.06em] text-faint uppercase">
        <span>{tf.fig} 00</span>
        <button
          type="button"
          onClick={() => setEscolha(parado ? "rodar" : "parar")}
          aria-label={parado ? tf.retomar : tf.pausar}
          aria-pressed={parado}
          className="transicao -my-1 -mr-1.5 inline-flex items-center gap-1.5 rounded px-1.5 py-1 hover:text-foreground"
        >
          {parado ? (
            <span aria-hidden className="text-[9px] leading-none">▶</span>
          ) : (
            <span aria-hidden className="pulso size-1.5 rounded-full bg-signal" />
          )}
          {parado ? tf.pausada : tf.aoVivo}
        </button>
      </div>

      <div className="px-2 sm:px-4">
        <svg viewBox="0 0 480 300" className="block h-auto w-full" role="group" aria-label={t.titulo}>
          <g className="f-linha" strokeOpacity="0.5">
            {(Object.keys(CAMINHOS) as NomeCaminho[]).map((nome) => (
              <path
                key={nome}
                ref={(el) => {
                  caminhos.current[nome] = el;
                }}
                d={CAMINHOS[nome]}
                strokeOpacity={
                  (nome === "fila0" && !workers[0]) || (nome === "fila1" && !workers[1]) ? 0.15 : undefined
                }
              />
            ))}
          </g>

          {/* api */}
          <rect x="14" y="142" width="64" height="36" rx="4" className="f-caixa" />
          <text x="46" y="164" textAnchor="middle" className="f-texto f-texto-forte">api</text>

          {/* fila: cada traço é uma mensagem esperando; a da direita sai primeiro */}
          <text x="118" y="128" className="f-texto">{t.fila}</text>
          <rect x="118" y="136" width="120" height="48" rx="4" className="f-caixa" />
          {Array.from({ length: TICKS }, (_, k) => (
            <rect
              key={k}
              ref={(el) => {
                ticks.current[k] = el;
              }}
              x={228 - k * 7.6}
              y="146"
              width="4"
              height="28"
              rx="1"
              fill="var(--signal)"
              opacity="0"
            />
          ))}
          <text ref={excesso} x="238" y="200" textAnchor="end" className="f-texto f-texto-sinal" />

          {/* dlq */}
          <rect x="138" y="250" width="80" height="34" rx="4" className="f-caixa" />
          <text x="148" y="271" className="f-texto f-texto-forte">dlq</text>
          {Array.from({ length: 8 }, (_, k) => (
            <rect
              key={k}
              ref={(el) => {
                dlqItens.current[k] = el;
              }}
              x={172 + (k % 4) * 10}
              y={k < 4 ? 258 : 270}
              width="7"
              height="8"
              rx="1"
              fill="var(--foreground)"
              opacity="0"
            />
          ))}

          {/* banco */}
          <g className="f-caixa">
            <path d="M426 142 V180 C426 188 466 188 466 180 V142" />
            <ellipse cx="446" cy="142" rx="20" ry="7" />
          </g>
          <text x="446" y="206" textAnchor="middle" className="f-texto">db</text>

          {/* workers: os alvos clicáveis */}
          {[0, 1].map((w) => {
            const y = WORKER_Y[w] - 26;
            const ligado = workers[w];
            return (
              <g
                key={w}
                role="button"
                tabIndex={0}
                aria-pressed={!ligado}
                aria-label={`worker ${w + 1}: ${ligado ? t.ativo : t.fora}. ${ligado ? t.derrubar : t.religar}`}
                className="sim-alvo"
                onClick={() => tocar(w)}
                onKeyDown={(e) => aoTeclar(e, w)}
              >
                <rect
                  x="300"
                  y={y}
                  width="96"
                  height="52"
                  rx="4"
                  className="f-caixa sim-caixa transicao"
                  strokeDasharray={ligado ? undefined : "4 3"}
                  stroke={ligado ? undefined : "var(--signal)"}
                  fillOpacity={ligado ? 1 : 0.4}
                />
                <text x="310" y={y + 18} className="f-texto f-texto-forte">worker {w + 1}</text>
                <text x="310" y={y + 34} className={`f-texto ${ligado ? "" : "f-texto-sinal"}`}>
                  {ligado ? `● ${t.ativo}` : `✕ ${t.fora}`}
                </text>
                <line x1="310" y1={y + 43} x2="386" y2={y + 43} className="f-linha" strokeOpacity="0.3" />
                <line
                  ref={(el) => {
                    barras.current[w] = el;
                  }}
                  x1="310"
                  y1={y + 43}
                  x2="310"
                  y2={y + 43}
                  stroke="var(--signal)"
                  strokeWidth="2"
                  opacity="0"
                />
              </g>
            );
          })}

          {Array.from({ length: POOL }, (_, i) => (
            <circle
              key={i}
              ref={(el) => {
                pontos.current[i] = el;
              }}
              r="3.6"
              cx="0"
              cy="0"
              fill="var(--signal)"
              opacity="0"
              pointerEvents="none"
            />
          ))}
        </svg>
      </div>

      <dl className="grid grid-cols-4 border-t border-border-soft">
        {leiturasLista.map(([rotulo, valor, alerta], i) => (
          <div key={rotulo} className={`flex flex-col gap-0.5 px-3 py-2.5 sm:px-4 ${i > 0 ? "border-l border-border-soft" : ""}`}>
            <dt className="font-mono text-[9.5px] tracking-[0.08em] text-faint uppercase">{rotulo}</dt>
            <dd className={`font-mono text-[19px] leading-none font-medium tabular-nums ${alerta ? "text-signal" : "text-foreground"}`}>
              {valor}
            </dd>
          </div>
        ))}
      </dl>

      <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-border-soft px-5 py-3 text-[13px] text-muted">
        <span className="flex items-baseline gap-2">
          <span aria-hidden className="font-mono text-[10.5px] text-signal">↳</span>
          {parado && reduzido && escolha === null ? t.reduzido : t.instrucao}
        </span>
        <span
          aria-hidden={!caos}
          className={`font-mono text-[10.5px] tracking-[0.06em] text-signal uppercase transition-opacity ${caos ? "opacity-100" : "opacity-0"}`}
        >
          {t.caos}
        </span>
      </p>
    </div>
  );
}
