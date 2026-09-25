"use client";

import { useEffect, useState } from "react";

type Marca = { id: string; rotulo: string; pos: number };

/*
 * Régua de rolagem na borda esquerda (só em tela larga, onde sobra margem):
 * traços a cada 1%, marcas nas seções com [data-regua] e um ponteiro
 * vermelho que desce com a leitura. As marcas são atalhos de mouse; para
 * teclado e leitor de tela a navegação é a do topo, por isso tudo aqui é
 * aria-hidden e fora da ordem de tabulação.
 */
export function Regua() {
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-regua]"));
      setMarcas(
        els.map((el) => ({
          id: el.id,
          rotulo: el.dataset.regua ?? "",
          pos: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - 72) / total)),
        })),
      );
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };
    agendar();
    const observador = new ResizeObserver(agendar);
    observador.observe(document.body);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-6 z-40 hidden h-[64vh] -translate-y-1/2 min-[1400px]:block"
    >
      <div className="relative h-full w-3">
        {/* traços: menores a cada 1%, maiores a cada 10% */}
        <div
          className="absolute inset-y-0 left-0 w-1.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--border-strong) 0 1px, transparent 1px calc(100% / 100))",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--muted) 0 1px, transparent 1px calc(100% / 10))",
          }}
        />
        <div className="absolute bottom-0 left-0 h-px w-3 bg-muted" />

        {marcas.map(({ id, rotulo, pos }) => (
          <a
            key={id}
            href={`#${id}`}
            tabIndex={-1}
            className="transicao pointer-events-auto absolute left-5 max-w-[96px] -translate-y-1/2 truncate font-mono text-[10px] tracking-[0.06em] whitespace-nowrap text-faint uppercase no-underline hover:text-foreground"
            style={{ top: `${pos * 100}%` }}
          >
            {rotulo}
          </a>
        ))}

        {/* ponteiro */}
        <div
          className="absolute -left-1.5 flex -translate-y-1/2 items-center"
          style={{ top: "calc(var(--progresso, 0) * 100%)" }}
        >
          <span className="h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-signal" />
        </div>
      </div>
    </div>
  );
}
