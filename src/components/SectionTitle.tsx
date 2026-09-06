import type { ReactNode } from "react";

/*
 * Cabeçalho de seção do design: numeral em mono dourado, rótulo em versalete
 * com muito tracking, e um metadado opcional empurrado para a direita na
 * mesma linha de base (é onde entram a contagem de projetos e o total da stack).
 */
export function SectionTitle({
  id,
  numero,
  meta,
  children,
}: {
  id: string;
  numero: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2
        id={id}
        className="text-[13px] font-medium tracking-[0.12em] text-muted uppercase"
      >
        <span aria-hidden className="mr-2.5 font-mono text-[11px] font-normal text-gold">
          {numero}
        </span>
        {children}
      </h2>
      {meta}
    </div>
  );
}
