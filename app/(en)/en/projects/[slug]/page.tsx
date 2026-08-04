import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projetosEn } from "@/content/projetos.en";
import { PaginaCase } from "@/components/PaginaCase";

export function generateStaticParams() {
  return projetosEn.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/en/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = projetosEn.find((p) => p.slug === slug);
  if (!projeto) return {};
  return {
    title: projeto.titulo,
    description: projeto.resumo,
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: { "pt-BR": `/projetos/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

export default async function CasePageEn({
  params,
}: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  const projeto = projetosEn.find((p) => p.slug === slug);
  if (!projeto) notFound();
  return <PaginaCase projeto={projeto} idioma="en" />;
}
