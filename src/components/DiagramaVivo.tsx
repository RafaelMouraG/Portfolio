"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Um diagrama animado por projeto, mostrando o mecanismo que o case explica:
 * o que acontece com uma mensagem, uma folha, um extrato, um evento, um nó.
 * Traço fino em tinta; o laranja marca só o que está em movimento.
 *
 * As partículas andam com SMIL (<animateMotion>), que não depende de JS e
 * roda já no HTML do servidor. As animações de traço ficam em globals.css
 * (.d-match, .d-hit, .d-ponte...).
 *
 * Partícula com atraso nasce escondida e só aparece quando começa a andar;
 * sem isso ela ficaria parada na origem do SVG até o primeiro `begin`.
 *
 * Sob prefers-reduced-motion, o SVG é pausado num instante em que as
 * partículas já estão no caminho, para o quadro parado ainda contar a história.
 */

type Rotulos = (typeof textos)[Idioma]["diagrama"];

// Persistir primeiro, depois o fanout: banco → exchange → filas → web e mobile
function Biblioo({ t }: { t: Rotulos }) {
  return (
    <>
      <ellipse className="d-line" cx="84" cy="112" rx="28" ry="9" />
      <path className="d-line" d="M56 112v48M112 112v48M56 160a28 9 0 0 0 56 0" />
      <circle className="d-acc" cx="84" cy="138" r="4">
        <animate attributeName="r" values="0;6;0;0" keyTimes="0;.15;.3;1" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <path className="d-soft" d="M116 136H186" />
      <rect className="d-line" x="192" y="122" width="26" height="26" rx="3" transform="rotate(45 205 135)" />
      <path className="d-soft" d="M224 135c30 0 30-52 62-52M224 135c30 0 30 56 62 56" />
      <g className="d-line">
        {[75, 183].map((y) =>
          [294, 311, 328].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="11" height="16" rx="2" />),
        )}
      </g>
      <path className="d-soft" d="M346 83h38M346 191h50" />
      <rect className="d-line" x="388" y="62" width="62" height="42" rx="5" />
      <path className="d-line" d="M410 112h18" />
      <rect className="d-line" x="400" y="164" width="30" height="56" rx="7" />
      <text className="d-lbl" x="84" y="192" textAnchor="middle">{t.banco}</text>
      <text className="d-lbl" x="205" y="180" textAnchor="middle">exchange</text>
      <text className="d-lbl" x="419" y="130" textAnchor="middle">{t.web}</text>
      <text className="d-lbl" x="415" y="240" textAnchor="middle">{t.mobile}</text>
      <circle className="d-acc" r="4" visibility="hidden">
        <set attributeName="visibility" to="visible" begin="0.4s" />
        <animateMotion
          dur="2.8s" begin="0.4s" repeatCount="indefinite" calcMode="linear"
          keyPoints="0;0;1" keyTimes="0;.12;1"
          path="M116 136H205C255 135 255 83 286 83H384"
        />
      </circle>
      <circle className="d-dot" r="3.5" visibility="hidden">
        <set attributeName="visibility" to="visible" begin="0.4s" />
        <animateMotion
          dur="2.8s" begin="0.4s" repeatCount="indefinite" calcMode="linear"
          keyPoints="0;0;1" keyTimes="0;.12;1"
          path="M116 136H205C255 135 255 191 286 191H396"
        />
      </circle>
    </>
  );
}

