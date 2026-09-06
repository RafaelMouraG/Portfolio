import type { ReactNode } from "react";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { perfil } from "@/content/perfil";
import { BarraProgresso } from "./BarraProgresso";
import { Topografia } from "./Topografia";
import { EasterEgg } from "./EasterEgg";

/*
 * As três vozes do design: Space Grotesk carrega a interface e os títulos,
 * Newsreader entra em itálico para a prosa (bio, texto dos cases, frase de
 * fechamento) e JetBrains Mono marca tudo que é etiqueta, número ou metadado.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/*
 * Documento compartilhado pelos dois layouts raiz — (pt) e (en) são route
 * groups com <html> próprio só para o lang mudar; todo o resto é igual.
 */
export function Documento({ lang, children }: { lang: "pt-BR" | "en"; children: ReactNode }) {
  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Relevo animado atrás da página inteira */}
        <Topografia />
        <BarraProgresso />
        <EasterEgg email={perfil.links.email} />
        {children}
      </body>
    </html>
  );
}
