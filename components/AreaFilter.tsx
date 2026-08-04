"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Area } from "@/content/projetos";

export type FiltroArea = Area | "todos";

const opcoes: ReadonlyArray<{ valor: FiltroArea; rotulo: string }> = [
  { valor: "dados", rotulo: "Dados e IA" },
  { valor: "todos", rotulo: "Todos" },
  { valor: "dev", rotulo: "Dev" },
];

type Props = {
  valor: FiltroArea;
  aoMudar: (valor: FiltroArea) => void;
  // undefined esconde os contadores (regra: só aparecem se equilibrados)
  contagens?: Record<FiltroArea, number>;
};

/*
 * Segmented control de três posições, seguindo o padrão WAI-ARIA de radio
 * group: Tab entra e sai do grupo, setas movem a seleção, foco visível.
 * O estado ativo é indicado por peso de fonte e pelo anel deslizante,
 * nunca só por cor.
 */
export function AreaFilter({ valor, aoMudar, contagens }: Props) {
  const botoes = useRef<Map<FiltroArea, HTMLButtonElement | null>>(new Map());

  function selecionar(proximo: FiltroArea) {
    aoMudar(proximo);
    botoes.current.get(proximo)?.focus();
  }

  function aoTeclar(evento: React.KeyboardEvent) {
    const atual = opcoes.findIndex((opcao) => opcao.valor === valor);
    let destino: number | null = null;

    if (evento.key === "ArrowRight" || evento.key === "ArrowDown") {
      destino = (atual + 1) % opcoes.length;
    } else if (evento.key === "ArrowLeft" || evento.key === "ArrowUp") {
      destino = (atual - 1 + opcoes.length) % opcoes.length;
    } else if (evento.key === "Home") {
      destino = 0;
    } else if (evento.key === "End") {
      destino = opcoes.length - 1;
    }

    if (destino !== null) {
      evento.preventDefault();
      selecionar(opcoes[destino].valor);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Filtrar projetos por área"
      onKeyDown={aoTeclar}
      className="inline-flex max-w-full rounded-full border border-border bg-surface p-1"
    >
      {opcoes.map(({ valor: opcao, rotulo }) => {
        const ativo = opcao === valor;
        return (
          <button
            key={opcao}
            type="button"
            role="radio"
            aria-checked={ativo}
            tabIndex={ativo ? 0 : -1}
            ref={(el) => {
              botoes.current.set(opcao, el);
            }}
            onClick={() => aoMudar(opcao)}
            className="relative rounded-full px-3 py-1.5 text-sm sm:px-4"
          >
            {ativo && (
              <motion.span
                layoutId="indicador-area"
                aria-hidden
                className="accent-transition absolute inset-0 rounded-full border border-accent bg-accent/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span
              className={`accent-transition relative z-10 whitespace-nowrap ${
                ativo ? "font-semibold text-accent" : "font-normal text-foreground"
              }`}
            >
              {rotulo}
              {contagens && (
                <span className="ml-1.5 font-mono text-xs text-muted">
                  {contagens[opcao]}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
