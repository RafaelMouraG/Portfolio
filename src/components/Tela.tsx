import type { Projeto } from "@/content/projetos";
import { textos, type Idioma } from "@/lib/i18n";
import { DiagramaVivo } from "./DiagramaVivo";

/*
 * A "tela" onde o diagrama vivo roda: retângulo no tom do fundo, recortado
 * dentro do painel, com a etiqueta do projeto no alto e a legenda embaixo.
 * Quadrada no celular (o diagrama 16:9 centraliza e sobra faixa para os
 * textos), 16:9 a partir de sm. Serve ao card da home e ao topo do case.
 */
export function Tela({
  projeto,
  numero,
  idioma,
}: {
  projeto: Projeto;
  numero: string;
  idioma: Idioma;
}) {
  const area = textos[idioma].areas[projeto.areas[0]];
  return (
    <div className="relative aspect-square max-w-full overflow-hidden rounded-[18px] bg-bg sm:aspect-video">
      <span className="absolute top-3.5 left-4 z-10 font-mono text-xs text-ink-2">
        {numero} · {area} · {projeto.contexto}
      </span>
      <DiagramaVivo slug={projeto.slug} idioma={idioma} />
      <span className="absolute right-4 bottom-3.5 left-4 z-10 flex items-center gap-2 font-mono text-xs text-ink-2">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
        {projeto.legenda}
      </span>
    </div>
  );
}
