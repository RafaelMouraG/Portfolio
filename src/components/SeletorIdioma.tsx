import Link from "next/link";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Alterna entre as versões pt e en da página atual. `destino` é calculado
 * pela página, que sabe qual é a sua contraparte no outro idioma.
 */
export function SeletorIdioma({ idioma, destino }: { idioma: Idioma; destino: string }) {
  const t = textos[idioma].idioma;
  return (
    <Link
      href={destino}
      hrefLang={idioma === "pt" ? "en" : "pt-BR"}
      rel="alternate"
      aria-label={t.rotuloLink}
      className="accent-transition inline-flex items-center rounded-full border border-border px-3 py-1.5 font-mono text-xs font-medium text-muted hover:border-accent hover:text-accent"
    >
      {t.alvo}
    </Link>
  );
}
