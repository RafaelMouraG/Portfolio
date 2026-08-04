"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Area } from "@/content/projetos";
import { textos, type Idioma } from "@/lib/i18n";

export type FiltroArea = Area | "todos";

const ordem: ReadonlyArray<FiltroArea> = ["dados", "todos", "dev"];

type Props = {
  valor: FiltroArea;
  aoMudar: (valor: FiltroArea) => void;
  idioma: Idioma;
  // undefined esconde os contadores (regra: só aparecem se equilibrados)
  contagens?: Record<FiltroArea, number>;
};

/*
 * Segmented control de três posições, seguindo o padrão WAI-ARIA de radio
 * group: Tab entra e sai do grupo, setas movem a seleção, foco visível.
 * O estado ativo é indicado por peso de fonte e pelo anel deslizante,
 * nunca só por cor.
 */
export function AreaFilter({ valor, aoMudar, idioma, contagens }: Props) {
  const botoes = useRef<Map<FiltroArea, HTMLButtonElement | null>>(new Map());
  const t = textos[idioma].filtro;

  function selecionar(proximo: FiltroArea) {
    aoMudar(proximo);
    botoes.current.get(proximo)?.focus();
  }

  function aoTeclar(evento: React.KeyboardEvent) {
    const atual = ordem.indexOf(valor);
    let destino: number | null = null;

    if (evento.key === "ArrowRight" || evento.key === "ArrowDown") {
      destino = (atual + 1) % ordem.length;
    } else if (evento.key === "ArrowLeft" || evento.key === "ArrowUp") {
      destino = (atual - 1 + ordem.length) % ordem.length;
    } else if (evento.key === "Home") {
      destino = 0;
    } else if (evento.key === "End") {
      destino = ordem.length - 1;
    }

    if (destino !== null) {
      evento.preventDefault();
      selecionar(ordem[destino]);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.aria}
      onKeyDown={aoTeclar}
      className="inline-flex max-w-full rounded-full border border-border bg-surface p-1"
    >
      {ordem.map((opcao) => {
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
              {t.rotulos[opcao]}
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
