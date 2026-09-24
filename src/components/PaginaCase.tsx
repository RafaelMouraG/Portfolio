import Image from "next/image";
import Link from "next/link";
import type { Projeto } from "@/content/projetos";
import { caminhoDaHome, caminhoDoCase, conteudo, textos, type Idioma } from "@/lib/i18n";
import { numeroDoProjeto } from "@/lib/filtro";
import { Metrica } from "./Metrica";
import { SeletorIdioma } from "./SeletorIdioma";
import { Tela } from "./Tela";

/*
 * Miolo da página de case, compartilhado pelas rotas /projetos/[slug] (pt)
 * e /en/projects/[slug] (en). As páginas resolvem o projeto no idioma certo
 * e delegam a renderização para cá.
 *
 * Mesma linguagem da home: o cabeçalho e o diagrama vivo dentro de um painel,
 * e o texto longo em coluna de leitura, com o rótulo de cada parte numa
 * coluna estreita à esquerda a partir de sm.
 */
export function PaginaCase({ projeto, idioma }: { projeto: Projeto; idioma: Idioma }) {
  const t = textos[idioma].caso;

  // Próximo projeto na ordem do conteúdo, dando a volta no fim da lista
  const { projetos, perfil } = conteudo[idioma];
  const destaques = projetos.filter((p) => p.destaque);
  const indice = projetos.findIndex(({ slug }) => slug === projeto.slug);
  const proximo = projetos.length > 1 ? projetos[(indice + 1) % projetos.length] : null;
  const numero = numeroDoProjeto(Math.max(0, destaques.findIndex(({ slug }) => slug === projeto.slug)));
  const email = perfil.links.email;

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
    <main className="mx-auto grid w-full max-w-[920px] gap-4 pt-6 pb-10 sm:gap-6">
      <div className="flex items-center justify-between gap-3 px-2 py-2">
        <Link
          href={caminhoDaHome(idioma)}
          className="font-mono text-xs text-ink-2 transition-colors hover:text-ink"
        >
          {t.voltar}
        </Link>
        <SeletorIdioma
          idioma={idioma}
          destino={caminhoDoCase(idioma === "pt" ? "en" : "pt", projeto.slug)}
        />
      </div>

      <header className="grid gap-[18px] rounded-[22px] bg-panel p-3.5 sm:rounded-[28px] sm:p-5">
        <Tela projeto={projeto} numero={numero} idioma={idioma} />

        <div className="grid gap-x-6 gap-y-4 px-2 pb-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="grid gap-3">
            <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.02] font-light tracking-[-0.035em] text-balance">
              {projeto.titulo}
            </h1>
            <p className="max-w-[58ch] text-pretty text-ink-2">{projeto.resumo}</p>
          </div>
          <Metrica
            metrica={projeto.metrica}
            idioma={idioma}
            className="sm:justify-items-end sm:text-right"
          />
        </div>

        <div className="grid gap-4 border-t border-line px-2 pt-4 pb-2">
          {projeto.papel && (
            <p className="text-[15px] text-pretty text-ink-2">
              <span className="font-medium text-ink">{t.meuPapel}:</span> {projeto.papel}
            </p>
          )}
          <ul className="flex flex-wrap gap-2">
            {projeto.stack.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">
                {item}
              </li>
            ))}
          </ul>
          {linksExternos.length > 0 && (
            <ul className="flex flex-wrap gap-2.5">
              {linksExternos.map(({ label, href, primario }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block rounded-full px-[18px] py-2.5 text-sm transition-colors ${
                      primario
                        ? "bg-ink text-bg hover:opacity-85"
                        : "border border-line hover:border-ink-3"
                    }`}
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Capturas reais em galeria: retrato (celular) lado a lado com altura
          fixa, paisagem ocupando a largura toda */}
      {projeto.capturas && projeto.capturas.length > 0 && (
        <section aria-label={t.capturas} className="rounded-[22px] bg-panel p-3.5 sm:rounded-[28px] sm:p-5">
          <ul className="flex flex-wrap gap-4">
            {projeto.capturas.map(({ src, alt, largura, altura }) => (
              <li
                key={src}
                className={`overflow-hidden rounded-[14px] bg-bg ${altura > largura ? "" : "w-full"}`}
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

      <article className="grid gap-10 rounded-[22px] bg-panel p-6 sm:rounded-[28px] sm:p-10">
        {secoes.map(({ titulo, texto }, i) => (
          <section
            key={titulo}
            aria-labelledby={`case-secao-${i}`}
            className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8"
          >
            <h2 id={`case-secao-${i}`} className="font-mono text-xs text-ink-2 sm:pt-1.5">
              <span aria-hidden className="text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {titulo}
            </h2>
            <p className="max-w-[64ch] text-[17px] leading-[1.65] text-pretty sm:text-[18px]">
              {texto}
            </p>
          </section>
        ))}
      </article>

      {/* Quem leu o case até o fim é o leitor mais interessado: em vez de a
          página acabar em nada, ele ganha o próximo projeto e o e-mail. */}
      <footer className="grid gap-4">
        {proximo && (
          <Link
            href={caminhoDoCase(idioma, proximo.slug)}
            className="group flex items-end justify-between gap-5 rounded-[22px] bg-ink p-6 text-bg sm:rounded-[28px] sm:p-10"
          >
            <span className="grid gap-1.5">
              <span className="font-mono text-xs text-bg/70">{t.proximoProjeto}</span>
              <span className="font-display text-[clamp(26px,3vw,40px)] leading-[1.05] font-light tracking-[-0.035em]">
                {proximo.titulo}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-2xl transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        )}

        <p className="px-2 font-mono text-xs leading-[1.8] text-ink-2">
          {t.conversar}{" "}
          <a
            href={`mailto:${email}`}
            className="underline decoration-line underline-offset-[3px] transition-colors hover:text-ink hover:decoration-accent"
          >
            {email}
          </a>
          {" · "}
          <Link
            href={caminhoDaHome(idioma)}
            className="underline decoration-line underline-offset-[3px] transition-colors hover:text-ink hover:decoration-accent"
          >
            {t.todosProjetos}
          </Link>
        </p>
      </footer>
    </main>
  );
}
