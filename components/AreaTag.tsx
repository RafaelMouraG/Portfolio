import type { Area } from "@/content/projetos";

const rotuloArea = {
  dados: "Dados e IA",
  dev: "Dev",
} as const;

/*
 * Tag de área sempre na cor da própria área (amarelo ou verde), independente
 * do filtro ativo: o data-accent no elemento vence o da seção.
 */
export function AreaTag({ area }: { area: Area }) {
  return (
    <span
      data-accent={area}
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {rotuloArea[area]}
    </span>
  );
}
