import type { Metadata } from "next";
import { Home } from "@/components/Home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: { "pt-BR": "/", en: "/en" },
  },
};

// Espelho em inglês da home pt, com a mesma razão para ler searchParams no
// servidor: /en?area=dev chega com a lista já filtrada no HTML.
export default async function HomeEn({ searchParams }: PageProps<"/en">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return <Home idioma="en" destinoIdioma={`/${filtro}`} />;
}
