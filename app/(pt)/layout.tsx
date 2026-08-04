import type { Metadata } from "next";
import { perfil } from "@/content/perfil";
import { SITE_URL } from "@/lib/site";
import { Documento } from "@/components/Documento";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${perfil.nome} — Dados, IA e Desenvolvimento`,
    template: `%s — ${perfil.nome}`,
  },
  description: perfil.posicionamento,
  openGraph: {
    siteName: perfil.nome,
    locale: "pt_BR",
    type: "website",
  },
};

export default function LayoutPt({ children }: LayoutProps<"/">) {
  return <Documento lang="pt-BR">{children}</Documento>;
}
