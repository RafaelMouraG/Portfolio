import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { HoraLocal } from "./HoraLocal";

/*
 * Fechamento do design: uma frase grande em serifa itálica e o e-mail como o
 * único botão da tela. Não leva numeral de seção — no design essa parte é o
 * desfecho, não mais um item da lista.
 *
 * O miolo da frase era dourado; com a paleta neutra, o destaque vira peso:
 * a frase é light e o trecho destacado é regular.
 */
export function Contato({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].contato;

  return (
    <>
      <section aria-labelledby="contato-titulo" className="flex flex-col gap-[22px] pt-14 text-center">
        <h2 id="contato-titulo" className="sr-only">
          {t.titulo}
        </h2>

        <p className="font-serif text-[34px] leading-[1.15] font-light tracking-[-0.01em] text-balance italic sm:text-[44px]">
          {t.frase.inicio}
          <span className="font-normal">{t.frase.destaque}</span>
          {t.frase.fim}
        </p>

        <div>
          <a
            href={`mailto:${perfil.links.email}`}
            className="accent-transition inline-block rounded-[10px] bg-foreground px-[26px] py-[13px] text-[15px] font-medium break-all text-background no-underline hover:bg-white"
          >
            {perfil.links.email}
          </a>
        </div>

        <p className="font-mono text-[11.5px] leading-[1.8] text-faint">
          {t.curriculos}{" "}
          {perfil.curriculos.map(({ rotulo, href }, i) => (
            <span key={href}>
              {i > 0 && <span aria-hidden className="text-dim"> · </span>}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border-strong hover:text-gold hover:decoration-gold"
              >
                {rotulo}
              </a>
            </span>
          ))}
        </p>
      </section>

      {/* Assinatura de encerramento: o primeiro nome em contorno gigante,
          full-bleed e decorativo (aria-hidden, o h2 sr-only acima já nomeia
          a seção). overflow-clip + overflow-x clip no body evitam scroll
          horizontal do truque w-screen. */}
      <div
        aria-hidden
        className="pointer-events-none relative left-1/2 w-screen -translate-x-1/2 overflow-clip select-none"
      >
        <p className="contorno-gigante text-center text-[24vw] leading-[0.9] font-semibold tracking-[-0.04em] whitespace-nowrap sm:text-[190px]">
          {perfil.nome.split(" ")[0].toUpperCase()}
        </p>
      </div>

      <footer className="flex flex-wrap items-baseline justify-between gap-5 border-t border-border-soft pt-[26px] font-mono text-[11.5px] leading-[1.6] text-fainter">
        <span>
          {t.cidade}
          <HoraLocal locale={idioma === "pt" ? "pt-BR" : "en-GB"} />
        </span>
        <span>
          <a
            href={perfil.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border-strong hover:text-gold hover:decoration-gold"
          >
            {t.codigoNoGitHub}
          </a>
          <span aria-hidden className="text-dim"> · </span>© {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
}
