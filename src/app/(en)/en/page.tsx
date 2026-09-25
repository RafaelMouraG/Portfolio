import type { Metadata } from "next";
import { BarraTopo } from "@/components/BarraTopo";
import { Contato } from "@/components/Contato";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Regua } from "@/components/Regua";
import { Revelar } from "@/components/Revelar";
import { StackSection } from "@/components/StackSection";
import { Trajetoria } from "@/components/Trajetoria";

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
    <>
      <BarraTopo idioma="en" destinoIdioma={`/${filtro}`} navegacao />
      <Regua />
      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-32 px-5 pb-8 sm:px-8">
        <Hero idioma="en" />
        <ProjectsSection idioma="en" />
        <Revelar>
          <StackSection idioma="en" />
        </Revelar>
        <Revelar>
          <Trajetoria idioma="en" />
        </Revelar>
        <Contato idioma="en" />
      </main>
    </>
  );
}
