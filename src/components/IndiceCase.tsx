"use client";

import { useEffect, useState } from "react";

/*
 * Índice lateral do case: marca a seção que está sendo lida. A marca é um
 * traço vermelho que cresce, e o estado também vai para aria-current.
 */
export function IndiceCase({ titulo, secoes }: { titulo: string; secoes: Array<{ id: string; rotulo: string }> }) {
  const [ativa, setAtiva] = useState(secoes[0]?.id);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting);
        if (visiveis.length > 0) setAtiva(visiveis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of secoes) {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, [secoes]);

  return (
    <nav aria-label={titulo} className="flex flex-col gap-4">
      <p className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">{titulo}</p>
      <ol className="flex flex-col gap-1">
        {secoes.map(({ id, rotulo }, i) => {
          const atual = id === ativa;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={atual ? "location" : undefined}
                className={`transicao group flex items-center gap-3 py-1.5 text-[14px] no-underline ${
                  atual ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ${atual ? "w-6 bg-signal" : "w-3 bg-border-strong group-hover:w-4"}`}
                />
                <span aria-hidden className={`font-mono text-[11px] ${atual ? "text-signal" : "text-faint"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {rotulo}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
