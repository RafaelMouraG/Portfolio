import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projetos } from "@/content/projetos";
import { PaginaCase } from "@/components/PaginaCase";

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
    alternates: {
      canonical: `/projetos/${slug}`,
      languages: { "pt-BR": `/projetos/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

export default async function PaginaDeCase({
  params,
}: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === slug);
  if (!projeto) notFound();
  return <PaginaCase projeto={projeto} idioma="pt" />;
}
