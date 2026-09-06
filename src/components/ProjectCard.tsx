"use client";

import Link from "next/link";
import type { Projeto } from "@/content/projetos";
import { caminhoDoCase, type Idioma } from "@/lib/i18n";
import { AreaTag } from "./AreaTag";
import { CapaProjeto } from "./CapaProjeto";

/*
 * O card marca a própria área (data-accent no Link); com a paleta neutra a
 * borda de hover é osso em qualquer área, mas o gancho fica para o dia em
 * que a cor por área voltar.
 *
 * A capa fica sobre a hachura diagonal do design: a arte SVG é encaixada
 * (não cortada), então o losango de hachura aparece nas laterais e faz a
 * moldura que o design usa para o placeholder de screenshot.
 *
 * Firula contida: spotlight que segue o cursor sobre o card (vars --mx/--my
 * lidas pela classe .spotlight-card), número do item na capa e seta que
 * desliza para dentro no hover, reforçando que o card abre o case.
 *
 * `largo` é o card que ocupa a linha inteira da grade: a partir de sm, a capa
 * vai para a esquerda e o texto para a direita, com título um pouco maior.
 * No celular ele é igual aos outros.
 */
export function ProjectCard({
  projeto,
  idioma,
  largo = false,
  indice = 0,
}: {
  projeto: Projeto;
  idioma: Idioma;
  largo?: boolean;
  indice?: number;
}) {
  function aoMover(evento: React.MouseEvent<HTMLAnchorElement>) {
    const el = evento.currentTarget;
    const caixa = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${evento.clientX - caixa.left}px`);
    el.style.setProperty("--my", `${evento.clientY - caixa.top}px`);
  }

  return (
    <Link
      href={caminhoDoCase(idioma, projeto.slug)}
      data-accent={projeto.areas[0]}
      onMouseMove={aoMover}
      className={`spotlight-card group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:border-accent/45 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] motion-reduce:hover:translate-y-0 ${
        largo ? "sm:grid sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : ""
      }`}
    >
      <div
        className={`hachura relative grid h-[150px] place-items-center border-b border-border-soft ${
          largo ? "sm:h-full sm:min-h-[210px] sm:border-r sm:border-b-0" : ""
        }`}
      >
        <span
          aria-hidden
          className="absolute top-3 left-4 z-[2] font-mono text-[11px] tracking-[0.08em] text-fainter"
        >
          {String(indice + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="accent-transition absolute top-2.5 right-4 z-[2] -translate-x-1 translate-y-1 font-mono text-[13px] text-fainter opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100"
        >
          ↗
        </span>
        <CapaProjeto projeto={projeto} />
      </div>

      <div className="relative z-[2] flex grow flex-col gap-[7px] px-[18px] pt-4 pb-[18px]">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={`font-medium tracking-[-0.01em] ${
              largo ? "text-[15.5px] sm:text-[18px]" : "text-[15.5px]"
            }`}
          >
            {projeto.titulo}
          </h3>
          <span className="flex shrink-0 gap-2">
            {projeto.areas.map((area) => (
              <AreaTag key={area} area={area} idioma={idioma} />
            ))}
          </span>
        </div>

        {/* Sem a linha "Papel": em projeto de equipe ela repetia o resumo quase
            palavra por palavra. Fica só na página do case. */}
        <p className="text-[13.5px] leading-[1.5] text-pretty text-muted">{projeto.resumo}</p>

        <p className="mt-auto pt-2.5 font-mono text-[11px] leading-[1.5] text-fainter">
          {projeto.stack.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
