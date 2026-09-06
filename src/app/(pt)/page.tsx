import type { Metadata } from "next";
import { conteudo } from "@/lib/i18n";
import { Hero } from "@/components/Hero";
import { Esteira } from "@/components/Esteira";
import { Experiencia } from "@/components/Experiencia";
import { Reconhecimentos } from "@/components/Reconhecimentos";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { OutrosProjetos } from "@/components/OutrosProjetos";
import { Contato } from "@/components/Contato";
import { Revelar } from "@/components/Revelar";

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
 * A coluna de 720px e o intervalo de 76px entre blocos vêm do design. A
 * esteira é a exceção: as margens negativas a puxam para perto do cabeçalho,
 * como no design, onde ela funciona como régua entre a apresentação e o resto.
 *
 * Cada bloco abaixo da dobra entra com Revelar (fade + subida, uma vez só).
 */
export default async function Home({ searchParams }: PageProps<"/">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-col gap-[76px] px-7 pt-16 pb-24 sm:pt-[88px] sm:pb-[100px]">
      <Hero idioma="pt" destinoIdioma={`/en${filtro}`} />
      <div className="-my-8">
        <Esteira itens={conteudo.pt.perfil.techsPrincipais} />
      </div>
      <Revelar>
        <ProjectsSection idioma="pt" />
      </Revelar>
      <Revelar>
        <Experiencia idioma="pt" />
      </Revelar>
      <Revelar>
        <Reconhecimentos idioma="pt" />
      </Revelar>
      <Revelar>
        <StackSection idioma="pt" />
      </Revelar>
      <Revelar>
        <OutrosProjetos idioma="pt" />
      </Revelar>
      <Revelar>
        <Contato idioma="pt" />
      </Revelar>
    </main>
  );
}
