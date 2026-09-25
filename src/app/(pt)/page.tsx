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
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en" },
  },
};

/*
 * A página lê searchParams no servidor (renderização dinâmica) para que um
 * link direto como /?area=dev chegue com a grade já filtrada no HTML, sem
 * flash na hidratação. O filtro ativo também entra no destino do seletor de
 * idioma, para a troca preservá-lo.
 *
 * Quatro seções numeradas depois do Hero; a régua da esquerda e as âncoras
 * do topo leem os mesmos ids.
 */
export default async function Home({ searchParams }: PageProps<"/">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return (
    <>
      <BarraTopo idioma="pt" destinoIdioma={`/en${filtro}`} navegacao />
      <Regua />
      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-32 px-5 pb-8 sm:px-8">
        <Hero idioma="pt" />
        <ProjectsSection idioma="pt" />
        <Revelar>
          <StackSection idioma="pt" />
        </Revelar>
        <Revelar>
          <Trajetoria idioma="pt" />
        </Revelar>
        <Contato idioma="pt" />
      </main>
    </>
  );
}
