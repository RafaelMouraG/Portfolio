import Image from "next/image";
import Link from "next/link";
import type { Projeto } from "@/content/projetos";
import { caminhoDaHome, caminhoDoCase, conteudo, textos, type Idioma } from "@/lib/i18n";
import { AreaTag } from "./AreaTag";
import { CapaProjeto } from "./CapaProjeto";
import { SectionTitle } from "./SectionTitle";
import { SeletorIdioma } from "./SeletorIdioma";

/*
 * Miolo da página de case, compartilhado pelas rotas /projetos/[slug] (pt)
 * e /en/projects/[slug] (en). As páginas resolvem o projeto no idioma certo
 * e delegam a renderização para cá.
 *
 * Segue a mesma métrica da home (coluna de 720px, blocos numerados) e usa a
 * serifa do design para o texto longo — é o trecho mais parecido com leitura
 * corrida do site inteiro, que é exatamente para o que o Newsreader entra.
 */
export function PaginaCase({ projeto, idioma }: { projeto: Projeto; idioma: Idioma }) {
  const t = textos[idioma].caso;
  const tProjetos = textos[idioma].projetos;

  // Próximo projeto na ordem do conteúdo, dando a volta no fim da lista
  const { projetos, perfil } = conteudo[idioma];
  const indice = projetos.findIndex(({ slug }) => slug === projeto.slug);
  const proximo = projetos.length > 1 ? projetos[(indice + 1) % projetos.length] : null;
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
    // data-accent marca a área do case; hoje não muda nada visualmente (a
    // paleta é neutra), mas é o gancho para o dia em que a cor por área voltar.
    <main
      data-accent={projeto.areas[0]}
      className="mx-auto flex w-full max-w-[720px] flex-col gap-[52px] px-7 pt-16 pb-24"
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          href={caminhoDaHome(idioma)}
          className="accent-transition font-mono text-[11.5px] tracking-[0.04em] text-muted no-underline hover:text-gold"
        >
          {t.voltar}
        </Link>
        <SeletorIdioma
          idioma={idioma}
          destino={caminhoDoCase(idioma === "pt" ? "en" : "pt", projeto.slug)}
        />
      </div>

      <header className="flex flex-col gap-[18px]">
        <div className="flex flex-wrap gap-3">
          {projeto.areas.map((area) => (
            <AreaTag key={area} area={area} idioma={idioma} />
          ))}
        </div>

        <h1 className="text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-[40px]">
          {projeto.titulo}
        </h1>

        <p className="font-serif text-[18px] leading-[1.58] text-pretty text-prose sm:text-[20px]">
          {projeto.resumo}
        </p>

        {projeto.papel && (
          <p className="text-[13.5px] leading-[1.5] text-faint">
            <span className="text-muted">{tProjetos.meuPapel}</span> {projeto.papel}
          </p>
        )}

        <p className="font-mono text-[11.5px] leading-[1.7] text-fainter">
          {projeto.stack.map((item, i) => (
            <span key={item}>
              {i > 0 && <span aria-hidden className="text-dim"> · </span>}
              {item}
            </span>
          ))}
        </p>

        {linksExternos.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-2.5">
            {linksExternos.map(({ label, href, primario }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primario
                      ? "accent-transition inline-block rounded-[9px] bg-foreground px-[18px] py-[11px] text-[14.5px] font-medium tracking-[-0.005em] text-background no-underline hover:bg-white"
                      : "accent-transition inline-block rounded-[9px] border border-border px-[18px] py-[11px] text-[14.5px] font-medium tracking-[-0.005em] no-underline hover:border-border-strong"
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* Screenshot real fica em 16:9; a arte SVG, que é um desenho de linha
          fina, ganha uma moldura mais baixa para não sobrar vazio em volta. */}
      <div
        className={`hachura relative grid place-items-center overflow-hidden rounded-xl border border-border bg-surface ${
          projeto.imagem ? "aspect-[16/9]" : "aspect-[2/1]"
        }`}
      >
        <CapaProjeto projeto={projeto} />
      </div>

      {/* Capturas reais em galeria: retrato (celular) lado a lado com altura
          fixa, paisagem ocupando a largura toda */}
      {projeto.capturas && projeto.capturas.length > 0 && (
        <section aria-label={t.capturas}>
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

      <article className="flex flex-col gap-[42px]">
        {secoes.map(({ titulo, texto }, indice) => (
          <section
            key={titulo}
            aria-labelledby={`case-secao-${indice}`}
            className="flex flex-col gap-[18px]"
          >
            <SectionTitle
              id={`case-secao-${indice}`}
              numero={String(indice + 1).padStart(2, "0")}
            >
              {titulo}
            </SectionTitle>
            <p className="font-serif text-[18px] leading-[1.62] text-pretty text-prose sm:text-[19px]">
              {texto}
            </p>
          </section>
        ))}
      </article>

      {/* Quem leu o case até o fim é o leitor mais interessado: em vez de a
          página acabar em nada, ele ganha o próximo projeto e o e-mail. */}
      <footer className="flex flex-col gap-5 border-t border-border-soft pt-[26px]">
        {proximo && (
          <Link
            href={caminhoDoCase(idioma, proximo.slug)}
            className="group flex items-baseline justify-between gap-5 no-underline"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">
                {t.proximoProjeto}
              </span>
              <span className="text-[17px] font-medium tracking-[-0.01em] text-foreground">
                {proximo.titulo}
              </span>
            </span>
            <span
              aria-hidden
              className="accent-transition shrink-0 font-mono text-[13px] text-fainter group-hover:text-gold"
            >
              →
            </span>
          </Link>
        )}

        <p className="font-mono text-[11.5px] leading-[1.8] text-faint">
          {t.conversar}{" "}
          <a
            href={`mailto:${email}`}
            className="underline decoration-border-strong hover:text-gold hover:decoration-gold"
          >
            {email}
          </a>
          <span aria-hidden className="text-dim"> · </span>
          <Link
            href={caminhoDaHome(idioma)}
            className="underline decoration-border-strong hover:text-gold hover:decoration-gold"
          >
            {t.todosProjetos}
          </Link>
        </p>
      </footer>
    </main>
  );
}
