import type { ReactNode } from "react";

/*
 * Kit das figuras. Cada figura é um laço de T segundos, e cada peça animada
 * declara em que instantes do laço muda de estado. Tudo vira SMIL com a mesma
 * duração e `keyTimes`, então as peças ficam sincronizadas sem JS por quadro,
 * e a moldura (Figura.tsx) pausa o SVG inteiro com pauseAnimations().
 */

// [instante em segundos dentro do laço, valor naquele instante]
export type Quadro = [number, number | string];

// Completa as pontas (0 e T) repetindo o valor vizinho e converte instantes
// em frações do laço. Instantes iguais em sequência viram salto seco.
export function quadros(T: number, lista: Quadro[]) {
  const q = [...lista].sort((a, b) => a[0] - b[0]);
  if (q[0][0] > 0) q.unshift([0, q[0][1]]);
  if (q[q.length - 1][0] < T) q.push([T, q[q.length - 1][1]]);
  return {
    values: q.map(([, v]) => v).join(";"),
    keyTimes: q.map(([t]) => Math.min(1, Math.max(0, t / T)).toFixed(4)).join(";"),
  };
}

// Janela de visibilidade: 0 fora de [de, ate], 1 dentro, com esmaecimento curto
export function janela(de: number, ate: number, fade = 0.08): Quadro[] {
  return [
    [Math.max(0, de - fade), 0],
    [de, 1],
    [ate, 1],
    [ate + fade, 0],
  ];
}

// Várias janelas no mesmo laço (a peça acende mais de uma vez)
export function janelas(lista: Array<[number, number]>, fade = 0.08): Quadro[] {
  return lista.flatMap(([de, ate]) => janela(de, ate, fade));
}

export function Anim({
  attr,
  T,
  q,
}: {
  attr: string;
  T: number;
  q: Quadro[];
}) {
  const { values, keyTimes } = quadros(T, q);
  return (
    <animate
      attributeName={attr}
      dur={`${T}s`}
      repeatCount="indefinite"
      values={values}
      keyTimes={keyTimes}
      calcMode="linear"
    />
  );
}

// Peça que só aparece dentro das janelas dadas
export function Piscar({
  T,
  em,
  children,
  fade,
}: {
  T: number;
  em: Array<[number, number]>;
  children: ReactNode;
  fade?: number;
}) {
  return (
    <g opacity="0">
      {children}
      <Anim attr="opacity" T={T} q={janelas(em, fade)} />
    </g>
  );
}

/*
 * Pacote que percorre `d` entre `de` e `ate` e some fora dessa janela.
 * O conteúdo é desenhado em torno da origem (0,0): animateMotion translada.
 * `trechos` permite o mesmo pacote refazer o caminho mais de uma vez.
 */
export function Viagem({
  T,
  d,
  de,
  ate,
  children,
}: {
  T: number;
  d: string;
  de: number;
  ate: number;
  children: ReactNode;
}) {
  const movimento = quadros(T, [
    [de, 0],
    [ate, 1],
  ]);
  return (
    <g opacity="0">
      {children}
      <animateMotion
        dur={`${T}s`}
        repeatCount="indefinite"
        path={d}
        keyPoints={movimento.values}
        keyTimes={movimento.keyTimes}
        calcMode="linear"
      />
      <Anim attr="opacity" T={T} q={janela(de, ate, 0.06)} />
    </g>
  );
}

// Pacote padrão: ponto no sinal com halo
export function Pacote({ r = 3.4, cor = "var(--signal)" }: { r?: number; cor?: string }) {
  return (
    <>
      <circle r={r * 2.2} fill={cor} opacity="0.18" />
      <circle r={r} fill={cor} />
    </>
  );
}

// Cantos de enquadramento (visor de câmera, área de captura)
export function Cantos({
  x,
  y,
  w,
  h,
  t = 12,
  className = "f-linha",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  t?: number;
  className?: string;
}) {
  return (
    <g className={className}>
      <path d={`M${x} ${y + t} V${y} H${x + t}`} />
      <path d={`M${x + w - t} ${y} H${x + w} V${y + t}`} />
      <path d={`M${x} ${y + h - t} V${y + h} H${x + t}`} />
      <path d={`M${x + w - t} ${y + h} H${x + w} V${y + h - t}`} />
    </g>
  );
}
