import type { Idioma } from "@/lib/i18n";
import { Contato } from "./Contato";
import { ListaProjetos } from "./ListaProjetos";
import { PainelLateral } from "./PainelLateral";
import { Sobre } from "./Sobre";

/*
 * A home em duas colunas a partir de lg: à esquerda a coluna fixa (tese,
 * filtro, índice, links) e à direita o palco que rola, com um painel por
 * projeto, o "Sobre" e o contato. Abaixo de lg, tudo empilha.
 */
export function Home({ idioma, destinoIdioma }: { idioma: Idioma; destinoIdioma: string }) {
  return (
    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:gap-[clamp(24px,4vw,72px)]">
      <PainelLateral idioma={idioma} destinoIdioma={destinoIdioma} />
      <main className="grid content-start gap-4 pt-6 pb-9 lg:gap-6">
        <ListaProjetos idioma={idioma} />
        <Sobre idioma={idioma} />
        <Contato idioma={idioma} />
      </main>
    </div>
  );
}
