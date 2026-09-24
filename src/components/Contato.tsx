import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CopiarEmail } from "./CopiarEmail";

/*
 * Fechamento: o único painel invertido da página (tinta no fundo, névoa no
 * texto). Uma pergunta curta, o e-mail em corpo grande e selecionável com o
 * botão de copiar, e as três versões do currículo. Embaixo, o rodapé mínimo.
 */
export function Contato({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].contato;

  return (
    <>
      <section
        id="contato"
        aria-labelledby="contato-titulo"
        className="grid scroll-mt-6 gap-7 rounded-[22px] bg-ink p-6 text-bg sm:rounded-[28px] sm:p-10"
      >
        <h2
          id="contato-titulo"
          className="max-w-[22ch] font-display text-[clamp(28px,2.8vw,40px)] leading-[1.08] font-light tracking-[-0.035em] text-balance"
        >
          {t.frase}
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-bg/20 pt-6">
          <a
            href={`mailto:${perfil.links.email}`}
            className="font-display text-[clamp(18px,2.2vw,30px)] font-light tracking-[-0.02em] break-all transition-colors hover:text-accent"
          >
            {perfil.links.email}
          </a>
          <CopiarEmail
            email={perfil.links.email}
            rotulo={t.copiar}
            copiadoRotulo={t.copiado}
            className="cursor-pointer rounded-full bg-bg px-[18px] py-[11px] text-sm text-ink transition-opacity hover:opacity-85"
          />
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-bg/75">
          {perfil.curriculos.map(({ rotulo, href }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bg">
                {rotulo} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-wrap justify-between gap-3 px-2 pt-2 font-mono text-xs text-ink-2">
        <span>{perfil.cidade}</span>
        <span>
          <a
            href={perfil.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-[3px] transition-colors hover:text-ink hover:decoration-accent"
          >
            {t.codigoNoGitHub}
          </a>{" "}
          · © {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
}
