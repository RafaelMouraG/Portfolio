import type { ReactNode } from "react";
import { Doto, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { perfil } from "@/content/perfil";
import { EasterEgg } from "./EasterEgg";

/*
 * Quatro vozes, cada uma com um trabalho só:
 * - Instrument Sans (com eixo de largura) carrega interface, títulos e texto;
 *   o nome e os títulos grandes usam a largura condensada;
 * - Instrument Serif, em itálico, é o gesto de ênfase dentro de uma frase;
 * - JetBrains Mono marca rótulo, metadado e tudo que é leitura de instrumento;
 * - Doto, fonte de matriz de pontos, só para números grandes.
 */
const instrumentSans = Instrument_Sans({
  variable: "--fonte-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--fonte-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--fonte-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const doto = Doto({
  variable: "--fonte-leitura",
  subsets: ["latin"],
});

/*
 * Documento compartilhado pelos dois layouts raiz — (pt) e (en) são route
 * groups com <html> próprio só para o lang mudar; todo o resto é igual.
 * A barra do topo e a régua moram nas páginas, porque o destino do seletor
 * de idioma depende de qual página é.
 */
export function Documento({ lang, children }: { lang: "pt-BR" | "en"; children: ReactNode }) {
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <EasterEgg email={perfil.links.email} />
        {children}
      </body>
    </html>
  );
}
