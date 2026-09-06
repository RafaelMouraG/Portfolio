import Image from "next/image";
import type { Projeto } from "@/content/projetos";

/*
 * Capa do projeto. Se o projeto tiver `imagem` (screenshot real), ela vence.
 * Sem imagem, cada slug tem uma arte SVG própria: um mini-diagrama do que o
 * projeto faz, desenhado em currentColor para vestir a cor da área
 * (verde em dev, amarelo em dados) e reagir a tema e filtro de graça.
 */

const ajustesImagem = {
  cover: 'object-cover',
  contain: 'object-contain p-8',
  'cover-topo': 'object-cover object-top',
} as const;

// Rede de similaridade: duas comunidades e o nó-ponte que atravessa a fronteira
function ArteGrafos() {
  const esquerda: Array<[number, number]> = [
    [60, 80], [105, 60], [140, 95], [80, 140], [125, 150], [62, 180],
  ];
  const direita: Array<[number, number]> = [
    [280, 65], [335, 85], [350, 145], [295, 160], [255, 120],
  ];
  const arestasEsq = [
    [0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [3, 4], [5, 3], [5, 4],
  ] as const;
  const arestasDir = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]] as const;
  const ponte: [number, number] = [200, 115];
  const ligacoesPonte = [esquerda[2], esquerda[4], direita[4], direita[0]];

  return (
    <g strokeWidth="1.5" strokeLinecap="round">
      {arestasEsq.map(([a, b]) => (
        <line
          key={`e${a}${b}`}
          x1={esquerda[a][0]} y1={esquerda[a][1]}
          x2={esquerda[b][0]} y2={esquerda[b][1]}
          stroke="var(--border-strong)"
        />
      ))}
      {arestasDir.map(([a, b]) => (
        <line
          key={`d${a}${b}`}
          x1={direita[a][0]} y1={direita[a][1]}
          x2={direita[b][0]} y2={direita[b][1]}
          stroke="var(--border-strong)"
        />
      ))}
      {ligacoesPonte.map(([x, y]) => (
        <line
          key={`p${x}${y}`}
          x1={ponte[0]} y1={ponte[1]} x2={x} y2={y}
          stroke="currentColor" opacity="0.7"
        />
      ))}
      {[...esquerda, ...direita].map(([x, y]) => (
        <circle key={`n${x}${y}`} cx={x} cy={y} r="5" fill="var(--muted)" opacity="0.55" />
      ))}
      <circle cx={ponte[0]} cy={ponte[1]} r="9" fill="currentColor" />
      <circle
        cx={ponte[0]} cy={ponte[1]} r="16"
        stroke="currentColor" strokeDasharray="3 4" opacity="0.7"
      />
    </g>
  );
}

// Folha sob escaneamento, com barras de confiança e o limiar de abstenção
function ArteAtlasLeaf() {
  return (
    <g strokeWidth="1.5" strokeLinecap="round">
      {/* cantos do quadro de captura */}
      <path d="M32 52 V32 H52" stroke="var(--border-strong)" />
      <path d="M368 52 V32 H348" stroke="var(--border-strong)" />
      <path d="M32 173 V193 H52" stroke="var(--border-strong)" />
      <path d="M368 173 V193 H348" stroke="var(--border-strong)" />
      {/* folha */}
      <path
        d="M200 45 C255 70 270 130 200 185 C130 130 145 70 200 45 Z"
        stroke="currentColor" fill="currentColor" fillOpacity="0.07"
      />
      <path d="M200 52 C204 95 204 140 200 178" stroke="currentColor" opacity="0.55" />
      <path d="M201 90 C218 96 230 106 238 118" stroke="currentColor" opacity="0.4" />
      <path d="M200 125 C185 131 172 141 165 152" stroke="currentColor" opacity="0.4" />
      {/* linha de escaneamento */}
      <line x1="46" y1="112" x2="354" y2="112" stroke="currentColor" strokeDasharray="5 6" opacity="0.6" />
      {/* barras de confiança e limiar: só a que passa fica na cor da área */}
      <rect x="46" y="159" width="9" height="26" fill="var(--muted)" opacity="0.5" />
      <rect x="61" y="143" width="9" height="42" fill="currentColor" />
      <rect x="76" y="171" width="9" height="14" fill="var(--muted)" opacity="0.5" />
      <line x1="40" y1="150" x2="92" y2="150" stroke="currentColor" strokeDasharray="3 3" opacity="0.7" />
    </g>
  );
}

