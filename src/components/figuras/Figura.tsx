"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { textos, type Idioma } from "@/lib/i18n";
import { useMovimentoReduzido } from "@/lib/movimento";

/*
 * Moldura de instrumento em volta de cada figura: rótulo "fig. 0N" no canto,
 * indicador "ao vivo" que também é o botão de pausa (WCAG 2.2.2: movimento
 * que dura mais de 5 s precisa de um jeito de parar), marcas de corte nos
 * cantos e a legenda curta embaixo.
 *
 * A animação só roda enquanto a figura está na tela. Sob prefers-reduced-motion
 * ela começa parada no instante `pose`, escolhido por figura para mostrar o
 * mecanismo inteiro num quadro só; o botão continua podendo soltar.
 */
export function Figura({
  numero,
  titulo,
  idioma,
  pose,
  children,
  compacta = false,
  controles = true,
}: {
  numero: number;
  titulo: string;
  idioma: Idioma;
  pose: number;
  children: ReactNode;
  compacta?: boolean;
  // false quando a figura mora dentro de um link (prévia do próximo projeto):
  // botão dentro de <a> é HTML inválido, então o indicador vira só rótulo.
  controles?: boolean;
}) {
  const t = textos[idioma].figura;
  const caixa = useRef<HTMLDivElement>(null);
  // null = sem escolha do visitante; a preferência de sistema decide
  const [escolha, setEscolha] = useState<"rodar" | "parar" | null>(null);
  const reduzido = useMovimentoReduzido();
  const [visivel, setVisivel] = useState(false);


  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setVisivel(entrada.isIntersecting),
      { rootMargin: "80px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const parada = escolha === "parar" || (escolha === null && reduzido);
  const rodando = visivel && !parada;

  useEffect(() => {
    const svg = caixa.current?.querySelector("svg");
    if (!svg) return;
    if (rodando) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
      // Parada por escolha ou movimento reduzido: congela no quadro que
      // explica a figura, não num instante aleatório do laço.
      if (parada) svg.setCurrentTime(pose);
    }
  }, [rodando, parada, pose]);

  return (
    <figure
      ref={caixa}
      data-pausada={rodando ? "false" : "true"}
      className="moldura-figura relative isolate overflow-hidden rounded-[10px] border border-border"
    >
      {/* marcas de corte */}
      <span aria-hidden className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-border-strong" />
      <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 size-2.5 border-r border-b border-border-strong" />

      <div
        className={`flex items-center justify-between font-mono text-[10.5px] tracking-[0.06em] text-faint uppercase ${
          compacta ? "px-4 pt-3" : "px-5 pt-4"
        }`}
      >
        <span>
          {t.fig} {String(numero).padStart(2, "0")}
        </span>
        {controles ? (
          <button
            type="button"
            onClick={() => setEscolha(parada ? "rodar" : "parar")}
            aria-label={parada ? t.retomar : t.pausar}
            aria-pressed={parada}
            className="transicao relative z-10 -my-1 -mr-1.5 inline-flex items-center gap-1.5 rounded px-1.5 py-1 hover:text-foreground"
          >
            {parada ? (
              <span aria-hidden className="text-[9px] leading-none">
                ▶
              </span>
            ) : (
              <span aria-hidden className="pulso size-1.5 rounded-full bg-signal" />
            )}
            {parada ? t.pausada : t.aoVivo}
          </button>
        ) : (
          <span aria-hidden className="inline-flex items-center gap-1.5">
            <span className="pulso size-1.5 rounded-full bg-signal" />
            {t.aoVivo}
          </span>
        )}
      </div>

      {/* O desenho é decorativo para leitor de tela: a legenda do case
          descreve o mecanismo em texto. */}
      <div aria-hidden className={compacta ? "px-2 pb-1" : "px-3 pb-2 sm:px-6"}>
        {children}
      </div>

      <figcaption
        className={`flex items-baseline gap-2 border-t border-border-soft text-[13px] tracking-[-0.005em] text-muted ${
          compacta ? "px-4 py-2.5" : "px-5 py-3"
        }`}
      >
        <span aria-hidden className="font-mono text-[10.5px] text-signal">
          ↳
        </span>
        {titulo}
      </figcaption>
    </figure>
  );
}
