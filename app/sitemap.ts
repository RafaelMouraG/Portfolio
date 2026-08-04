import type { MetadataRoute } from "next";
import { projetos } from "@/content/projetos";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...projetos.map((projeto) => ({
      url: `${SITE_URL}/projetos/${projeto.slug}`,
      priority: 0.8,
    })),
  ];
}
