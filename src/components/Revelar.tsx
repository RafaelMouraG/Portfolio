"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMovimentoReduzido } from "@/lib/movimento";

/*
 * Entrada das seções na rolagem: sobe 18px esmaecendo, uma vez só, quando
 * 80px dela entram na tela. Sob prefers-reduced-motion a seção aparece sem
 * deslocamento nem duração. O elemento é sempre o mesmo motion.div, e a
 * preferência vem de um store com resposta fixa no servidor, então o HTML
 * hidratado bate com o do servidor nos dois casos.
 */
export function Revelar({ children }: { children: ReactNode }) {
  const reduzir = useMovimentoReduzido();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduzir ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
