"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/*
 * Fio de progresso de leitura no topo da página: 2px em osso translúcido,
 * escala horizontal com a rolagem. Some sob prefers-reduced-motion.
 */
export function BarraProgresso() {
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  if (reduzir) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: escala }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-foreground/60"
    />
  );
}
