"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { conteudo, textos, type Idioma } from "@/lib/i18n";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (avisar) => {
      const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
      consulta.addEventListener("change", avisar);
      return () => consulta.removeEventListener("change", avisar);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/*
 * Terminal do Hero: três comandos digitados em loop (whoami, stack --top,
 * status), com as respostas vindas do conteúdo real — nome, top da stack e
 * o selo de status. É a "firula" do cabeçalho sem sair do design: borda
 * fina, surface, mono e nenhum cromatismo.
 *
 * Sob prefers-reduced-motion, renderiza o resultado final estático, sem loop.
 */
export function TerminalHero({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma];

  const linhas = useMemo(
    () => [
      { cmd: "whoami", saidas: [`rafael · ${t.areas.dev} + ${t.areas.dados}`] },
      { cmd: "stack --top", saidas: [perfil.techsPrincipais.slice(0, 6).join(" · ")] },
      { cmd: "status", saidas: [perfil.disponibilidade] },
    ],
    [perfil, t],
  );

  const [concluidas, setConcluidas] = useState(0);
  const [linhaAtual, setLinhaAtual] = useState(0);
  const [chars, setChars] = useState(0);
  const [mostrarSaidas, setMostrarSaidas] = useState(false);
  const reduzido = usePrefersReducedMotion();

  useEffect(() => {
    if (reduzido) return;
    let vivo = true;
    const esperar = (ms: number) =>
      new Promise<void>((resolver) => setTimeout(resolver, ms));

    (async () => {
      // Pausa inicial para o Hero aparecer antes da digitação
      await esperar(900);
      while (vivo) {
        for (let li = 0; li < linhas.length && vivo; li++) {
          setLinhaAtual(li);
          const cmd = linhas[li].cmd;
          for (let c = 1; c <= cmd.length && vivo; c++) {
            setChars(c);
            await esperar(42);
          }
          await esperar(300);
          if (!vivo) return;
          setMostrarSaidas(true);
          await esperar(700);
          if (!vivo) return;
          setConcluidas(li + 1);
          setMostrarSaidas(false);
          setChars(0);
        }
        await esperar(4600);
        if (!vivo) return;
        setConcluidas(0);
        setLinhaAtual(0);
      }
    })();

    return () => {
      vivo = false;
    };
  }, [reduzido, linhas]);

  const parcial =
    !reduzido && linhaAtual < linhas.length && (chars > 0 || mostrarSaidas);

  return (
    <figure
      aria-label={t.hero.terminal}
      className="surgir overflow-hidden rounded-xl border border-border bg-surface [animation-delay:200ms]"
    >
      <div
        aria-hidden
        className="flex items-center gap-1.5 border-b border-border-soft px-4 py-2.5"
      >
        <span className="size-2.5 rounded-full bg-dim" />
        <span className="size-2.5 rounded-full bg-dim" />
        <span className="size-2.5 rounded-full bg-dim" />
        <span className="ml-2 font-mono text-[11px] text-fainter">
          rafael@portfolio: ~/
        </span>
      </div>
      <div className="min-h-[172px] px-4 py-3.5 font-mono text-[12.5px] leading-[1.9]">
        {reduzido
          ? linhas.map(({ cmd, saidas }) => (
              <div key={cmd}>
                <p className="text-foreground">
                  <span className="mr-2 text-faint">$</span>
                  {cmd}
                </p>
                {saidas.map((saida) => (
                  <p key={saida} className="text-muted">
                    {saida}
                  </p>
                ))}
              </div>
            ))
          : (
            <>
              {linhas.slice(0, concluidas).map(({ cmd, saidas }) => (
                <div key={cmd}>
                  <p className="text-foreground">
                    <span className="mr-2 text-faint">$</span>
                    {cmd}
                  </p>
                  {saidas.map((saida) => (
                    <p key={saida} className="text-muted">
                      {saida}
                    </p>
                  ))}
                </div>
              ))}
              {parcial && (
                <div>
                  <p className="text-foreground">
                    <span className="mr-2 text-faint">$</span>
                    {linhas[linhaAtual].cmd.slice(0, chars)}
                    {!mostrarSaidas && (
                      <span aria-hidden className="cursor-piscante text-faint">
                        ▍
                      </span>
                    )}
                  </p>
                  {mostrarSaidas &&
                    linhas[linhaAtual].saidas.map((saida) => (
                      <p key={saida} className="text-muted">
                        {saida}
                        <span aria-hidden className="cursor-piscante text-faint">
                          {" "}
                          ▍
                        </span>
                      </p>
                    ))}
                </div>
              )}
              {!parcial && (
                <p className="text-foreground">
                  <span className="mr-2 text-faint">$</span>
                  <span aria-hidden className="cursor-piscante text-faint">
                    ▍
                  </span>
                </p>
              )}
            </>
          )}
      </div>
    </figure>
  );
}
