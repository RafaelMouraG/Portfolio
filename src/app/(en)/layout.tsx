import type { Metadata } from "next";
import { perfilEn } from "@/content/perfil.en";
import { SITE_URL } from "@/lib/site";
import { Documento } from "@/components/Documento";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${perfilEn.nome} — Data, AI & Software Development`,
    template: `%s — ${perfilEn.nome}`,
  },
  description: perfilEn.posicionamento,
  openGraph: {
    siteName: perfilEn.nome,
    locale: "en_US",
    type: "website",
  },
};

export default function LayoutEn({ children }: LayoutProps<"/">) {
  return <Documento lang="en">{children}</Documento>;
}
