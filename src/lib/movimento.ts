'use client'

import { useSyncExternalStore } from 'react'

// prefers-reduced-motion como estado do React. No servidor responde false:
// a página sai animada e, se o visitante pediu menos movimento, as peças
// param logo na hidratação (o CSS já cortou as animações antes disso).
const CONSULTA = '(prefers-reduced-motion: reduce)'

function assinar(avisar: () => void) {
  const consulta = window.matchMedia(CONSULTA)
  consulta.addEventListener('change', avisar)
  return () => consulta.removeEventListener('change', avisar)
}

export function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  )
}