// Folha sob escaneamento; a barra de confiança passa ou não do limiar
function AtlasLeaf({ t }: { t: Rotulos }) {
  const tempos = "0;.2;.45;.5;.7;.95;1";
  return (
    <>
      <path className="d-soft" d="M150 58V40h18M330 58V40h-18M150 212v18h18M330 212v18h-18" />
      <path className="d-line" d="M240 50c58 28 70 100 0 170-70-70-58-142 0-170z" />
      <path className="d-soft" d="M240 60c3 50 3 100 0 150M241 110c16 6 28 16 36 28M240 150c-15 6-27 16-34 27" />
      <circle className="d-acc" cx="262" cy="118" r="3" opacity=".8" />
      <circle className="d-acc" cx="226" cy="160" r="2.4" opacity=".7" />
      <circle className="d-acc" cx="252" cy="176" r="2" opacity=".6" />
      <line className="d-acc-line" x1="160" y1="0" x2="320" y2="0" opacity=".7" transform="translate(0 52)">
        <animateTransform attributeName="transform" type="translate" values="0 52;0 218;0 52" dur="3s" repeatCount="indefinite" />
      </line>
      <rect className="d-line" x="384" y="60" width="12" height="150" rx="6" />
      <rect className="d-dot" x="386" width="8" rx="4" y="208" height="0">
        <animate attributeName="height" values="0;126;126;0;52;52;0" keyTimes={tempos} dur="6s" repeatCount="indefinite" />
        <animate attributeName="y" values="208;82;82;208;156;156;208" keyTimes={tempos} dur="6s" repeatCount="indefinite" />
      </rect>
      <path className="d-acc-line" d="M372 110h36" strokeDasharray="3 3" />
      <text className="d-lbl" x="414" y="113">{t.limiar}</text>
      <text className="d-lbl" x="40" y="128" opacity="0">
        {t.confiante[0]}
        <tspan x="40" dy="14">{t.confiante[1]}</tspan>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.18;.22;.44;.48;1" dur="6s" repeatCount="indefinite" />
      </text>
      <text className="d-lbl-acc" x="40" y="128" opacity="0">
        {t.abstencao[0]}
        <tspan x="40" dy="14">{t.abstencao[1]}</tspan>
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.68;.72;.94;.98" dur="6s" repeatCount="indefinite" />
      </text>
    </>
  );
}

// Linhas do extrato em PDF casando, uma a uma, com os lançamentos
function Hortifruti({ t }: { t: Rotulos }) {
  const casadas = [
    { de: 98, para: 64 },
    { de: 142, para: 116 },
    { de: 164, para: 168 },
  ];
  return (
    <>
      <rect className="d-line" x="66" y="44" width="124" height="190" rx="8" />
      <path className="d-soft" d="M86 76h84M86 98h62M86 120h84M86 142h62M86 164h84M86 186h62M86 208h84" />
      <text className="d-lbl" x="66" y="34">{t.extrato}</text>
      <text className="d-lbl" x="312" y="34">{t.lancamentos}</text>
      {casadas.map(({ de, para }, i) => (
        <path
          key={de}
          className="d-acc-line d-match"
          pathLength={1}
          style={{ animationDelay: `${i * 0.5}s` }}
          d={`M190 ${de}C248 ${de} 248 ${para} 304 ${para}`}
        />
      ))}
      <path className="d-soft d-orfao" d="M190 208C248 208 248 220 304 220" strokeDasharray="3 5" />
      {casadas.map(({ para }, i) => (
        <circle key={para} className="d-hit" style={{ animationDelay: `${i * 0.5}s` }} cx="312" cy={para} r="4.5" />
      ))}
      <circle cx="312" cy="220" r="4.5" fill="none" stroke="var(--ink-3)" />
      <path className="d-soft" d="M326 64h104M326 116h84M326 168h104M326 220h70" />
    </>
  );
}

