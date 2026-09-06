"use client";

import { useEffect, useState } from "react";

/*
 * Hora local de Belo Horizonte no rodapé, como no design. Só renderiza depois
 * de montar: o horário do servidor e o do primeiro paint divergiriam e o React
 * acusaria erro de hidratação. Enquanto isso o rodapé mostra só a cidade.
 */
export function HoraLocal({ locale }: { locale: string }) {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const ler = () =>
      setHora(
        new Date().toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    ler();
    const id = setInterval(ler, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  if (!hora) return null;
  return <> — {hora}</>;
}
