import Link from "next/link";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Alterna entre as versões pt e en da página atual. `destino` é calculado
 * pela página, que sabe qual é a sua contraparte no outro idioma.
 * Fica na ponta direita da barra do topo, em mono, como uma chave de canal.
 */
export function SeletorIdioma({ idioma, destino }: { idioma: Idioma; destino: string }) {
  const t = textos[idioma].idioma;
  return (
    <Link
      href={destino}
      hrefLang={idioma === "pt" ? "en" : "pt-BR"}
      rel="alternate"
      aria-label={t.rotuloLink}
      className="transicao grid h-8 min-w-9 place-items-center rounded-[6px] border border-border px-2 font-mono text-[10.5px] font-medium tracking-[0.06em] text-muted no-underline hover:border-border-strong hover:text-foreground"
    >
      {t.alvo}
    </Link>
  );
}
