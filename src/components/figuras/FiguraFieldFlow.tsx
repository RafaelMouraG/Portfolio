import type { Idioma } from "@/lib/i18n";
import { Pacote, Piscar, Viagem } from "./smil";

/*
 * FieldFlow — "idempotência no consumidor". Laço de 12 s em três atos:
 * 1) o evento #42 chega ao worker A, o efeito é aplicado e o id entra nos vistos;
 * 2) o broker entrega #42 de novo (at-least-once) e o worker o reconhece e ignora;
 * 3) #43 falha três vezes no worker B e vai para a DLQ, que guarda o trabalho.
 */
const T = 12;
export const poseFieldFlow = 10.8;

const rotulos = {
  pt: {
    publica: "publica evento",
    topic: "topic",
    vistos: "vistos",
    aplicado: "✓ efeito aplicado",
    duplicado: "#42 de novo: ignorado",
    processando: "processando…",
    falhou: "✕ falhou",
    paraDlq: "✕ 3/3 → dlq",
    trabalho: "fila de trabalho",
  },
  en: {
    publica: "publishes event",
    topic: "topic",
    vistos: "seen",
    aplicado: "✓ effect applied",
    duplicado: "#42 again: ignored",
    processando: "processing…",
    falhou: "✕ failed",
    paraDlq: "✕ 3/3 → dlq",
    trabalho: "work queue",
  },
};

const ROTA_A = "M84 150 H130 C156 150 152 95 180 95 H278";
const ROTA_B = "M84 150 H130 C156 150 152 205 180 205 H278";
const PARA_DLQ = "M324 234 C324 262 372 262 404 262";

function Evento({ id }: { id: string }) {
  return (
    <>
      <Pacote />
      <text x="-10" y="-9" className="f-texto f-texto-forte">{id}</text>
    </>
  );
}

export function FiguraFieldFlow({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      <g className="f-linha" strokeOpacity="0.5">
        <path d="M84 150 H116" />
        <path d="M144 150 C156 150 152 95 176 95" />
        <path d="M144 150 C156 150 152 205 176 205" />
        <path d="M232 95 H276" />
        <path d="M232 205 H276" />
        <path d={PARA_DLQ} />
      </g>

      {/* api */}
      <text x="16" y="124" className="f-texto">{r.publica}</text>
      <rect x="16" y="132" width="68" height="36" rx="4" className="f-caixa" />
      <text x="50" y="154" textAnchor="middle" className="f-texto f-texto-forte">api</text>

      {/* exchange e filas */}
      <path d="M130 136 L144 150 L130 164 L116 150 Z" className="f-caixa" />
      <text x="130" y="184" textAnchor="middle" className="f-texto">{r.topic}</text>
      {[95, 205].map((y) => (
        <g key={y}>
          <rect x="176" y={y - 11} width="56" height="22" rx="3" className="f-caixa" />
          {[182, 196, 210].map((x) => (
            <rect key={x} x={x} y={y - 6} width="10" height="12" rx="1.5" className="f-linha" strokeOpacity="0.45" />
          ))}
        </g>
      ))}

      {/* worker A: guarda os ids já vistos */}
      <rect x="276" y="64" width="160" height="62" rx="4" className="f-caixa" />
      <Piscar T={T} em={[[1.6, 2.4]]}>
        <rect x="276" y="64" width="160" height="62" rx="4" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
      </Piscar>
      <text x="286" y="82" className="f-texto f-texto-forte">worker a</text>
      <Piscar T={T} em={[[0, 2.4]]} fade={0.04}>
        <text x="286" y="100" className="f-texto">{r.vistos} {"{41}"}</text>
      </Piscar>
      <Piscar T={T} em={[[2.44, 11.8]]} fade={0.04}>
        <text x="286" y="100" className="f-texto">
          {r.vistos} {"{41, "}
          <tspan className="f-texto-sinal">42</tspan>
          {"}"}
        </text>
      </Piscar>
      <Piscar T={T} em={[[5.0, 5.6]]}>
        <rect x="282" y="89" width="98" height="16" rx="3" fill="none" stroke="var(--signal)" strokeWidth="1.25" />
      </Piscar>
      <Piscar T={T} em={[[2.4, 4.9]]} fade={0.04}>
        <text x="286" y="118" className="f-texto f-texto-forte">{r.aplicado}</text>
      </Piscar>
      <Piscar T={T} em={[[5.0, 11.8]]} fade={0.04}>
        <text x="286" y="118" className="f-texto f-texto-sinal">{r.duplicado}</text>
      </Piscar>

      {/* worker B: tenta, falha e desiste para a DLQ */}
      <rect x="276" y="174" width="160" height="60" rx="4" className="f-caixa" />
      <Piscar T={T} em={[[8.4, 8.6], [8.8, 9.0], [9.2, 9.4]]} fade={0.04}>
        <rect x="276" y="174" width="160" height="60" rx="4" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
      </Piscar>
      <text x="286" y="192" className="f-texto f-texto-forte">worker b</text>
      <Piscar T={T} em={[[8.0, 8.38]]} fade={0.03}>
        <text x="286" y="212" className="f-texto">{r.processando}</text>
      </Piscar>
      <Piscar T={T} em={[[8.42, 8.78]]} fade={0.03}>
        <text x="286" y="212" className="f-texto f-texto-sinal">{r.falhou} 1/3</text>
      </Piscar>
      <Piscar T={T} em={[[8.82, 9.18]]} fade={0.03}>
        <text x="286" y="212" className="f-texto f-texto-sinal">{r.falhou} 2/3</text>
      </Piscar>
      <Piscar T={T} em={[[9.22, 11.8]]} fade={0.03}>
        <text x="286" y="212" className="f-texto f-texto-sinal">{r.paraDlq}</text>
      </Piscar>

      {/* DLQ */}
      <rect x="404" y="248" width="60" height="30" rx="3" className="f-caixa" />
      <text x="414" y="267" className="f-texto f-texto-forte">dlq</text>
      <Piscar T={T} em={[[10.3, 11.8]]}>
        <rect x="404" y="248" width="60" height="30" rx="3" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
        <text x="414" y="267" className="f-texto f-texto-forte">dlq</text>
        <rect x="440" y="257" width="14" height="12" rx="1.5" fill="var(--signal)" />
        <text x="464" y="240" textAnchor="end" className="f-texto f-texto-sinal">{r.trabalho}</text>
      </Piscar>

      {/* eventos */}
      <Viagem T={T} d={ROTA_A} de={0.2} ate={1.6}><Evento id="#42" /></Viagem>
      <Viagem T={T} d={ROTA_A} de={3.6} ate={5.0}><Evento id="#42" /></Viagem>
      <Viagem T={T} d={ROTA_B} de={6.6} ate={8.0}><Evento id="#43" /></Viagem>
      <Viagem T={T} d={PARA_DLQ} de={9.6} ate={10.3}><Pacote /></Viagem>
    </svg>
  );
}
