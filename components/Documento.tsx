import type { ReactNode } from "react";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

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

/*
 * Documento compartilhado pelos dois layouts raiz — (pt) e (en) são route
 * groups com <html> próprio só para o lang mudar; todo o resto é igual.
 */
export function Documento({ lang, children }: { lang: "pt-BR" | "en"; children: ReactNode }) {
  return (
    <html
      lang={lang}
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
