import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CopiarEmail } from "./CopiarEmail";
import { HoraLocal } from "./HoraLocal";
import { IndiceLateral } from "./IndiceLateral";
import { SeletorIdioma } from "./SeletorIdioma";

/*
 * A coluna fixa da home. No desktop ocupa a altura da tela e fica parada
 * enquanto os projetos rolam ao lado: nome e hora no alto, a tese no meio,
 * filtro e índice logo abaixo, links no pé. No celular vira um cabeçalho
 * comum, sem índice.
 *
 * A tese é a única frase grande da página: a primeira metade em tinta cheia
 * e a continuação em cinza, no mesmo corpo e peso leve.
 */
export function PainelLateral({ idioma, destinoIdioma }: { idioma: Idioma; destinoIdioma: string }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].painel;
  const cvPrincipal =
    perfil.curriculos.find(({ principal }) => principal) ?? perfil.curriculos[0];

  const links = [
    { rotulo: "GitHub", href: perfil.links.github },
    { rotulo: "LinkedIn", href: perfil.links.linkedin },
    { rotulo: t.curriculo, href: cvPrincipal?.href },
  ].filter((link): link is { rotulo: string; href: string } => Boolean(link.href));

  return (
    <aside className="flex flex-col justify-between gap-8 pt-7 pb-2 lg:sticky lg:top-0 lg:h-dvh lg:py-9">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-base font-semibold tracking-[-0.01em]">{perfil.nome}</span>
        <span className="font-mono text-xs whitespace-nowrap text-ink-2">
          {t.cidadeCurta}
          <HoraLocal locale={idioma === "pt" ? "pt-BR" : "en-GB"} />
        </span>
      </div>

      <div>
        <h1 className="font-display text-[clamp(34px,3.4vw,50px)] leading-[1.04] font-light tracking-[-0.035em] text-balance">
          {perfil.tese.forte} <span className="text-ink-3">{perfil.tese.suave}</span>
        </h1>
        <p className="mt-5 flex items-start gap-2.5 text-[15px] text-ink-2">
          <span aria-hidden className="pulso mt-[7px] size-[7px] shrink-0 rounded-full bg-accent" />
          {perfil.disponibilidade}
        </p>
      </div>

      <IndiceLateral idioma={idioma} />

      <nav
        aria-label={t.ariaLinks}
        className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-sm text-ink-2"
      >
        {links.map(({ rotulo, href }) => (
          <a
            key={rotulo}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            {rotulo}
          </a>
        ))}
        <CopiarEmail
          email={perfil.links.email}
          rotulo={t.copiarEmail}
          copiadoRotulo={t.copiado}
          className="cursor-pointer transition-colors hover:text-ink"
        />
        <span className="lg:ml-auto">
          <SeletorIdioma idioma={idioma} destino={destinoIdioma} />
        </span>
      </nav>
    </aside>
  );
}
