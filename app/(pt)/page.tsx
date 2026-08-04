import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { Contato } from "@/components/Contato";

/*
 * A página lê searchParams no servidor (renderização dinâmica) para que um
 * link direto como /?area=dev chegue com a grade já filtrada no HTML,
 * sem flash de conteúdo não filtrado na hidratação.
 *
 * A seção Experiência foi cortada de propósito: sem experiência formal
 * relevante, os projetos ocupam o espaço (regra do briefing).
 */
export default async function Home({ searchParams }: PageProps<"/">) {
  await searchParams;
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <Hero />
      <Sobre />
      <ProjectsSection />
      <StackSection />
      <Contato />
    </main>
  );
}
