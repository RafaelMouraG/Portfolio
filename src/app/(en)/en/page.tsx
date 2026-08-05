import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { Contato } from "@/components/Contato";

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: { "pt-BR": "/", en: "/en" },
  },
};

// Espelho em inglês da home pt — mesma razão para ler searchParams no
// servidor: /en?area=dev chega com a grade já filtrada no HTML.
export default async function HomeEn({ searchParams }: PageProps<"/en">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <Hero idioma="en" destinoIdioma={`/${filtro}`} />
      <Sobre idioma="en" />
      <ProjectsSection idioma="en" />
      <StackSection idioma="en" />
      <Contato idioma="en" />
    </main>
  );
}
