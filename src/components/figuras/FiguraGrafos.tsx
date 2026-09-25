import type { Idioma } from "@/lib/i18n";
import { Anim, Piscar, type Quadro } from "./smil";

/*
 * Biblioteca de grafos — "centralidade não é popularidade". Laço de 10 s:
 * 1) Label Propagation: dois rótulos partem das sementes e se espalham em
 *    ondas pela distância no grafo; o nó-ponte oscila entre os dois;
 * 2) Eigenvector Centrality: o nó-ponte cresce e as arestas que atravessam a
 *    fronteira acendem, enquanto um nó popular fica na borda, periférico.
 */
const T = 10;
export const poseGrafos = 8.0;

const rotulos = {
  pt: {
    propagacao: "label propagation",
    centralidade: "eigenvector centrality",
    esquerda: "urbano latino",
    direita: "hip-hop eua",
    central: "mais central",
    pop: "popularidade 84",
    periferico: "popular, mas periférico",
  },
  en: {
    propagacao: "label propagation",
    centralidade: "eigenvector centrality",
    esquerda: "latin urban",
    direita: "us hip-hop",
    central: "most central",
    pop: "popularity 84",
    periferico: "popular, yet peripheral",
  },
};

type No = [number, number];
const esquerda: No[] = [[118, 150], [80, 112], [128, 94], [172, 126], [170, 180], [124, 206], [80, 192], [52, 148], [92, 60]];
const direita: No[] = [[362, 150], [330, 106], [384, 100], [416, 138], [408, 192], [360, 208], [316, 186], [432, 84]];
const arestasEsq = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 2], [1, 7], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [1, 8], [2, 8]];
const arestasDir = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1], [2, 7], [3, 7]];
const PONTE: No = [240, 150];
const ligacoesPonte: No[] = [esquerda[3], esquerda[4], direita[1], direita[6]];

// Distância à semente (índice 0 de cada lado): 0, 1 para os vizinhos, 2 para
// a ponta. A onda de rótulos chega em 0,6 s + 0,8 s por salto.
const distEsq = [0, 1, 1, 1, 1, 1, 1, 1, 2];
const distDir = [0, 1, 1, 1, 1, 1, 1, 2];
const chegada = (d: number) => 0.6 + d * 0.8;

function Rotulado({ no, d, cor }: { no: No; d: number; cor: string }) {
  const t = chegada(d);
  return (
    <g>
      <circle cx={no[0]} cy={no[1]} r="5.5" fill="var(--surface-2)" stroke="var(--muted)" strokeWidth="1.25" />
      <circle cx={no[0]} cy={no[1]} r="5.5" fill={cor} opacity="0">
        <Anim attr="opacity" T={T} q={[[t - 0.15, 0], [t, 1], [9.7, 1], [9.9, 0]]} />
      </circle>
    </g>
  );
}

// Três ondas saindo da ponte durante o segundo ato
const ondas: { raio: Quadro[]; opacidade: Quadro[] } = (() => {
  const raio: Quadro[] = [[0, 12]];
  const opacidade: Quadro[] = [[0, 0]];
  for (const inicio of [5.4, 6.8, 8.2]) {
    raio.push([inicio, 12], [inicio + 1.3, 38], [inicio + 1.31, 12]);
    opacidade.push([inicio, 0.7], [inicio + 1.3, 0], [inicio + 1.31, 0]);
  }
  return { raio, opacidade };
})();

export function FiguraGrafos({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      <Piscar T={T} em={[[0, 4.9]]}>
        <text x="16" y="24" className="f-texto">{r.propagacao}</text>
      </Piscar>
      <Piscar T={T} em={[[5.0, 9.9]]}>
        <text x="16" y="24" className="f-texto f-texto-sinal">{r.centralidade}</text>
      </Piscar>

      {/* arestas */}
      <g className="f-linha" strokeOpacity="0.4">
        {arestasEsq.map(([a, b]) => (
          <line key={`e${a}-${b}`} x1={esquerda[a][0]} y1={esquerda[a][1]} x2={esquerda[b][0]} y2={esquerda[b][1]} />
        ))}
        {arestasDir.map(([a, b]) => (
          <line key={`d${a}-${b}`} x1={direita[a][0]} y1={direita[a][1]} x2={direita[b][0]} y2={direita[b][1]} />
        ))}
        {ligacoesPonte.map(([x, y]) => (
          <line key={`p${x}-${y}`} x1={PONTE[0]} y1={PONTE[1]} x2={x} y2={y} strokeOpacity="0.9" />
        ))}
      </g>
      <Piscar T={T} em={[[5.0, 9.7]]}>
        {ligacoesPonte.map(([x, y]) => (
          <line key={`s${x}-${y}`} x1={PONTE[0]} y1={PONTE[1]} x2={x} y2={y} stroke="var(--signal)" strokeWidth="1.75" />
        ))}
      </Piscar>

      {/* nós rotulados em ondas */}
      {esquerda.map((no, i) => (
        <Rotulado key={`ne${i}`} no={no} d={distEsq[i]} cor="var(--foreground)" />
      ))}
      {direita.map((no, i) => (
        <Rotulado key={`nd${i}`} no={no} d={distDir[i]} cor="var(--signal)" />
      ))}

      {/* o popular periférico */}
      <Piscar T={T} em={[[5.6, 9.7]]}>
        <circle cx={esquerda[8][0]} cy={esquerda[8][1]} r="12" fill="none" stroke="var(--foreground)" strokeDasharray="2 3" />
        <text x={esquerda[8][0] + 18} y={esquerda[8][1] + 3.5} className="f-texto f-texto-forte">{r.periferico}</text>
      </Piscar>

      {/* ponte: disputada no primeiro ato, central no segundo */}
      <circle cx={PONTE[0]} cy={PONTE[1]} r="12" fill="none" stroke="var(--signal)" opacity="0">
        <Anim attr="r" T={T} q={ondas.raio} />
        <Anim attr="opacity" T={T} q={ondas.opacidade} />
      </circle>
      <circle cx={PONTE[0]} cy={PONTE[1]} r="7" fill="var(--surface-2)" stroke="var(--foreground)" strokeWidth="1.5">
        <Anim attr="r" T={T} q={[[5.0, 7], [5.8, 12], [9.6, 12], [9.9, 7]]} />
      </circle>
      <circle cx={PONTE[0]} cy={PONTE[1]} r="4" fill="var(--signal)" opacity="0">
        <Anim
          attr="opacity"
          T={T}
          q={[[2.2, 0], [2.25, 1], [2.5, 1], [2.55, 0.2], [2.8, 0.2], [2.85, 1], [3.1, 1], [3.15, 0.2], [3.4, 0.2], [3.45, 1], [9.7, 1], [9.9, 0]]}
        />
        <Anim attr="r" T={T} q={[[5.0, 4], [5.8, 7], [9.6, 7], [9.9, 4]]} />
      </circle>
      <Piscar T={T} em={[[5.6, 9.7]]}>
        <text x={PONTE[0]} y="104" textAnchor="middle" className="f-texto f-texto-sinal">{r.central}</text>
        <text x={PONTE[0]} y="118" textAnchor="middle" className="f-texto">{r.pop}</text>
      </Piscar>

      {/* comunidades encontradas */}
      <Piscar T={T} em={[[3.4, 9.8]]}>
        <text x="112" y="256" textAnchor="middle" className="f-texto">{r.esquerda}</text>
        <text x="372" y="256" textAnchor="middle" className="f-texto f-texto-sinal">{r.direita}</text>
      </Piscar>
    </svg>
  );
}
