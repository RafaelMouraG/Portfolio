import type { MetadataRoute } from "next";
import { projetos } from "@/content/projetos";
import { SITE_URL } from "@/lib/site";

// Cada URL declara a contraparte no outro idioma (hreflang no sitemap).
function idiomas(caminhoPt: string, caminhoEn: string) {
  return {
    languages: {
      "pt-BR": `${SITE_URL}${caminhoPt}`,
      en: `${SITE_URL}${caminhoEn}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1, alternates: idiomas("", "/en") },
    { url: `${SITE_URL}/en`, priority: 1, alternates: idiomas("", "/en") },
    ...projetos.flatMap(({ slug }) => [
      {
        url: `${SITE_URL}/projetos/${slug}`,
        priority: 0.8,
        alternates: idiomas(`/projetos/${slug}`, `/en/projects/${slug}`),
      },
      {
        url: `${SITE_URL}/en/projects/${slug}`,
        priority: 0.8,
        alternates: idiomas(`/projetos/${slug}`, `/en/projects/${slug}`),
      },
    ]),
  ];
}
