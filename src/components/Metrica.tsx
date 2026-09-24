import type { Projeto } from "@/content/projetos";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Número de destaque do projeto em Funnel Display leve. Quando há `antes`,
 * ele sai pequeno e riscado em laranja à esquerda: a correção honesta de
 * métrica é parte da história, não uma nota de rodapé.
 */
export function Metrica({
  metrica,
  idioma,
  className = "",
}: {
  metrica: Projeto["metrica"];
  idioma: Idioma;
  className?: string;
}) {
  const { valor, antes, rotulo } = metrica;
  return (
    <p className={`grid gap-1 ${className}`}>
      <span className="font-display text-[clamp(30px,3vw,44px)] leading-none font-light tracking-[-0.04em] whitespace-nowrap tabular-nums">
        {antes && (
          <s className="mr-2 align-[0.5em] text-[0.45em] tracking-[-0.02em] text-ink-3 decoration-accent decoration-2">
            <span className="sr-only">{textos[idioma].projetos.antes} </span>
            {antes}
          </s>
        )}
        {valor}
      </span>
      <span className="text-[13px] text-ink-2">{rotulo}</span>
    </p>
  );
}
