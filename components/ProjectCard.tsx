import Link from "next/link";
import type { Projeto } from "@/content/projetos";
import { AreaTag } from "./AreaTag";
import { CapaProjeto } from "./CapaProjeto";

/*
 * O card veste a cor da própria área (data-accent no Link): título, borda e
 * sombra de hover ficam amarelas em projeto de dados e vermelhas em projeto de dev,
 * mesmo com o filtro em "Todos" — é o que dá cor à grade inteira.
 */
export function ProjectCard({ projeto, indice }: { projeto: Projeto; indice: number }) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      data-accent={projeto.areas[0]}
      className="accent-transition group flex h-full flex-col rounded-xl border border-border bg-surface p-6 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_12px_32px_-16px] hover:shadow-accent/40 motion-reduce:hover:translate-y-0"
    >
      <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg border border-border/70 bg-accent/[0.04]">
        <CapaProjeto projeto={projeto} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {projeto.areas.map((area) => (
            <AreaTag key={area} area={area} />
          ))}
        </div>
        <span aria-hidden className="font-mono text-xs text-accent/70">
          {String(indice + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="accent-transition mt-4 font-display text-xl font-semibold group-hover:text-accent">
        {projeto.titulo}
      </h3>
      <p className="mt-2 grow text-muted leading-relaxed">{projeto.resumo}</p>
      {projeto.papel && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-medium text-foreground">Meu papel:</span>{" "}
          {projeto.papel}
        </p>
      )}
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="font-mono text-xs text-muted">{projeto.stack.join(" · ")}</p>
        <span
          aria-hidden
          className="accent-transition shrink-0 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 motion-reduce:opacity-100"
        >
          ver case →
        </span>
      </div>
    </Link>
  );
}
