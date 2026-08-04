import Image from "next/image";
import Link from "next/link";
import type { Projeto } from "@/content/projetos";
import { caminhoDaHome, caminhoDoCase, textos, type Idioma } from "@/lib/i18n";
import { AreaFundo } from "./AreaFundo";
import { AreaTag } from "./AreaTag";
import { CapaProjeto } from "./CapaProjeto";
import { SeletorIdioma } from "./SeletorIdioma";

/*
 * Miolo da página de case, compartilhado pelas rotas /projetos/[slug] (pt)
 * e /en/projects/[slug] (en). As páginas resolvem o projeto no idioma certo
 * e delegam a renderização para cá.
 */
export function PaginaCase({ projeto, idioma }: { projeto: Projeto; idioma: Idioma }) {
  const t = textos[idioma].caso;
  const tProjetos = textos[idioma].projetos;

  const secoes = [
    { titulo: t.secoes.problema, texto: projeto.case.problema },
    { titulo: t.secoes.abordagem, texto: projeto.case.abordagem },
    { titulo: t.secoes.decisoes, texto: projeto.case.decisoes },
    { titulo: t.secoes.resultado, texto: projeto.case.resultado },
  ];

  const linksExternos = [
    { label: t.verNoAr, href: projeto.links.demo, primario: true },
    // Sem demo no ar, o vídeo assume o posto de link principal
    { label: t.demoEmVideo, href: projeto.links.video, primario: !projeto.links.demo },
    { label: t.repositorio, href: projeto.links.repo, primario: false },
  ].filter((link): link is { label: string; href: string; primario: boolean } =>
    Boolean(link.href),
  );

  return (
    // A página inteira veste a cor da área do projeto: amarelo em case de
    // dados, verde em case de dev. É a continuação do card que trouxe até aqui.
    <main
      data-accent={projeto.areas[0]}
      className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20"
    >
      {/* O fundo também veste a cor da área do case */}
      <AreaFundo area={projeto.areas[0]} />
      <div className="flex items-center justify-between gap-3">
        <Link
          href={caminhoDaHome(idioma)}
          className="accent-transition font-mono text-sm text-muted hover:text-accent"
        >
          {t.voltar}
        </Link>
        <SeletorIdioma
          idioma={idioma}
          destino={caminhoDoCase(idioma === "pt" ? "en" : "pt", projeto.slug)}
        />
      </div>

      <header className="mt-10">
        <div className="flex flex-wrap gap-2">
          {projeto.areas.map((area) => (
            <AreaTag key={area} area={area} idioma={idioma} />
          ))}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {projeto.titulo}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {projeto.resumo}
        </p>
        {projeto.papel && (
          <p className="mt-4 text-sm leading-relaxed">
            <span className="font-medium">{tProjetos.meuPapel}</span>{" "}
            <span className="text-muted">{projeto.papel}</span>
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {projeto.stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        {linksExternos.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {linksExternos.map(({ label, href, primario }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primario
                      ? "accent-transition inline-flex items-center rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-background hover:bg-accent/85"
                      : "accent-transition inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-accent/[0.04]">
        <CapaProjeto projeto={projeto} />
      </div>

      {/* Capturas reais em galeria: retrato (celular) lado a lado com altura
          fixa, paisagem ocupando a largura toda */}
      {projeto.capturas && projeto.capturas.length > 0 && (
        <section aria-label={t.capturas} className="mt-6">
          <ul className="flex flex-wrap gap-4">
            {projeto.capturas.map(({ src, alt, largura, altura }) => (
              <li
                key={src}
                className={
                  altura > largura
                    ? "overflow-hidden rounded-xl border border-border bg-surface"
                    : "w-full overflow-hidden rounded-xl border border-border bg-surface"
                }
              >
                <Image
                  src={src}
                  alt={alt}
                  width={largura}
                  height={altura}
                  className={altura > largura ? "h-96 w-auto" : "h-auto w-full"}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <article className="mt-12 space-y-10">
        {secoes.map(({ titulo, texto }, indice) => (
          <section key={titulo} aria-label={titulo}>
            <h2 className="flex items-center gap-3 font-mono text-sm text-muted">
              <span aria-hidden className="font-semibold text-accent">
                {String(indice + 1).padStart(2, "0")}
              </span>
              {titulo.toLowerCase()}
              <span
                aria-hidden
                className="h-px min-w-8 grow bg-gradient-to-r from-border to-transparent"
              />
            </h2>
            <p className="mt-3 leading-relaxed">{texto}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
