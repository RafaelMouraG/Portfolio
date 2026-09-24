import type { Metadata } from "next";
import { Home } from "@/components/Home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en" },
  },
};

/*
 * A página lê searchParams no servidor (renderização dinâmica) para que um
 * link direto como /?area=dev chegue com a lista já filtrada no HTML, sem
 * flash na hidratação. O filtro ativo também entra no destino do seletor de
 * idioma, para a troca preservá-lo.
 */
export default async function HomePt({ searchParams }: PageProps<"/">) {
  const { area } = await searchParams;
  const filtro = area === "dados" || area === "dev" ? `?area=${area}` : "";
  return <Home idioma="pt" destinoIdioma={`/en${filtro}`} />;
}
