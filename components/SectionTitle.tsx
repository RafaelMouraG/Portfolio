import type { ReactNode } from "react";

/*
 * Título de seção com a assinatura do site: "//" no accent (o site fala a
 * língua de quem escreve código) e uma régua que se dissolve à direita.
 */
export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 font-mono text-sm text-muted">
      <span aria-hidden className="accent-transition font-semibold text-accent">
        {"//"}
      </span>
      {children}
      <span
        aria-hidden
        className="h-px min-w-8 grow bg-gradient-to-r from-border to-transparent"
      />
    </h2>
  );
}
