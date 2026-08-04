import type { Area } from "@/content/projetos";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Tag de área sempre na cor da própria área (amarelo ou verde), independente
 * do filtro ativo: o data-accent no elemento vence o da seção.
 */
export function AreaTag({ area, idioma }: { area: Area; idioma: Idioma }) {
  return (
    <span
      data-accent={area}
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {textos[idioma].areas[area]}
    </span>
  );
}
