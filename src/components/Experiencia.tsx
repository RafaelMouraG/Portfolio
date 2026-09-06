import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

/*
 * Linha do tempo curta: onde está (Business Tec), projeto com cliente real
 * (Hortifruti) e formação (PUC Minas). Trilho vertical à esquerda com dots
 * que acendem no hover do item — o gesto "timeline" sem sair da régua fina
 * do design. Sem datas inventadas: o período é atual, projeto ou conclusão.
 */
export function Experiencia({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];

  return (
    <section aria-labelledby="experiencia-titulo" className="flex flex-col gap-[22px]">
      <SectionTitle
        id="experiencia-titulo"
        numero="02"
        meta={
          <p className="font-mono text-xs text-faint">
            {perfil.experiencia.length}
          </p>
        }
      >
        {textos[idioma].experiencia}
      </SectionTitle>

      <ol className="relative flex flex-col before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-border-soft">
        {perfil.experiencia.map(({ local, papel, periodo, descricao, stack }) => (
          <li key={local} className="group relative flex flex-col gap-1 py-[15px] pl-7">
            <span
              aria-hidden
              className="accent-transition absolute top-[19px] left-0 size-[11px] rounded-full border border-border-strong bg-background group-hover:bg-foreground"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15px] font-medium tracking-[-0.005em]">
                {local}
              </h3>
              <span className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">
                {periodo}
              </span>
            </div>
            <p className="text-[13.5px] text-muted">{papel}</p>
            <p className="text-[13.5px] leading-[1.5] text-pretty text-faint">
              {descricao}
            </p>
            {stack && stack.length > 0 && (
              <p className="font-mono text-[11px] leading-[1.5] text-fainter">
                {stack.map((item, i) => (
                  <span key={item}>
                    {i > 0 && (
                      <span aria-hidden className="text-dim">
                        {" "}
                        ·{" "}
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
