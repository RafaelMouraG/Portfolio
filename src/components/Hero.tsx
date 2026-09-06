import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CopiarEmail } from "./CopiarEmail";
import { HoraLocal } from "./HoraLocal";
import { IconeGithub, IconeLinkedin } from "./Icones";
import { SeletorIdioma } from "./SeletorIdioma";
import { TerminalHero } from "./TerminalHero";

/*
 * Cabeçalho compacto: nome, posicionamento, chips de contexto (cidade + hora,
 * formação, idiomas), lead de 2-3 linhas, CTAs, terminal digitado e um
 * <details> com o resto da bio. O lead curto traz os botões para a primeira
 * dobra sem o hack de reordenação no mobile que a bio longa exigia.
 *
 * Atalhos em quadrados de 36px (size-9): 32px era pouco para touch e as
 * siglas ganham `title` para o hover mostrar o nome por extenso.
 *
 * Firula contida: grade milimetrada + holofote que segue o mouse atrás do
 * bloco (só com hover; some no touch), e o terminal como peça de impacto.
 */
export function Hero({ idioma, destinoIdioma }: { idioma: Idioma; destinoIdioma: string }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].hero;

  const cvPrincipal =
    perfil.curriculos.find(({ principal }) => principal) ?? perfil.curriculos[0];

  // Só destinos externos: o e-mail fica na linha de CTAs, onde abrir e copiar
  // são ações distintas, e não se repete aqui. Link com URL vazia no perfil
  // não aparece. GitHub e LinkedIn vestem o ícone da marca; o currículo segue
  // em texto — o quadrado leva aria-label por extenso de todo jeito, porque
  // sigla e ícone são visuais, não nomes acessíveis.
  const atalhos = [
    { sigla: "GH", icone: <IconeGithub className="size-4" />, rotulo: "GitHub", href: perfil.links.github },
    { sigla: "IN", icone: <IconeLinkedin className="size-4" />, rotulo: "LinkedIn", href: perfil.links.linkedin },
    { sigla: "CV", icone: null, rotulo: t.curriculo, href: cvPrincipal?.href },
  ].filter((atalho): atalho is typeof atalho & { href: string } => Boolean(atalho.href));

  const [lead, ...resto] = perfil.sobre;

  return (
    <header className="relative flex flex-col gap-[28px]">
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="surgir text-[38px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[44px]">
            {perfil.nome}
          </h1>
          <p className="surgir text-[17px] tracking-[-0.01em] text-muted [animation-delay:60ms] sm:text-[19px]">
            {/* Cada metade da tese na cor da sua área; a que o conteúdo marca
                como ênfase ganha a serifa em itálico, o gesto do design. */}
            {perfil.posicionamentoRico.map(({ texto, area, enfase }) =>
              area ? (
                <span
                  key={texto}
                  data-accent={area}
                  className={
                    enfase ? "font-serif text-accent italic" : "text-accent"
                  }
                >
                  {texto}
                </span>
              ) : (
                <span key={texto}>{texto}</span>
              ),
            )}
          </p>
          <p className="surgir font-mono text-[11.5px] leading-[1.7] text-faint [animation-delay:120ms]">
            {perfil.cidade}
            <HoraLocal locale={idioma === "pt" ? "pt-BR" : "en-GB"} />
            <span aria-hidden className="text-dim"> · </span>
            {perfil.formacaoCurta}
            <span aria-hidden className="text-dim"> · </span>
            {perfil.idiomasResumo}
          </p>
        </div>

        <nav aria-label={t.ariaNav} className="flex gap-1.5 pt-1.5">
          {atalhos.map(({ sigla, icone, rotulo, href }) => (
            <a
              key={sigla}
              href={href}
              aria-label={rotulo}
              title={rotulo}
              target="_blank"
              rel="noopener noreferrer"
              className="accent-transition grid size-9 place-items-center rounded-lg border border-border font-mono text-[10px] font-medium tracking-[0.04em] text-muted hover:border-border-strong hover:text-foreground"
            >
              {icone ?? sigla}
            </a>
          ))}
          <SeletorIdioma idioma={idioma} destino={destinoIdioma} />
        </nav>
      </div>

      {lead && (
        <p className="relative font-serif text-[19px] leading-[1.58] text-pretty text-prose sm:text-[20px]">
          {lead}
        </p>
      )}

      <div className="relative flex flex-wrap items-center gap-x-[18px] gap-y-4">
        <div className="flex items-center gap-2.5">
          <a
            href={cvPrincipal?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-transition rounded-[9px] bg-foreground px-[18px] py-[11px] text-[14.5px] font-medium tracking-[-0.005em] text-background hover:bg-white"
          >
            {t.curriculo}
          </a>
          <a
            href={`mailto:${perfil.links.email}`}
            className="accent-transition rounded-[9px] border border-border px-[18px] py-[11px] text-[14.5px] font-medium tracking-[-0.005em] hover:border-border-strong"
          >
            {t.email}
          </a>
          <CopiarEmail
            email={perfil.links.email}
            rotulo={t.copiarEmail}
            copiadoRotulo={t.copiado}
          />
        </div>

        <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.02em] text-muted">
          <span aria-hidden className="pulso-disponivel size-1.5 rounded-full bg-foreground" />
          {perfil.disponibilidade}
        </p>
      </div>

      {resto.length > 0 && (
        <details className="group relative">
          <summary className="accent-transition inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[12px] tracking-[0.02em] text-muted hover:border-border-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span>{t.lerMais}</span>
            <span aria-hidden className="text-[14px] leading-none group-open:hidden">
              +
            </span>
            <span aria-hidden className="hidden text-[14px] leading-none group-open:inline">
              −
            </span>
          </summary>
          <div className="flex flex-col gap-3.5 pt-3.5 font-serif text-[18px] leading-[1.58] text-pretty text-prose sm:text-[20px]">
            {resto.map((linha) => (
              <p key={linha}>{linha}</p>
            ))}
          </div>
        </details>
      )}

      <div className="relative">
        <TerminalHero idioma={idioma} />
      </div>
    </header>
  );
}
