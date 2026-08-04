import { notFound } from "next/navigation";
import { projetos } from "@/content/projetos";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case de projeto";

export function generateStaticParams() {
  return projetos.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === slug);
  if (!projeto) notFound();
  return ogImage(projeto.titulo, projeto.resumo);
}
