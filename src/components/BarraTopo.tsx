"use client";

import Link from "next/link";
import { useEffect } from "react";
import { caminhoDaHome, conteudo, textos, type Idioma } from "@/lib/i18n";
import { HoraLocal } from "./HoraLocal";
import { SeletorIdioma } from "./SeletorIdioma";

/*
 * Barra fixa do topo: marca, âncoras das seções (só na home), leitura de
 * posição com a hora de BH e o seletor de idioma. A linha vermelha na base é
 * o progresso da rolagem.
 *
 * O progresso vira a variável --progresso no <html>, escrita uma vez por
 * quadro; a Régua lateral lê a mesma variável, sem re-render nenhum.
 */
export function BarraTopo({
  idioma,
  destinoIdioma,
  navegacao = false,
}: {
  idioma: Idioma;
  destinoIdioma: string;
  navegacao?: boolean;
}) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].nav;

  useEffect(() => {
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      document.documentElement.style.setProperty("--progresso", p.toFixed(4));
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      cancelAnimationFrame(pedido);
    };
  }, []);

  const [primeiro, ...resto] = perfil.nome.split(" ");
  const sobrenome = resto[resto.length - 1];

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href={caminhoDaHome(idioma)}
          className="group flex items-center gap-2.5 text-[14px] font-medium tracking-[-0.01em] no-underline"
        >
          <span aria-hidden className="relative grid size-[22px] place-items-center rounded-[5px] border border-border-strong">
            <span className="size-1.5 rounded-full bg-signal" />
            <span className="onda absolute size-1.5 rounded-full border border-signal" />
          </span>
          <span className="transicao group-hover:text-signal">
            {primeiro} {sobrenome}
          </span>
        </Link>

        {navegacao && (
          <nav aria-label={t.aria} className="hidden md:block">
            <ol className="flex items-center gap-1 font-mono text-[11.5px] tracking-[0.02em]">
              {(Object.keys(t.itens) as Array<keyof typeof t.itens>).map((chave, i) => (
                <li key={chave}>
                  <a
                    href={`#${chave}`}
                    className="transicao rounded px-2.5 py-1.5 text-muted no-underline hover:text-foreground"
                  >
                    <span aria-hidden className="mr-1.5 text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.itens[chave]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <p className="hidden font-mono text-[11px] tracking-[0.02em] text-faint tabular-nums lg:block">
            {perfil.coordenadas}
            <HoraLocal locale={idioma === "pt" ? "pt-BR" : "en-GB"} />
          </p>
          <SeletorIdioma idioma={idioma} destino={destinoIdioma} />
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-signal"
        style={{ transform: "scaleX(var(--progresso, 0))" }}
      />
    </header>
  );
}
