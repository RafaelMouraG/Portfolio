import Link from "next/link";
import type { Projeto } from "@/content/projetos";

const rotuloArea = {
  dados: "Dados e IA",
  dev: "Dev",
} as const;

export function ProjectCard({ projeto }: { projeto: Projeto }) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="accent-transition group flex h-full flex-col rounded-xl border border-border bg-surface p-6 hover:border-accent"
    >
      <div className="flex flex-wrap gap-2 font-mono text-xs text-muted">
        {projeto.areas.map((area) => (
          <span key={area} className="rounded-full border border-border px-2 py-0.5">
            {rotuloArea[area]}
          </span>
        ))}
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
      <p className="mt-4 font-mono text-xs text-muted">
        {projeto.stack.join(" · ")}
      </p>
    </Link>
  );
}
