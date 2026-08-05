import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { Contato } from "@/components/Contato";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en" },
  },
};

/*
 * A página lê searchParams no servidor (renderização dinâmica) para que um
 * link direto como /?area=dev chegue com a grade já filtrada no HTML,
 * sem flash de conteúdo não filtrado na hidratação. O filtro ativo também
 * entra no destino do seletor de idioma, para a troca preservá-lo.
 *
 * A seção Experiência foi cortada de propósito: sem experiência formal
 * relevante, os projetos ocupam o espaço (regra do briefing).
 */
export default async function Home({ searchParams }: PageProps<"/">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <Hero idioma="pt" destinoIdioma={`/en${filtro}`} />
      <Sobre idioma="pt" />
      <ProjectsSection idioma="pt" />
      <StackSection idioma="pt" />
      <Contato idioma="pt" />
    </main>
  );
}
