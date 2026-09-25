import type { Idioma } from "@/lib/i18n";
import { Anim, Pacote, Piscar, Viagem } from "./smil";

/*
 * llm-bench — "mesma tarefa, containers isolados". Laço de 16 s, quatro atos
 * de 4 s, um por configuração (as tentativas rodam uma de cada vez, como no
 * protocolo): o contrato entra no container, o agente trabalha, a entrega é
 * congelada e vai para o avaliador, que acende os 35 requisitos.
 * Os rótulos são os harnesses da coleta; a figura não compara tempos.
 */
const T = 16;
const ATO = 4;
export const poseLlmBench = 11.4;

const rotulos = {
  pt: {
    contrato: "contrato",
    parteA: "parte A",
    novo: "1 container novo por tentativa",
    fila: "na fila",
    rodando: "rodando",
    congelada: "congelada",
    avaliador: "avaliador",
    requisitos: "35 requisitos",
    aceita: "35/35 · aceita",
  },
  en: {
    contrato: "contract",
    parteA: "part A",
    novo: "1 fresh container per attempt",
    fila: "queued",
    rodando: "running",
    congelada: "frozen",
    avaliador: "evaluator",
    requisitos: "35 requirements",
    aceita: "35/35 · accepted",
  },
};

const harnesses = ["claude code", "codex", "codex", "opencode"];
const CX = 128;
const CW = 172;
const ys = [36, 92, 148, 204];
const EX = 354;

export function FiguraLlmBench({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      {/* contrato */}
      <text x="22" y="104" className="f-texto">{r.contrato}</text>
      <path d="M22 112 H70 L82 124 V188 H22 Z" className="f-caixa" />
      <path d="M70 112 V124 H82" className="f-linha" />
      {[136, 146, 156, 166, 176].map((y, i) => (
        <line key={y} x1="30" y1={y} x2={i % 2 ? 62 : 72} y2={y} className="f-linha" strokeOpacity="0.6" />
      ))}
      <text x="22" y="206" className="f-texto">{r.parteA}</text>

      <text x={CX} y="24" className="f-texto">{r.novo}</text>

      {ys.map((y, i) => {
        const cy = y + 22;
        const ida = `M82 150 C106 150 106 ${cy} ${CX} ${cy}`;
        const volta = `M${CX + CW} ${cy} C${CX + CW + 28} ${cy} ${EX - 26} 150 ${EX} 150`;
        const t0 = i * ATO;
        const largura: Array<[number, number]> = [
          [t0 + 0.6, 0], [t0 + 2.0, 150], [T - 0.1, 150], [T - 0.02, 0],
        ];
        return (
          <g key={i}>
            <path d={ida} className="f-linha" strokeOpacity="0.5" />
            <path d={volta} className="f-linha" strokeOpacity="0.5" />

            <rect x={CX} y={y} width={CW} height="44" rx="4" className="f-caixa" strokeDasharray="4 3" />
            {/* borda viva enquanto o agente trabalha */}
            <Piscar T={T} em={[[t0 + 0.6, t0 + 2.0]]}>
              <rect x={CX} y={y} width={CW} height="44" rx="4" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
            </Piscar>
            <text x={CX + 10} y={y + 17} className="f-texto f-texto-forte">{harnesses[i]}</text>

            {/* estado */}
            <Piscar T={T} em={[[0, t0 + 0.55]]} fade={0.04}>
              <text x={CX + CW - 10} y={y + 17} textAnchor="end" className="f-texto">{r.fila}</text>
            </Piscar>
            <Piscar T={T} em={[[t0 + 0.6, t0 + 1.98]]} fade={0.04}>
              <text x={CX + CW - 10} y={y + 17} textAnchor="end" className="f-texto f-texto-sinal">{r.rodando}</text>
            </Piscar>
            <Piscar T={T} em={[[t0 + 2.02, T - 0.1]]} fade={0.04}>
              <text x={CX + CW - 10} y={y + 17} textAnchor="end" className="f-texto f-texto-forte">{r.congelada} ✓</text>
            </Piscar>

            {/* progresso: vermelho rodando, osso depois de congelado */}
            <line x1={CX + 10} y1={y + 31} x2={CX + 160} y2={y + 31} className="f-linha" strokeOpacity="0.35" />
            <rect x={CX + 10} y={y + 29} height="4" width="0" rx="1" fill="var(--muted)">
              <Anim attr="width" T={T} q={largura} />
            </rect>
            <Piscar T={T} em={[[t0 + 0.6, t0 + 2.0]]} fade={0.04}>
              <rect x={CX + 10} y={y + 29} height="4" width="0" rx="1" fill="var(--signal)">
                <Anim attr="width" T={T} q={largura} />
              </rect>
            </Piscar>

            {/* contrato entra; entrega congelada sai */}
            <Viagem T={T} d={ida} de={t0 + 0.1} ate={t0 + 0.6}>
              <Pacote />
            </Viagem>
            <Viagem T={T} d={volta} de={t0 + 2.05} ate={t0 + 2.5}>
              <rect x="-4" y="-4" width="8" height="8" rx="1" fill="var(--foreground)" />
            </Viagem>
          </g>
        );
      })}

      {/* avaliador */}
      <rect x={EX} y="64" width="110" height="172" rx="4" className="f-caixa" />
      <text x={EX + 10} y="84" className="f-texto f-texto-forte">{r.avaliador}</text>
      {Array.from({ length: 35 }, (_, k) => {
        const col = k % 7;
        const lin = Math.floor(k / 7);
        const quadrosCelula = ys.flatMap((_, s) => {
          const aceso = s * ATO + 2.55 + k * 0.017;
          return [
            [aceso - 0.02, 0.16],
            [aceso, 1],
            [s * ATO + 3.9, 1],
            [s * ATO + 3.98, 0.16],
          ] as Array<[number, number]>;
        });
        return (
          <rect
            key={k}
            x={EX + 8 + col * 14}
            y={100 + lin * 14}
            width="10"
            height="10"
            rx="1.5"
            fill="var(--foreground)"
            opacity="0.16"
          >
            <Anim attr="opacity" T={T} q={[[0, 0.16], ...quadrosCelula]} />
          </rect>
        );
      })}
      <text x={EX + 10} y="194" className="f-texto">{r.requisitos}</text>
      <Piscar T={T} em={ys.map((_, s) => [s * ATO + 3.12, s * ATO + 3.92] as [number, number])} fade={0.05}>
        <text x={EX + 10} y="216" className="f-texto f-texto-sinal">{r.aceita}</text>
      </Piscar>
    </svg>
  );
}
