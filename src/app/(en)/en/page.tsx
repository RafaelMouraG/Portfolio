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
    <main className="mx-auto flex w-full max-w-[720px] flex-col gap-[76px] px-7 pt-16 pb-24 sm:pt-[88px] sm:pb-[100px]">
      <Hero idioma="en" destinoIdioma={`/${filtro}`} />
      <div className="-my-8">
        <Esteira itens={conteudo.en.perfil.techsPrincipais} />
      </div>
      <Revelar>
        <ProjectsSection idioma="en" />
      </Revelar>
      <Revelar>
        <Experiencia idioma="en" />
      </Revelar>
      <Revelar>
        <Reconhecimentos idioma="en" />
      </Revelar>
      <Revelar>
        <StackSection idioma="en" />
      </Revelar>
      <Revelar>
        <OutrosProjetos idioma="en" />
      </Revelar>
      <Revelar>
        <Contato idioma="en" />
      </Revelar>
    </main>
  );
}