// As quatro leiras do logo viram filas de eventos; o repetido some na junção
function FieldFlow({ t }: { t: Rotulos }) {
  const leiras = [
    "M6 13h9c8 0 8 11 16 11h11",
    "M6 20.5h9c6 0 6 3.5 14 3.5",
    "M6 27.5h9c6 0 6-3.5 14-3.5",
    "M6 35h9c8 0 8-11 16-11",
  ];
  // Mesmas leiras, estendidas até a saída para a partícula seguir em frente
  const trajetos = [
    { d: "M6 13h9c8 0 8 11 16 11h11", inicio: "0s" },
    { d: "M6 27.5h9c6 0 6-3.5 14-3.5h13", inicio: "0.8s" },
    { d: "M6 35h9c8 0 8-11 16-11h11", inicio: "1.6s" },
    { d: "M6 20.5h9c6 0 6 3.5 14 3.5h13", inicio: "2.4s" },
  ];
  const repetido = trajetos[3];
  return (
    <>
      <g transform="translate(96 -9) scale(6)">
        {leiras.map((d) => (
          <path key={d} className="d-line" vectorEffect="non-scaling-stroke" d={d} />
        ))}
        {trajetos.map(({ d, inicio }) => (
          <circle key={d} className="d-dot" r=".7" visibility="hidden">
            <set attributeName="visibility" to="visible" begin={inicio} />
            <animateMotion dur="3.2s" begin={inicio} repeatCount="indefinite" path={d} />
          </circle>
        ))}
        <circle className="d-acc" r=".7" visibility="hidden">
          <set attributeName="visibility" to="visible" begin="2.7s" />
          <animateMotion dur="3.2s" begin="2.7s" repeatCount="indefinite" path={repetido.d} />
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.55;.62;1" dur="3.2s" begin="2.7s" repeatCount="indefinite" />
          <animate attributeName="r" values=".7;.7;2.2;2.2" keyTimes="0;.55;.62;1" dur="3.2s" begin="2.7s" repeatCount="indefinite" />
        </circle>
      </g>
      <text className="d-lbl" x="132" y="58">{t.eventos}</text>
      <text className="d-lbl" x="348" y="130">{t.contratacao}</text>
    </>
  );
}

// Duas comunidades e o nó-ponte que atravessa a fronteira entre elas
function Grafos({ t }: { t: Rotulos }) {
  const nos: Array<[number, number]> = [
    [84, 84], [132, 64], [172, 104], [102, 152], [152, 176], [80, 208],
    [322, 70], [388, 92], [402, 164], [336, 184], [298, 132],
  ];
  return (
    <>
      <path
        className="d-soft"
        d="M84 84L132 64L172 104L102 152L84 84M172 104L152 176L102 152L80 208L152 176M322 70L388 92L402 164L336 184L298 132L322 70M388 92L336 184"
      />
      <path className="d-ponte" d="M240 128L172 104M240 128L152 176M240 128L298 132M240 128L322 70" />
      {nos.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="d-dot" cx={x} cy={y} r="4" />
      ))}
      <circle className="d-acc" cx="240" cy="128" r="7" />
      <circle cx="240" cy="128" r="12" fill="none" stroke="var(--accent)" strokeWidth="1">
        <animate attributeName="r" values="10;22" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".8;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text className="d-lbl" x="84" y="240">{t.comunidadeA}</text>
      <text className="d-lbl" x="330" y="222">{t.comunidadeB}</text>
      <text className="d-lbl-acc" x="240" y="100" textAnchor="middle">{t.popularidade}</text>
    </>
  );
}

// Slug sem diagrama próprio: campo de pontos com uma diagonal viva
function Generico() {
  const pontos: Array<[number, number]> = [];
  for (let x = 60; x <= 420; x += 40) for (let y = 55; y <= 215; y += 40) pontos.push([x, y]);
  return (
    <>
      {pontos.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="var(--ink-3)" />
      ))}
      <path className="d-acc-line" d="M60 215L420 55" opacity=".7" />
    </>
  );
}

const diagramas: Record<string, (props: { t: Rotulos }) => ReactElement> = {
  biblioo: Biblioo,
  atlasleaf: AtlasLeaf,
  "hortifruti-santa-luzia": Hortifruti,
  fieldflow: FieldFlow,
  "biblioteca-de-grafos": Grafos,
};

export function DiagramaVivo({ slug, idioma }: { slug: string; idioma: Idioma }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    svg.pauseAnimations();
    svg.setCurrentTime(1.2);
  }, []);

  const Diagrama = diagramas[slug] ?? Generico;
  return (
    <svg ref={ref} viewBox="0 0 480 270" aria-hidden className="absolute inset-0 size-full">
      <Diagrama t={textos[idioma].diagrama} />
    </svg>
  );
}
