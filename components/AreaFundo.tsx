"use client";

import { useEffect } from "react";
import type { Area } from "@/content/projetos";

/*
 * Ponte entre a área ativa (filtro na home, área do projeto no case) e o
 * fundo da página: seta data-area-ativa no <html>, e o CSS dos .brilho-area
 * faz o brilho da área ganhar o topo enquanto o da outra quase apaga.
 * Sem área (filtro "Todos"), os dois brilhos convivem.
 */
export function AreaFundo({ area }: { area?: Area }) {
  useEffect(() => {
    const raiz = document.documentElement;
    if (area) {
      raiz.dataset.areaAtiva = area;
    } else {
      delete raiz.dataset.areaAtiva;
    }
    return () => {
      delete raiz.dataset.areaAtiva;
    };
  }, [area]);

  return null;
}
