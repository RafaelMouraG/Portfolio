'use client'

import { useEffect, useRef, useState } from 'react'

// Liga uma vez quando o elemento entra na tela (para contagens e barras que
// devem animar só quando alguém está olhando).
export function useNaTela<T extends Element>(margem = '-10% 0px') {
  const ref = useRef<T>(null)
  const [visto, setVisto] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visto) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [margem, visto])

  return [ref, visto] as const
}

// Progresso 0→1 com desaceleração, depois que `ligado` fica true
export function useProgresso(ligado: boolean, duracao = 1400, atraso = 0) {
  const [p, setP] = useState(0)

  useEffect(() => {
    if (!ligado) return
    let raf = 0
    let inicio: number | null = null
    const quadro = (agora: number) => {
      inicio ??= agora + atraso
      const bruto = Math.min(1, Math.max(0, (agora - inicio) / duracao))
      setP(1 - Math.pow(1 - bruto, 3))
      if (bruto < 1) raf = requestAnimationFrame(quadro)
    }
    raf = requestAnimationFrame(quadro)
    return () => cancelAnimationFrame(raf)
  }, [ligado, duracao, atraso])

  return p
}
