import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projetos } from "@/content/projetos";

const rotuloArea = {
  dados: "Dados e IA",
  dev: "Dev",
} as const;

export function generateStaticParams() {
  return projetos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === slug);
  if (!projeto) return {};
  return {
    title: projeto.titulo,
    description: projeto.resumo,
  };
}

export default async function PaginaDeCase({
  params,
}: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === slug);
  if (!projeto) notFound();

  const secoes = [
    { titulo: "Problema", texto: projeto.case.problema },
    { titulo: "Abordagem", texto: projeto.case.abordagem },
    { titulo: "Decisões e trade-offs", texto: projeto.case.decisoes },
    { titulo: "Resultado", texto: projeto.case.resultado },
  ];

  const linksExternos = [
    { label: "Repositório", href: projeto.links.repo },
    { label: "Ver no ar", href: projeto.links.demo },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="accent-transition font-mono text-sm text-muted hover:text-accent"
      >
        ← voltar
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap gap-2 font-mono text-xs text-muted">
          {projeto.areas.map((area) => (
            <span key={area} className="rounded-full border border-border px-2 py-0.5">
              {rotuloArea[area]}
            </span>
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
            <span className="font-medium">Meu papel:</span>{" "}
            <span className="text-muted">{projeto.papel}</span>
          </p>
        )}
        <p className="mt-4 font-mono text-xs text-muted">
          {projeto.stack.join(" · ")}
        </p>
        {linksExternos.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {linksExternos.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-transition inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <article className="mt-12 space-y-10">
        {secoes.map(({ titulo, texto }) => (
          <section key={titulo} aria-label={titulo}>
            <h2 className="font-mono text-sm text-muted">{titulo.toLowerCase()}</h2>
            <p className="mt-3 leading-relaxed">{texto}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
