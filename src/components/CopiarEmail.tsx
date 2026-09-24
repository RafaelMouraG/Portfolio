"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Botão de copiar e-mail em texto: "Copiar e-mail" vira "Copiado" por 2s.
 * Usa a Clipboard API com fallback para execCommand. A aparência vem de
 * quem usa (link discreto na coluna fixa, pílula no bloco de contato).
 */
export function CopiarEmail({
  email,
  rotulo,
  copiadoRotulo,
  className = "",
}: {
  email: string;
  rotulo: string;
  copiadoRotulo: string;
  className?: string;
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
    <button type="button" onClick={copiar} aria-live="polite" className={className}>
      {copiado ? copiadoRotulo : rotulo}
    </button>
  );
}
