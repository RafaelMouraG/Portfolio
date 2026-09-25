"use client";

import { useSyncExternalStore } from "react";
import type { Projeto } from "@/content/projetos";
import type { Idioma } from "@/lib/i18n";
import { useMovimentoReduzido } from "@/lib/movimento";
import { useNaTela, useProgresso } from "@/lib/useNaTela";

type Medidas = NonNullable<Projeto["medidas"]>;

const assinarNada = () => () => {};

function formatar(valor: number, unidade: "%" | "min", idioma: Idioma, contando: boolean) {
  const locale = idioma === "pt" ? "pt-BR" : "en-US";
  if (unidade === "%") {
    return `${valor.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }
  // Pontas redondas em hora leem melhor ("2 h"); a contagem fica em minutos
  if (!contando && valor >= 60 && valor % 60 === 0) return `${valor / 60} h`;
  return `${Math.round(valor)} min`;
}

function queda(de: number, para: number, unidade: "%" | "min", idioma: Idioma) {
  const locale = idioma === "pt" ? "pt-BR" : "en-US";
  if (unidade === "%") {
    const pp = (de - para).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `−${pp} p.p.`;
  }
  return `−${Math.round((1 - para / de) * 100)}%`;
}

/*
 * Comparação de/para animada: a barra "de" fica cheia e apagada, a barra
 * "para" nasce do mesmo tamanho e encolhe até o valor novo, com o número
 * contando junto. No Hortifruti é o tempo que saiu da rotina; no AtlasLeaf,
 * a acurácia que caiu quando a avaliação ficou honesta.
 */
export function Medidas({ medidas, idioma }: { medidas: Medidas; idioma: Idioma }) {
  const [ref, visto] = useNaTela<HTMLDivElement>("-15% 0px");
  const reduzido = useMovimentoReduzido();
  const progresso = useProgresso(visto && !reduzido, 1600, 250);
  const hidratado = useSyncExternalStore(assinarNada, () => true, () => false);
  const p = !hidratado || reduzido ? 1 : visto ? progresso : 0;

  return (
    <section aria-label={medidas.titulo} className="moldura-figura relative rounded-[12px] border border-border p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{medidas.titulo}</h2>
        <p className="flex gap-4 font-mono text-[10.5px] tracking-[0.06em] uppercase">
          <span className="inline-flex items-center gap-1.5 text-faint">
            <span aria-hidden className="h-1.5 w-3 rounded-[1px] bg-border-strong" />
            {medidas.rotuloDe}
          </span>
          <span className="inline-flex items-center gap-1.5 text-signal">
            <span aria-hidden className="h-1.5 w-3 rounded-[1px] bg-signal" />
            {medidas.rotuloPara}
          </span>
        </p>
      </div>

      <div ref={ref} className="mt-7 flex flex-col gap-7">
        {medidas.itens.map(({ rotulo, de, para, unidade, periodo }) => {
          const atual = de + (para - de) * p;
          // Porcentagem na régua de 0 a 100; tempo na régua do próprio "antes",
          // porque "por dia" e "por semana" não dividem o mesmo eixo.
          const escala = unidade === "%" ? 100 : Math.max(de, para);
          return (
            <div key={rotulo} className="grid gap-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-medium">
                  {rotulo}
                  {periodo && <span className="ml-2 font-mono text-[11px] font-normal text-faint">{periodo}</span>}
                </h3>
                <span
                  className="font-mono text-[12px] text-signal transition-opacity duration-500"
                  style={{ opacity: p > 0.98 ? 1 : 0 }}
                >
                  {queda(de, para, unidade, idioma)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
                <div className="h-2.5 rounded-[2px] bg-border-soft">
                  <div className="h-full rounded-[2px] bg-border-strong" style={{ width: `${(de / escala) * 100}%` }} />
                </div>
                <span className="w-[76px] text-right font-mono text-[12px] text-faint tabular-nums">
                  {formatar(de, unidade, idioma, false)}
                </span>
                <div className="h-2.5 rounded-[2px] bg-border-soft">
                  <div
                    className="h-full rounded-[2px] bg-signal shadow-[0_0_14px_var(--signal-soft)]"
                    style={{ width: `${(atual / escala) * 100}%` }}
                  />
                </div>
                <span className="w-[76px] text-right font-leitura text-[20px] leading-none font-bold text-foreground tabular-nums">
                  {formatar(atual, unidade, idioma, p < 1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {medidas.nota && <p className="mt-7 max-w-[62ch] text-[14.5px] leading-[1.6] text-muted">{medidas.nota}</p>}
    </section>
  );
}
