import type { ReactNode } from "react";

/*
 * Cabeçalho das seções: numeral em matriz de pontos, título grande e, embaixo,
 * uma régua com traços que se desenha quando entra na tela (scroll-driven
 * animation; sem suporte, a régua já aparece inteira).
 */
export function CabecalhoSecao({
  id,
  numero,
  titulo,
  meta,
}: {
  id: string;
  numero: string;
  titulo: string;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-6">
        <h2 id={id} className="flex items-baseline gap-4">
          <span aria-hidden className="font-leitura text-[40px] leading-none font-bold text-signal sm:text-[52px]">
            {numero}
          </span>
          <span className="text-[32px] leading-none font-semibold tracking-[-0.035em] [font-stretch:85%] sm:text-[44px]">
            {titulo}
          </span>
        </h2>
        {meta}
      </div>
      <div aria-hidden className="relative h-2">
        <div
          className="desenhar-x absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-strong), var(--border-strong)), repeating-linear-gradient(90deg, var(--border-strong) 0 1px, transparent 1px 10px), repeating-linear-gradient(90deg, var(--muted) 0 1px, transparent 1px 100px)",
            backgroundSize: "100% 1px, 100% 4px, 100% 8px",
            backgroundPosition: "0 0, 0 0, 0 0",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
