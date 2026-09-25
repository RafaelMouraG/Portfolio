import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Projeto } from "@/content/projetos";
import { caminhoDaHome, caminhoDoCase, conteudo, textos, type Idioma } from "@/lib/i18n";
import { BarraTopo } from "./BarraTopo";
import { FiguraDoProjeto } from "./figuras";
import { IndiceCase } from "./IndiceCase";
import { Leituras } from "./Leituras";
import { Medidas } from "./Medidas";
import { Regua } from "./Regua";

/*
 * Página de case, compartilhada por /projetos/[slug] e /en/projects/[slug].
 *
 * Ordem: título e ficha técnica; a figura grande (a mesma do card, que cresce
 * até aqui na troca de página) com a legenda que explica o que se move; as
 * leituras e a comparação de/para quando o projeto tem números; o texto em
 * quatro seções com índice lateral; capturas; e o próximo projeto.
 */
export function PaginaCase({ projeto, idioma }: { projeto: Projeto; idioma: Idioma }) {
  const t = textos[idioma].caso;
  const tFig = textos[idioma].figura;
  const { projetos, perfil } = conteudo[idioma];
  const destaques = projetos.filter((p) => p.destaque);
  const numero = destaques.findIndex(({ slug }) => slug === projeto.slug) + 1;
  const indice = projetos.findIndex(({ slug }) => slug === projeto.slug);
  const proximo = projetos.length > 1 ? projetos[(indice + 1) % projetos.length] : null;
  const numeroProximo = proximo ? destaques.findIndex(({ slug }) => slug === proximo.slug) + 1 : 0;
  const email = perfil.links.email;

  const secoes = [
    { id: "problema", rotulo: t.secoes.problema, texto: projeto.case.problema },
    { id: "abordagem", rotulo: t.secoes.abordagem, texto: projeto.case.abordagem },
    { id: "decisoes", rotulo: t.secoes.decisoes, texto: projeto.case.decisoes },
    { id: "resultado", rotulo: t.secoes.resultado, texto: projeto.case.resultado },
  ];

  const linksExternos = [
    { label: t.verNoAr, href: projeto.links.demo, primario: true },
    // Sem demo no ar, o vídeo assume o posto de link principal
    { label: t.demoEmVideo, href: projeto.links.video, primario: !projeto.links.demo },
    { label: t.repositorio, href: projeto.links.repo, primario: !projeto.links.demo && !projeto.links.video },
  ].filter((link): link is { label: string; href: string; primario: boolean } => Boolean(link.href));

  return (
    <>
      <BarraTopo
        idioma={idioma}
        destinoIdioma={caminhoDoCase(idioma === "pt" ? "en" : "pt", projeto.slug)}
      />
      <Regua />

      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-16 px-5 pt-8 pb-24 sm:px-8">
        <div className="flex items-center justify-between gap-4 font-mono text-[11.5px] tracking-[0.04em]">
          <Link
            href={caminhoDaHome(idioma)}
            className="transicao text-muted no-underline hover:text-signal"
          >
            {t.voltar}
          </Link>
          <span className="text-faint">
            {tFig.fig} {String(numero).padStart(2, "0")} / {String(destaques.length).padStart(2, "0")}
          </span>
        </div>

        <header className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="flex flex-wrap gap-1.5 font-mono text-[10.5px] tracking-[0.04em] uppercase">
              {projeto.estado && (
                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-signal/50 px-1.5 py-0.5 text-signal">
                  <span aria-hidden className="pulso size-1 rounded-full bg-signal" />
                  {projeto.estado}
                </span>
              )}
              {projeto.areas.map((area) => (
                <span key={area} className="rounded-[4px] border border-border px-1.5 py-0.5 text-faint">
                  {textos[idioma].areas[area]}
                </span>
              ))}
            </p>
            <h1 className="surgir text-[clamp(2.6rem,7vw,5.8rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance [font-stretch:82%]">
              {projeto.titulo}
            </h1>
            <p className="surgir max-w-[46ch] text-[20px] leading-[1.5] text-pretty text-prose [animation-delay:120ms] sm:text-[22px]">
              {projeto.resumo}
            </p>
          </div>

          <dl className="surgir flex flex-col gap-5 self-end border-t border-border-strong pt-5 [animation-delay:200ms] lg:col-span-4">
            {projeto.papel && (
              <div className="flex flex-col gap-1.5">
                <dt className="font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">{t.papel}</dt>
                <dd className="text-[14.5px] leading-[1.55] text-prose">{projeto.papel}</dd>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">{t.stack}</dt>
              <dd className="font-mono text-[12px] leading-[1.7] text-muted">{projeto.stack.join(" · ")}</dd>
            </div>
            {linksExternos.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <dt className="font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">{t.links}</dt>
                <dd className="flex flex-wrap gap-2">
                  {linksExternos.map(({ label, href, primario }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        primario
                          ? "transicao inline-flex items-center gap-1.5 rounded-[8px] bg-foreground px-4 py-2.5 text-[14px] font-medium text-background no-underline hover:bg-signal"
                          : "transicao inline-flex items-center gap-1.5 rounded-[8px] border border-border-strong px-4 py-2.5 text-[14px] font-medium no-underline hover:border-foreground"
                      }
                    >
                      {label}
                      <span aria-hidden className="font-mono text-[12px]">↗</span>
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>

        <section className="grid gap-5 lg:grid-cols-12 lg:gap-10">
          <ViewTransition name={`figura-${projeto.slug}`} share="morph" default="none">
            <div className="lg:col-span-9">
              <FiguraDoProjeto projeto={projeto} numero={numero} idioma={idioma} />
            </div>
          </ViewTransition>
          <p className="flex max-w-[70ch] flex-col gap-2 self-end text-[15px] leading-[1.6] text-pretty text-muted lg:col-span-3 lg:pb-14">
            <span className="font-mono text-[11px] tracking-[0.06em] text-signal uppercase">
              ↳ {tFig.fig} {String(numero).padStart(2, "0")}
            </span>
            {projeto.figura.legenda}
          </p>
        </section>

        {projeto.numeros && projeto.numeros.length > 0 && (
          <Leituras itens={projeto.numeros} idioma={idioma} titulo={t.emNumeros} />
        )}

        {projeto.medidas && <Medidas medidas={projeto.medidas} idioma={idioma} />}

        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <IndiceCase titulo={t.indice} secoes={secoes.map(({ id, rotulo }) => ({ id, rotulo }))} />
            </div>
          </aside>

          <article className="flex flex-col gap-14 lg:col-span-8 lg:col-start-5">
            {secoes.map(({ id, rotulo, texto }, i) => (
              <section key={id} id={id} data-regua={`${String(i + 1).padStart(2, "0")} ${rotulo}`} aria-labelledby={`${id}-titulo`} className="flex scroll-mt-24 flex-col gap-4">
                <h2 id={`${id}-titulo`} className="flex items-baseline gap-3 text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] [font-stretch:88%]">
                  <span aria-hidden className="font-leitura text-[26px] font-bold text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {rotulo}
                </h2>
                <p className="max-w-[66ch] text-[17.5px] leading-[1.72] text-pretty text-prose">{texto}</p>
              </section>
            ))}
          </article>
        </div>

        {projeto.capturas && projeto.capturas.length > 0 && (
          <section aria-label={t.capturas} className="flex flex-col gap-5">
            <p className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">{t.capturas}</p>
            <ul className="flex flex-wrap gap-4">
              {projeto.capturas.map(({ src, alt, largura, altura }) => (
                <li
                  key={src}
                  className={
                    altura > largura
                      ? "overflow-hidden rounded-[12px] border border-border bg-surface"
                      : "w-full overflow-hidden rounded-[12px] border border-border bg-surface"
                  }
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={largura}
                    height={altura}
                    className={altura > largura ? "h-[420px] w-auto" : "h-auto w-full"}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="flex flex-col gap-8 border-t border-border-soft pt-10">
          {proximo && (
            <Link
              href={caminhoDoCase(idioma, proximo.slug)}
              className="group grid items-center gap-6 no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,420px)]"
            >
              <span className="flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">{t.proximoProjeto}</span>
                <span className="transicao text-[clamp(2rem,4.6vw,3.4rem)] leading-[1] font-semibold tracking-[-0.04em] [font-stretch:85%] group-hover:text-signal">
                  {proximo.titulo}
                  <span aria-hidden className="ml-3 inline-block font-mono text-[0.6em] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
                <span className="max-w-[48ch] text-[15px] leading-[1.55] text-muted">{proximo.resumo}</span>
              </span>
              <div className="pointer-events-none hidden md:block">
                <FiguraDoProjeto projeto={proximo} numero={numeroProximo} idioma={idioma} compacta controles={false} />
              </div>
            </Link>
          )}

          <p className="font-mono text-[12px] leading-[1.8] text-faint">
            {t.conversar}{" "}
            <a href={`mailto:${email}`} className="text-muted underline decoration-border-strong hover:text-signal hover:decoration-signal">
              {email}
            </a>
            <span aria-hidden className="text-dim"> · </span>
            <Link href={caminhoDaHome(idioma)} className="text-muted underline decoration-border-strong hover:text-signal hover:decoration-signal">
              {t.todosProjetos}
            </Link>
          </p>
        </footer>
      </main>
    </>
  );
}