// Persistir primeiro, depois o fanout: banco → exchange → filas → web e mobile
function ArteBiblioo() {
  return (
    <g fill="none" strokeWidth="1.5" strokeLinecap="round">
      {/* banco: a notificação existe antes de qualquer fanout */}
      <ellipse cx="55" cy="90" rx="20" ry="8" stroke="currentColor" />
      <path d="M35 90 V134 M75 90 V134" stroke="currentColor" />
      <path d="M35 134 C35 138 75 138 75 134" stroke="currentColor" />
      <path d="M35 112 C35 116 75 116 75 112" stroke="currentColor" opacity="0.5" />
      {/* exchange */}
      <line x1="78" y1="112" x2="128" y2="112" stroke="currentColor" />
      <path d="M124 108 L132 112 L124 116" stroke="currentColor" />
      <rect
        x="138" y="100" width="24" height="24" rx="3"
        stroke="currentColor" transform="rotate(45 150 112)"
      />
      {/* três filas, cada canal consome o que lhe interessa */}
      {[62, 112, 162].map((y) => (
        <g key={y}>
          <path d={`M163 112 C195 112 195 ${y} 222 ${y}`} stroke="var(--muted)" opacity="0.6" />
          {[228, 244, 260].map((x) => (
            <rect
              key={x}
              x={x} y={y - 7} width="12" height="14" rx="2"
              stroke={x === 228 ? "currentColor" : "var(--muted)"}
              opacity={x === 228 ? 1 : 0.6}
            />
          ))}
        </g>
      ))}
      {/* web (SSE) e mobile (FCM) */}
      <path d="M276 62 C300 62 300 70 318 70" stroke="var(--muted)" opacity="0.6" />
      <path d="M276 162 C300 162 300 166 318 166" stroke="var(--muted)" opacity="0.6" />
      <rect x="324" y="52" width="44" height="30" rx="3" stroke="currentColor" />
      <line x1="338" y1="88" x2="354" y2="88" stroke="currentColor" />
      <rect x="332" y="146" width="24" height="42" rx="5" stroke="currentColor" />
      <line x1="340" y1="181" x2="348" y2="181" stroke="currentColor" opacity="0.6" />
    </g>
  );
}

// Extrato em PDF de um lado, lançamentos do outro, conciliação no meio
function ArteHortifruti() {
  return (
    <g fill="none" strokeWidth="1.5" strokeLinecap="round">
      {/* extrato */}
      <rect x="55" y="35" width="110" height="155" rx="6" stroke="var(--muted)" />
      {[55, 70, 85, 100, 115, 130, 145].map((y, i) => (
        <line
          key={y}
          x1="70" y1={y} x2={i % 2 === 0 ? 150 : 128} y2={y}
          stroke="var(--border-strong)"
        />
      ))}
      <line x1="70" y1="168" x2="150" y2="168" stroke="currentColor" />
      {/* lançamentos conciliados: cada curva casa uma linha do extrato */}
      {[
        { deY: 70, paraY: 60, casada: true },
        { deY: 100, paraY: 100, casada: true },
        { deY: 130, paraY: 140, casada: true },
        { deY: 145, paraY: 175, casada: false },
      ].map(({ deY, paraY, casada }) => (
        <g key={deY}>
          <path
            d={`M165 ${deY} C 200 ${deY} 195 ${paraY} 228 ${paraY}`}
            stroke={casada ? "currentColor" : "var(--muted)"}
            strokeDasharray={casada ? undefined : "4 5"}
            opacity={casada ? 0.8 : 0.5}
          />
          <circle
            cx="238" cy={paraY} r="4.5"
            fill={casada ? "currentColor" : "none"}
            stroke={casada ? undefined : "var(--muted)"}
          />
          <line
            x1="252" y1={paraY} x2="345" y2={paraY}
            stroke="var(--muted)" opacity="0.6"
          />
        </g>
      ))}
    </g>
  );
}

// A marca do FieldFlow: quatro leiras de um campo arado que se juntam numa
// linha só — o campo à esquerda, o fluxo à direita. Mesma arte do app, em
// traço, no osso da paleta.
function ArteFieldFlow() {
  return (
    <g
      transform="translate(140 52.5) scale(2.5)"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 13h9c8 0 8 11 16 11h11" />
      <path d="M6 20.5h9c6 0 6 3.5 14 3.5" />
      <path d="M6 27.5h9c6 0 6-3.5 14-3.5" />
      <path d="M6 35h9c8 0 8-11 16-11" />
    </g>
  );
}

// Fallback para slug sem arte própria: campo de pontos com uma diagonal viva
function ArteGenerica() {
  const pontos: Array<[number, number]> = [];
  for (let x = 40; x <= 360; x += 40) {
    for (let y = 35; y <= 195; y += 40) {
      pontos.push([x, y]);
    }
  }
  return (
    <g>
      {pontos.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="var(--border-strong)" />
      ))}
      <line
        x1="40" y1="195" x2="360" y2="35"
        stroke="currentColor" strokeWidth="1.5" opacity="0.6"
      />
    </g>
  );
}

const artes: Record<string, () => React.ReactElement> = {
  "biblioteca-de-grafos": ArteGrafos,
  atlasleaf: ArteAtlasLeaf,
  biblioo: ArteBiblioo,
  "hortifruti-santa-luzia": ArteHortifruti,
  fieldflow: ArteFieldFlow,
};

export function CapaProjeto({ projeto }: { projeto: Projeto }) {
  if (projeto.imagem) {
    return (
      <Image
        src={projeto.imagem.src}
        alt={projeto.imagem.alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className={`${ajustesImagem[projeto.imagem.ajuste ?? 'cover']} transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
    );
  }

  const Arte = artes[projeto.slug] ?? ArteGenerica;
  return (
    <svg
      viewBox="0 0 400 225"
      aria-hidden
      fill="none"
      className="size-full text-accent transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    >
      <Arte />
    </svg>
  );
}
