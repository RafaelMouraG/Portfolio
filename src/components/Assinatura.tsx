"use client";

import { useRef, type PointerEvent } from "react";

/*
 * O primeiro nome em matriz de pontos, enorme e apagado, fechando a página.
 * Sob o cursor, os pontos acendem em vermelho: uma segunda cópia do texto,
 * mascarada por um círculo que segue o ponteiro. Decorativo (aria-hidden).
 */
export function Assinatura({ texto }: { texto: string }) {
  const caixa = useRef<HTMLDivElement>(null);

  function mover(evento: PointerEvent<HTMLDivElement>) {
    const el = caixa.current;
    if (!el || evento.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${evento.clientX - r.left}px`);
    el.style.setProperty("--my", `${evento.clientY - r.top}px`);
    el.style.setProperty("--luz", "1");
  }

  const classe =
    "font-leitura text-[25vw] leading-[0.85] font-black tracking-[-0.02em] whitespace-nowrap lg:text-[20.4rem]";
  const mascara = "radial-gradient(circle 150px at var(--mx, -999px) var(--my, -999px), #000 20%, transparent 72%)";

  return (
    <div
      ref={caixa}
      aria-hidden
      onPointerMove={mover}
      onPointerLeave={() => caixa.current?.style.setProperty("--luz", "0")}
      className="relative overflow-clip select-none"
    >
      <p className={`${classe} text-dim`}>{texto}</p>
      <p
        className={`${classe} pointer-events-none absolute inset-0 text-signal transition-opacity duration-300 motion-reduce:hidden`}
        style={{ maskImage: mascara, WebkitMaskImage: mascara, opacity: "var(--luz, 0)" }}
      >
        {texto}
      </p>
    </div>
  );
}
