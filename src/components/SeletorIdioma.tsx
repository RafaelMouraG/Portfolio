import Link from "next/link";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Alterna entre as versões pt e en da página atual. `destino` é calculado
 * pela página, que sabe qual é a sua contraparte no outro idioma.
 * Veste o mesmo quadrado de 32px dos links do cabeçalho: o seletor é só mais
 * um item da fileira, não um controle à parte.
 */
export function SeletorIdioma({ idioma, destino }: { idioma: Idioma; destino: string }) {
  const t = textos[idioma].idioma;
  return (
    <Link
      href={destino}
      hrefLang={idioma === "pt" ? "en" : "pt-BR"}
      rel="alternate"
      aria-label={t.rotuloLink}
      className="accent-transition grid size-9 place-items-center rounded-lg border border-border font-mono text-[10px] font-medium tracking-[0.04em] text-muted hover:border-border-strong hover:text-foreground"
    >
      {t.alvo}
    </Link>
  );
}
