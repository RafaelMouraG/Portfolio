import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CopiarEmail } from "./CopiarEmail";
import { IconeGithub, IconeLinkedin } from "./Icones";
import { SistemaVivo } from "./SistemaVivo";

/*
 * Abertura: selo de status, o nome em largura total com a varredura de
 * calibração (CSS puro, em globals.css), e embaixo duas colunas — a tese e os
 * botões de um lado, o sistema que o visitante pode derrubar do outro.
 *
 * O nome sai do servidor pronto; a varredura só recorta e revela. Leitor de
 * tela e busca veem o texto inteiro desde o primeiro byte.
 */
export function Hero({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].hero;

  const cvPrincipal =
    perfil.curriculos.find(({ principal }) => principal) ?? perfil.curriculos[0];
  const [lead, ...resto] = perfil.sobre;

  const atalhos = [
    { rotulo: "GitHub", href: perfil.links.github, icone: <IconeGithub className="size-4" /> },
    { rotulo: "LinkedIn", href: perfil.links.linkedin, icone: <IconeLinkedin className="size-4" /> },
  ].filter(({ href }) => Boolean(href));

  return (
    <header className="flex flex-col gap-9 pt-10 sm:gap-12 sm:pt-16">
      <div className="surgir flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1.5 pr-3.5 pl-3 font-mono text-[11.5px] tracking-[0.02em] text-muted">
          <span aria-hidden className="relative grid size-2 place-items-center">
            <span className="size-2 rounded-full bg-signal" />
            <span className="onda absolute size-2 rounded-full border border-signal" />
          </span>
          {perfil.disponibilidade}
        </p>
        <p className="font-mono text-[11.5px] tracking-[0.02em] text-faint">
          {perfil.formacaoCurta}
          <span aria-hidden className="text-dim"> / </span>
          {perfil.idiomasResumo}
        </p>
      </div>

      <h1 className="varredura text-[clamp(2.9rem,8.4vw,7.4rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-balance [font-stretch:80%]">
        <span className="varredura-texto">{perfil.nome}</span>
      </h1>

      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <p className="surgir text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-balance [animation-delay:700ms] sm:text-[30px]">
            {perfil.posicionamentoRico.map(({ texto, enfase }) =>
              enfase ? (
                <span key={texto} className="font-serif text-[1.12em] font-normal tracking-[-0.01em] italic">
                  {texto}
                </span>
              ) : (
                <span key={texto}>{texto}</span>
              ),
            )}
            <span aria-hidden className="text-signal">.</span>
          </p>

          {lead && (
            <p className="surgir max-w-[56ch] text-[17px] leading-[1.65] text-pretty text-prose [animation-delay:820ms]">
              {lead}
            </p>
          )}

          {resto.length > 0 && (
            <details className="group surgir [animation-delay:900ms]">
              <summary className="transicao inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[12px] tracking-[0.02em] text-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="grid size-4 place-items-center rounded-[4px] border border-border-strong text-[11px] leading-none text-signal">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
                {t.lerMais}
              </summary>
              <div className="flex max-w-[56ch] flex-col gap-3 pt-3.5 text-[16.5px] leading-[1.65] text-pretty text-prose">
                {resto.map((linha) => (
                  <p key={linha}>{linha}</p>
                ))}
              </div>
            </details>
          )}

          <div className="surgir flex flex-wrap items-center gap-2.5 [animation-delay:980ms]">
            <a
              href={cvPrincipal?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transicao group inline-flex items-center gap-2 rounded-[8px] bg-foreground px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-background no-underline hover:bg-signal"
            >
              {t.curriculo}
              <span aria-hidden className="transicao font-mono text-[13px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href={`mailto:${perfil.links.email}`}
              className="transicao rounded-[8px] border border-border-strong px-5 py-3 text-[15px] font-medium tracking-[-0.005em] no-underline hover:border-foreground"
            >
              {t.email}
            </a>
            <CopiarEmail email={perfil.links.email} rotulo={t.copiarEmail} copiadoRotulo={t.copiado} />
            <nav aria-label={t.ariaNav} className="flex gap-2.5">
              {atalhos.map(({ rotulo, href, icone }) => (
                <a
                  key={rotulo}
                  href={href}
                  aria-label={rotulo}
                  title={rotulo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transicao grid size-[46px] place-items-center rounded-[8px] border border-border text-muted hover:border-border-strong hover:text-foreground"
                >
                  {icone}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="surgir lg:col-span-6 [animation-delay:500ms]">
          <SistemaVivo idioma={idioma} />
        </div>
      </div>
    </header>
  );
}
