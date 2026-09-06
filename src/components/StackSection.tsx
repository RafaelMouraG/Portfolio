import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

/*
 * A stack herda a linha de "Experience" do design: coluna estreita em mono à
 * esquerda, conteúdo à direita, alinhados pela linha de base e separados por
 * uma régua fininha. Os itens viram texto corrido em mono em vez de chips —
 * é o que o design faz com metadados, e cabe muito mais coisa por linha.
 */
export function StackSection({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const total = perfil.stack.reduce((soma, { itens }) => soma + itens.length, 0);

  return (
    <section aria-labelledby="stack-titulo" className="flex flex-col gap-[22px]">
      <SectionTitle
        id="stack-titulo"
        numero="04"
        meta={<p className="font-mono text-xs text-faint">{total}</p>}
      >
        {textos[idioma].stack}
      </SectionTitle>

      <dl className="flex flex-col">
        {perfil.stack.map(({ grupo, area, itens }) => (
          <div
            key={grupo}
            // data-accent marca a área do grupo; sem cor na paleta, não muda nada
            data-accent={area}
            className="grid grid-cols-1 items-baseline gap-x-[18px] gap-y-1.5 border-b border-border-soft px-1 py-[15px] sm:grid-cols-[140px_1fr]"
          >
            <dt className="font-mono text-[11.5px] leading-[1.4] text-muted">{grupo}</dt>
            <dd className="font-mono text-[12.5px] leading-[1.7] text-faint">
              {itens.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden className="text-dim"> · </span>}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
