import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { perfil } from "@/content/perfil";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Brilhos do topo: cada área tem o seu para poder reagir ao filtro */}
        <div aria-hidden className="brilho-area brilho-area--dados" />
        <div aria-hidden className="brilho-area brilho-area--dev" />
        {children}
      </body>
    </html>
  );
}
