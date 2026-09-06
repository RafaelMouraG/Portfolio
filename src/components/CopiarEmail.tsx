"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Botão quadrado de copiar e-mail, ao lado do CTA de e-mail. Usa a Clipboard
 * API com fallback para execCommand, e troca o ícone por um check por 2s.
 * É um quadrado de 42px para alinhar a altura dos CTAs vizinhos.
 */
export function CopiarEmail({
  email,
  rotulo,
  copiadoRotulo,
}: {
  email: string;
  rotulo: string;
  copiadoRotulo: string;
}) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback para contextos sem Clipboard API (http, navegador antigo)
      const area = document.createElement("textarea");
      area.value = email;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopiado(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copiar}
      title={copiado ? copiadoRotulo : rotulo}
      aria-label={copiado ? copiadoRotulo : rotulo}
      aria-live="polite"
      className="accent-transition grid size-[42px] shrink-0 place-items-center rounded-[9px] border border-border font-mono text-[14px] text-muted hover:border-border-strong hover:text-foreground"
    >
      <span aria-hidden>{copiado ? "✓" : "⧉"}</span>
    </button>
  );
}
