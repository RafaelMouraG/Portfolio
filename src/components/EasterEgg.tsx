"use client";

import { useEffect } from "react";

/*
 * Recado no console para quem inspeciona: assinatura em ASCII + e-mail.
 * Roda uma vez no cliente; invisível na interface.
 */
export function EasterEgg({ email }: { email: string }) {
  useEffect(() => {
    console.log(
      `%c █▀█ █▀█ █▀▀ █▀█ █\n █▀▄ █▀█ █▀  █▀█ ▀\n ▀ ▀ ▀ ▀ ▀   ▀ ▀ ▄\n\n%cme escreve → ${email}`,
      "font-family: monospace",
      "font-family: monospace",
    );
  }, [email]);

  return null;
}
