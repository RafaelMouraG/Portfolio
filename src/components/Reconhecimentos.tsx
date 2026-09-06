import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

/*
 * Prêmios dos Trabalhos Interdisciplinares: três "melhor da turma" e o
 * Biblioo na disputa pelo melhor do semestre. Mesmo formato compacto de
 * OutrosProjetos (título + uma linha, régua entre itens), mas com ✦ no
 * lugar da seta de link — aqui o destino é o feito, não uma URL. O item
 * pendente usa o ponto pulsante em vez do ✦, para não vender o que ainda
 * não aconteceu.
 */
export function Reconhecimentos({ idioma }: { idioma: Idioma }) {
  const { reconhecimentos } = conteudo[idioma].perfil;
  if (reconhecimentos.length === 0) return null;

  return (
    <section aria-labelledby="reconhecimentos-titulo" className="flex flex-col gap-[18px]">
      <SectionTitle id="reconhecimentos-titulo" numero="03">
        {textos[idioma].reconhecimentos}
      </SectionTitle>

      <ul className="flex flex-col">
        {reconhecimentos.map(({ titulo, descricao, pendente }) => (
          <li
            key={titulo}
            className="flex items-baseline justify-between gap-5 border-t border-border-soft px-1 py-[13px]"
          >
            <span className="flex flex-col gap-[3px]">
              <span className="text-[15px] tracking-[-0.005em] text-foreground">
                {titulo}
              </span>
              <span className="text-[13.5px] leading-[1.5] text-pretty text-muted">
                {descricao}
              </span>
            </span>
            {pendente ? (
              <span
                aria-hidden
                className="pulso-disponivel size-1.5 shrink-0 self-center rounded-full bg-foreground"
              />
            ) : (
              <span aria-hidden className="shrink-0 self-center text-dim">
                ✦
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
