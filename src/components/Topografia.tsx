"use client";

import { useEffect, useRef } from "react";

/*
 * Fundo da página inteira: curvas de nível de um relevo de ruído que deriva
 * devagar, como um mapa que respira. O cursor levanta uma colina onde passa
 * e a rolagem desloca o relevo com um parallax curto.
 *
 * É um <canvas> fixo atrás de tudo (z-index -1, sem pointer-events). Tudo é
 * osso sobre o preto quente, em opacidades baixas, para não disputar com o
 * texto. Sob prefers-reduced-motion desenha um único quadro parado. Sem JS,
 * simplesmente não existe e o fundo fica o preto chapado.
 *
 * Custo: marching squares numa grade de 12px (16px em telas estreitas), com
 * 13 níveis, limitado a ~30 quadros por segundo.
 */
export function Topografia() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const temMouse = window.matchMedia("(hover: hover)").matches;

    let largura = 0;
    let altura = 0;
    let celula = 12;
    let rolagem = window.scrollY;
    let quadroAnterior = 0;
    let animacao = 0;
    const mouse = { x: -1e4, y: -1e4, ativo: false };

    // Ruído de valor 2D determinístico (permutação fixa, semente 1337) —
    // o mesmo relevo em toda visita, só o tempo muda.
    const perm = new Uint8Array(512);
    {
      const p = Array.from({ length: 256 }, (_, i) => i);
      let s = 1337;
      for (let i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        const j = s % (i + 1);
        [p[i], p[j]] = [p[j], p[i]];
      }
      for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    }
    const hash = (x: number, y: number) => perm[(perm[x & 255] + y) & 255] / 255;
    const suavizar = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    function ruido(x: number, y: number) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const u = suavizar(x - xi);
      const v = suavizar(y - yi);
      const a = hash(xi, yi);
      const b = hash(xi + 1, yi);
      const c = hash(xi, yi + 1);
      const d = hash(xi + 1, yi + 1);
      const topo = a + (b - a) * u;
      const base = c + (d - c) * u;
      return topo + (base - topo) * v;
    }
    const relevo = (x: number, y: number) =>
      0.6 * ruido(x, y) + 0.3 * ruido(x * 2.1, y * 2.1) + 0.1 * ruido(x * 4.3, y * 4.3);

    const osso = (a: number) => `rgba(236, 234, 229, ${a})`;

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      celula = largura > 900 ? 12 : 16;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function desenhar(t: number) {
      const colunas = Math.ceil(largura / celula) + 1;
      const linhas = Math.ceil(altura / celula) + 1;
      const escala = 0.0026;
      const tempo = t * 0.00004;
      const deslocamento = rolagem * 0.25;

      const campo = new Float32Array(colunas * linhas);
      for (let j = 0; j < linhas; j++) {
        for (let i = 0; i < colunas; i++) {
          const x = i * celula;
          const y = j * celula + deslocamento;
          let v = relevo(x * escala + tempo, y * escala + tempo * 0.7);
          if (mouse.ativo) {
            const dx = x - mouse.x;
            const dy = y - deslocamento - mouse.y;
            v += 0.22 * Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150));
          }
          campo[j * colunas + i] = v;
        }
      }

      ctx!.clearRect(0, 0, largura, altura);
      ctx!.lineCap = "round";
      const niveis = 14;
      for (let n = 1; n < niveis; n++) {
        const iso = 0.22 + (n / niveis) * 0.62;
        const mestra = n % 4 === 0;
        ctx!.strokeStyle = osso(mestra ? 0.2 : 0.085);
        ctx!.lineWidth = mestra ? 1.1 : 0.8;
        ctx!.beginPath();
        for (let j = 0; j < linhas - 1; j++) {
          for (let i = 0; i < colunas - 1; i++) {
            const a = campo[j * colunas + i];
            const b = campo[j * colunas + i + 1];
            const c = campo[(j + 1) * colunas + i + 1];
            const d = campo[(j + 1) * colunas + i];
            const caso =
              (a > iso ? 1 : 0) | (b > iso ? 2 : 0) | (c > iso ? 4 : 0) | (d > iso ? 8 : 0);
            if (caso === 0 || caso === 15) continue;

            const x0 = i * celula;
            const y0 = j * celula;
            const fracao = (p: number, q: number) => (iso - p) / (q - p || 1e-6);
            const cima = [x0 + fracao(a, b) * celula, y0];
            const direita = [x0 + celula, y0 + fracao(b, c) * celula];
            const baixo = [x0 + fracao(d, c) * celula, y0 + celula];
            const esquerda = [x0, y0 + fracao(a, d) * celula];
            const segmento = (p: number[], q: number[]) => {
              ctx!.moveTo(p[0], p[1]);
              ctx!.lineTo(q[0], q[1]);
            };
            switch (caso) {
              case 1:
              case 14:
                segmento(esquerda, cima);
                break;
              case 2:
              case 13:
                segmento(cima, direita);
                break;
              case 3:
              case 12:
                segmento(esquerda, direita);
                break;
              case 4:
              case 11:
                segmento(direita, baixo);
                break;
              case 5:
                segmento(esquerda, cima);
                segmento(direita, baixo);
                break;
              case 6:
              case 9:
                segmento(cima, baixo);
                break;
              case 7:
              case 8:
                segmento(esquerda, baixo);
                break;
              case 10:
                segmento(cima, direita);
                segmento(esquerda, baixo);
                break;
            }
          }
        }
        ctx!.stroke();
      }
    }

    function laco(t: number) {
      animacao = requestAnimationFrame(laco);
      if (t - quadroAnterior < 32) return;
      quadroAnterior = t;
      desenhar(t);
    }

    const aoRolar = () => {
      rolagem = window.scrollY;
      if (reduzir) desenhar(0);
    };
    const aoMover = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.ativo = true;
    };
    const aoSair = () => {
      mouse.ativo = false;
    };
    const aoRedimensionar = () => {
      redimensionar();
      if (reduzir) desenhar(0);
    };

    redimensionar();
    window.addEventListener("resize", aoRedimensionar);
    window.addEventListener("scroll", aoRolar, { passive: true });
    if (temMouse && !reduzir) {
      window.addEventListener("mousemove", aoMover, { passive: true });
      document.addEventListener("mouseleave", aoSair);
    }

    if (reduzir) desenhar(0);
    else animacao = requestAnimationFrame(laco);

    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("resize", aoRedimensionar);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("mousemove", aoMover);
      document.removeEventListener("mouseleave", aoSair);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
