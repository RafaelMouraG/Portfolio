import type { ReactNode } from "react";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { perfil } from "@/content/perfil";
import { EasterEgg } from "./EasterEgg";

/*
 * As três vozes do design: Funnel Display nos títulos e números grandes (quase
 * sempre em peso leve), Funnel Sans no texto e na interface, e Geist Mono nas
 * etiquetas, legendas e rótulos dos diagramas.
 */
const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/*
 * Documento compartilhado pelos dois layouts raiz: (pt) e (en) são route
 * groups com <html> próprio só para o lang mudar; todo o resto é igual.
 */
export function Documento({ lang, children }: { lang: "pt-BR" | "en"; children: ReactNode }) {
  return (
    <html
      lang={lang}
      className={`${funnelDisplay.variable} ${funnelSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full px-4 sm:px-6 lg:px-10">
        <EasterEgg email={perfil.links.email} />
        {children}
      </body>
    </html>
  );
}
