"use client";

import { useEffect, useRef, useState } from "react";

/*
 * O e-mail em tamanho de manchete, com um botão de copiar que "publica" o
 * endereço: um pacote atravessa a linha e volta um ack. É o mesmo gesto das
 * figuras, aplicado à única ação que importa no fim da página.
 */
export function EnvioEmail({
  email,
  copiar,
  copiado,
}: {
  email: string;
  copiar: string;
  copiado: string;
}) {
  const [envios, setEnvios] = useState(0);
  const [ok, setOk] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function enviar() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
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
    setEnvios((n) => n + 1);
    setOk(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOk(false), 2400);
  }

  return (
    <div className="moldura-figura relative flex flex-col gap-6 rounded-[14px] border border-border p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
      <a
        href={`mailto:${email}`}
        className="transicao text-[clamp(1.35rem,4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em] break-all no-underline [font-stretch:88%] hover:text-signal"
      >
        {email}
      </a>

      <div className="flex items-center gap-4">
        <div aria-hidden className="relative hidden h-4 w-28 sm:block" style={{ ["--percurso" as string]: "104px" }}>
          <span className="absolute top-1/2 right-0 left-0 h-px border-t border-dashed border-border-strong" />
          {envios > 0 && (
            <>
              <span key={envios} className="pacote-envio absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_10px_var(--signal)]" />
              <span key={`ack-${envios}`} className="ack-envio absolute -top-4 right-0 font-mono text-[10px] tracking-[0.06em] text-signal">
                ack
              </span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={enviar}
          aria-live="polite"
          className="transicao inline-flex min-w-[112px] items-center justify-center gap-2 rounded-[8px] bg-foreground px-5 py-3 font-mono text-[13px] font-medium text-background hover:bg-signal"
        >
          <span aria-hidden>{ok ? "✓" : "⧉"}</span>
          {ok ? copiado : copiar}
        </button>
      </div>
    </div>
  );
}
