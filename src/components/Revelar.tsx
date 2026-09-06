"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
 * Entrada das seções na rolagem: sobe 18px esmaecendo, uma vez só, quando
 * 80px dela entram na tela. Sob prefers-reduced-motion vira div comum.
 */
export function Revelar({ children }: { children: ReactNode }) {
  const reduzir = useReducedMotion();

  if (reduzir) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
