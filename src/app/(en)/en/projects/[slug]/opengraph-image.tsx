import { notFound } from "next/navigation";
import { projetosEn } from "@/content/projetos.en";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project case study";

export function generateStaticParams() {
  return projetosEn.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = projetosEn.find((p) => p.slug === slug);
  if (!projeto) notFound();
  return ogImage(projeto.titulo, projeto.resumo);
}
