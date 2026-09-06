import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

/*
 * Lista compacta no formato da seção "Writing" do design: linhas separadas por
 * régua, título à esquerda e um metadado em mono empurrado para a direita —
 * aqui, o convite para abrir o projeto no ar. Sem card e sem página de case.
 */
export function OutrosProjetos({ idioma }: { idioma: Idioma }) {
  const { outrosProjetos } = conteudo[idioma].perfil;
  const t = textos[idioma].projetos;
  if (outrosProjetos.length === 0) return null;

  return (
    <section aria-labelledby="outros-titulo" className="flex flex-col gap-[18px]">
      <SectionTitle id="outros-titulo" numero="05">
        {t.outros}
      </SectionTitle>

      <ul className="flex flex-col">
        {outrosProjetos.map(({ nome, descricao, link }) => {
          const conteudoLinha = (
            <>
              <span className="flex flex-col gap-[3px]">
                <span className="text-[15px] tracking-[-0.005em] text-foreground">
                  {nome}
                </span>
                <span className="text-[13.5px] leading-[1.5] text-pretty text-muted">
                  {descricao}
                </span>
              </span>
              {link && (
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-[11.5px] text-fainter group-hover:text-gold"
                >
                  {t.abrir}
                </span>
              )}
            </>
          );

          return (
            <li key={nome} className="border-t border-border-soft">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-5 px-1 py-[13px] no-underline"
                >
                  {conteudoLinha}
                </a>
              ) : (
                <div className="flex items-baseline justify-between gap-5 px-1 py-[13px]">
                  {conteudoLinha}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
