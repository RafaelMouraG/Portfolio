import Link from "next/link";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Alterna entre as versões pt e en da página atual. `destino` é calculado
 * pela página, que sabe qual é a sua contraparte no outro idioma. Mostra os
 * dois idiomas em mono, com o atual em tinta cheia.
 */
export function SeletorIdioma({ idioma, destino }: { idioma: Idioma; destino: string }) {
  const t = textos[idioma].idioma;
  const atual = idioma === "pt" ? "PT" : "EN";
  return (
    <Link
      href={destino}
      hrefLang={idioma === "pt" ? "en" : "pt-BR"}
      rel="alternate"
      aria-label={t.rotuloLink}
      className="font-mono text-xs text-ink-2 transition-colors hover:text-ink"
    >
      <span className="font-medium text-ink">{atual}</span>
      <span aria-hidden> / </span>
      {t.alvo}
    </Link>
  );
}
