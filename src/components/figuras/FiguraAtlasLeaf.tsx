import type { Idioma } from "@/lib/i18n";
import { Anim, Cantos, Piscar, quadros } from "./smil";

/*
 * AtlasLeaf — "sabe quando não sabe". Laço de 10 s em dois atos:
 * 1) câmera A: a varredura passa, a classe 03 cruza o limiar e a predição sai;
 * 2) câmera B: mesma folha em outra luz, nenhuma barra cruza e o modelo se
 *    abstém. É o mecanismo de rejeição por confiança, não um resultado medido.
 */
const T = 10;
export const poseAtlasLeaf = 8.6;

const rotulos = {
  pt: {
    cameraA: "câmera A",
    cameraB: "câmera B",
    confianca: "confiança por classe",
    limiar: "limiar",
    predicao: "→ predição: classe 03 · 0,86",
    abstencao: "→ abstém: revisão humana",
  },
  en: {
    cameraA: "camera A",
    cameraB: "camera B",
    confianca: "confidence per class",
    limiar: "threshold",
    predicao: "→ prediction: class 03 · 0.86",
    abstencao: "→ abstains: human review",
  },
};

// Confiança de cada classe nos dois atos: só a 03 do primeiro passa de 0,70
const atoA = [0.1, 0.14, 0.86, 0.06, 0.12, 0.05, 0.08];
const atoB = [0.24, 0.33, 0.46, 0.12, 0.4, 0.09, 0.2];
const LARGURA = 150;
const X0 = 292;
const LIMIAR = 0.7;

const lesoesA: Array<[number, number, number]> = [
  [104, 118, 5], [148, 132, 4], [112, 160, 6], [150, 178, 4.5],
  [100, 196, 3.5], [138, 108, 3], [132, 206, 4], [92, 142, 3],
];
const lesoesB: Array<[number, number, number, number]> = [
  [118, 150, 10, 0.2], [146, 192, 8, 0.16], [100, 118, 6, 0.14],
];

export function FiguraAtlasLeaf({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];
  const varredura = quadros(T, [
    [0.4, "0 0"], [2.0, "0 214"], [2.01, "0 0"],
    [5.4, "0 0"], [7.0, "0 214"], [7.01, "0 0"],
  ]);

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      <defs>
        <linearGradient id="atlas-rastro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--signal)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--signal)" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* visor */}
      <Cantos x={28} y={40} w={196} h={226} />
      <Piscar T={T} em={[[0, 4.95]]} fade={0.05}>
        <text x="28" y="30" className="f-texto">{r.cameraA}</text>
      </Piscar>
      <Piscar T={T} em={[[5.0, 10]]} fade={0.05}>
        <text x="28" y="30" className="f-texto">{r.cameraB}</text>
      </Piscar>

      {/* folha */}
      <path
        d="M126 58 C184 86 196 160 126 244 C56 160 68 86 126 58 Z"
        fill="var(--foreground)"
        fillOpacity="0.04"
        className="f-linha f-tinta"
        strokeOpacity="0.6"
      />
      <g className="f-linha f-tinta" strokeOpacity="0.32">
        <path d="M126 66 C130 120 130 185 126 236" />
        <path d="M127 100 C145 104 160 112 170 124" />
        <path d="M125 100 C107 104 92 112 82 124" />
        <path d="M128 140 C148 145 163 155 172 168" />
        <path d="M124 140 C104 145 89 155 80 168" />
        <path d="M128 180 C142 185 152 193 158 203" />
        <path d="M124 180 C110 185 100 193 94 203" />
      </g>

      {/* lesões: nítidas na câmera A, difusas na B, com um reflexo de luz */}
      <Piscar T={T} em={[[0, 4.95]]} fade={0.3}>
        {lesoesA.map(([cx, cy, raio]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={raio + 3} fill="none" stroke="var(--foreground)" strokeOpacity="0.25" />
            <circle cx={cx} cy={cy} r={raio} fill="var(--foreground)" fillOpacity="0.55" />
          </g>
        ))}
      </Piscar>
      <Piscar T={T} em={[[5.0, 10]]} fade={0.3}>
        {lesoesB.map(([cx, cy, raio, op]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={raio} fill="var(--foreground)" fillOpacity={op} />
        ))}
        <path d="M40 210 L170 48 L212 48 L82 210 Z" fill="var(--foreground)" fillOpacity="0.045" />
      </Piscar>

      {/* varredura */}
      <g opacity="0">
        <animateTransform
          attributeName="transform"
          type="translate"
          dur={`${T}s`}
          repeatCount="indefinite"
          values={varredura.values}
          keyTimes={varredura.keyTimes}
          calcMode="linear"
        />
        <Anim attr="opacity" T={T} q={[[0.35, 0], [0.4, 1], [2.0, 1], [2.05, 0], [5.35, 0], [5.4, 1], [7.0, 1], [7.05, 0]]} />
        <rect x="34" y="22" width="184" height="26" fill="url(#atlas-rastro)" />
        <line x1="34" y1="48" x2="218" y2="48" stroke="var(--signal)" strokeWidth="1.5" />
      </g>

      {/* barras de confiança */}
      <text x="264" y="44" className="f-texto">{r.confianca}</text>
      {atoA.map((a, i) => {
        const y = 70 + i * 24;
        const wA = a * LARGURA;
        const wB = atoB[i] * LARGURA;
        const largura: Array<[number, number]> = [
          [2.0, 0], [2.8, wA], [4.6, wA], [4.9, 0],
          [7.0, 0], [7.8, wB], [9.6, wB], [9.9, 0],
        ];
        return (
          <g key={i}>
            <text x="264" y={y + 3.5} className="f-texto">
              {String(i + 1).padStart(2, "0")}
            </text>
            <line x1={X0} y1={y} x2={X0 + LARGURA} y2={y} className="f-linha" strokeOpacity="0.45" />
            <rect x={X0} y={y - 4} height="8" width="0" rx="1" fill="var(--muted)" fillOpacity="0.75">
              <Anim attr="width" T={T} q={largura} />
            </rect>
            {a > LIMIAR && (
              <Piscar T={T} em={[[2.72, 4.6]]} fade={0.06}>
                <rect x={X0} y={y - 4} height="8" width="0" rx="1" fill="var(--signal)">
                  <Anim attr="width" T={T} q={largura} />
                </rect>
              </Piscar>
            )}
          </g>
        );
      })}

      {/* limiar de abstenção */}
      <line
        x1={X0 + LIMIAR * LARGURA}
        y1="56"
        x2={X0 + LIMIAR * LARGURA}
        y2="228"
        className="f-linha f-sinal f-tracejado"
      />
      <text x={X0 + LIMIAR * LARGURA + 5} y="62" className="f-texto f-texto-sinal">
        {r.limiar}
      </text>

      {/* veredito */}
      <line x1="264" y1="246" x2="452" y2="246" className="f-linha" strokeOpacity="0.4" />
      <Piscar T={T} em={[[3.0, 4.7]]}>
        <text x="264" y="266" className="f-texto f-texto-forte">{r.predicao}</text>
      </Piscar>
      <Piscar T={T} em={[[8.0, 9.7]]}>
        <text x="264" y="266" className="f-texto f-texto-sinal">{r.abstencao}</text>
      </Piscar>
    </svg>
  );
}
