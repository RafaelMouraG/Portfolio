"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import type { Projeto } from "@/content/projetos";
import { caminhoDoCase, textos, type Idioma } from "@/lib/i18n";
import { FiguraDoProjeto } from "./figuras";

/*
 * Card de projeto: a figura animada em cima, o texto embaixo. O título é o
 * link, esticado por ::after sobre o card inteiro; a figura fica por cima
 * dele com pointer-events desligado, então clicar no desenho abre o case e
 * só o botão de pausa da moldura recebe o clique.
 *
 * A figura tem o mesmo nome de transição na página do case: ao abrir, o
 * desenho cresce do card até o topo do case (React <ViewTransition>).
 *
 * `largo` ocupa a linha inteira da grade (contagem ímpar no filtro): a partir
 * de lg, figura à esquerda e texto à direita.
 */
export function ProjectCard({
  projeto,
  idioma,
  numero,
  largo = false,
}: {
  projeto: Projeto;
  idioma: Idioma;
  numero: number;
  largo?: boolean;
}) {
  const t = textos[idioma];

  return (
    <article
      className={`group relative flex h-full flex-col gap-5 ${
        largo ? "lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10" : ""
      }`}
    >
      <ViewTransition name={`figura-${projeto.slug}`} share="morph" default="none">
        <div className="pointer-events-none relative z-[1] transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transform-none [&_button]:pointer-events-auto [&_figure]:transition-colors [&_figure]:duration-300 group-hover:[&_figure]:border-border-strong">
          <FiguraDoProjeto projeto={projeto} numero={numero} idioma={idioma} compacta />
        </div>
      </ViewTransition>

      <div className="flex flex-col gap-2.5 px-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <h3 className="text-[24px] leading-[1.1] font-semibold tracking-[-0.025em] [font-stretch:88%]">
            <Link
              href={caminhoDoCase(idioma, projeto.slug)}
              className="no-underline outline-none after:absolute after:inset-0 after:rounded-[12px] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-signal"
            >
              {projeto.titulo}
            </Link>
          </h3>
          <p className="flex flex-wrap gap-1.5 font-mono text-[10.5px] tracking-[0.04em] uppercase">
            {projeto.estado && (
              <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-signal/50 px-1.5 py-0.5 text-signal">
                <span aria-hidden className="pulso size-1 rounded-full bg-signal" />
                {projeto.estado}
              </span>
            )}
            {projeto.areas.map((area) => (
              <span key={area} className="rounded-[4px] border border-border px-1.5 py-0.5 text-faint">
                {t.areas[area]}
              </span>
            ))}
          </p>
        </div>

        <p className="text-[15px] leading-[1.55] text-pretty text-muted">{projeto.resumo}</p>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-1">
          <p className="font-mono text-[11px] leading-[1.6] text-faint">{projeto.stack.join(" · ")}</p>
          <span aria-hidden className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-muted transition-colors group-hover:text-signal">
            {t.projetos.abrir}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
