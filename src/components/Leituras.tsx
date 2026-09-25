"use client";

import { useSyncExternalStore } from "react";
import type { Idioma } from "@/lib/i18n";
import { useMovimentoReduzido } from "@/lib/movimento";
import { useNaTela, useProgresso } from "@/lib/useNaTela";

type Numero = { valor: string; rotulo: string };

const assinarNada = () => () => {};

// Separa "≈229 s" em prefixo, número e sufixo. Notação científica e
// qualquer coisa que não seja um número simples ficam estáticas.
function decompor(valor: string, idioma: Idioma) {
  const m = valor.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m || m[3].includes("×")) return null;
  const [, prefixo, bruto, sufixo] = m;
  const milhar = idioma === "pt" ? "." : ",";
  const decimal = idioma === "pt" ? "," : ".";
  const agrupa = bruto.includes(milhar);
  const casas = bruto.split(decimal)[1]?.length ?? 0;
  const numero = Number(bruto.split(milhar).join("").replace(decimal, "."));
  if (!Number.isFinite(numero)) return null;
  const formato = new Intl.NumberFormat(idioma === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
    useGrouping: agrupa,
  });
  return { prefixo, sufixo, numero, formato };
}

function Leitura({ item, idioma, p }: { item: Numero; idioma: Idioma; p: number }) {
  const partes = decompor(item.valor, idioma);
  // Sem JS, e antes de a contagem começar no servidor, o valor final aparece
  const texto = partes ? `${partes.prefixo}${partes.formato.format(partes.numero * p)}${partes.sufixo}` : item.valor;
  return (
    <div className="flex flex-col-reverse justify-end gap-2 border-l border-border-strong py-1 pl-4">
      <dt className="max-w-[22ch] text-[13.5px] leading-[1.4] text-muted">{item.rotulo}</dt>
      <dd className="font-leitura text-[clamp(2.1rem,4.4vw,3.4rem)] leading-none font-bold tabular-nums">
        <span className="sr-only">{item.valor}</span>
        <span aria-hidden>{texto}</span>
      </dd>
    </div>
  );
}

/*
 * Faixa de leituras do case: números grandes em matriz de pontos que contam
 * de zero até o valor quando entram na tela. O leitor de tela recebe o valor
 * final direto.
 */
export function Leituras({ itens, idioma, titulo }: { itens: Numero[]; idioma: Idioma; titulo: string }) {
  const [ref, visto] = useNaTela<HTMLDListElement>();
  const reduzido = useMovimentoReduzido();
  const progresso = useProgresso(visto && !reduzido);
  // O HTML do servidor já traz o valor final; no cliente, a contagem parte
  // do zero e só anda quando a faixa entra na tela.
  const hidratado = useSyncExternalStore(assinarNada, () => true, () => false);
  const p = !hidratado || reduzido ? 1 : visto ? progresso : 0;

  return (
    <section aria-label={titulo} className="flex flex-col gap-5">
      <p className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">{titulo}</p>
      <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {itens.map((item) => (
          <Leitura key={item.rotulo} item={item} idioma={idioma} p={p} />
        ))}
      </dl>
    </section>
  );
}
