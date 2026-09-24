"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { caminhoDoCase, conteudo, textos, type Idioma } from "@/lib/i18n";
import { filtroDaUrl, numeroDoProjeto } from "@/lib/filtro";
import { Metrica } from "./Metrica";
import { Tela } from "./Tela";

/*
 * Os projetos em destaque, um painel por projeto: a tela com o diagrama vivo
 * em cima e, embaixo, título, uma frase e o número de destaque. O painel
 * inteiro é o link para o case; "Ler o case" é só a pista visual.
 *
 * O filtro vem da URL. A home lê searchParams no servidor, então /?area=dev
 * já chega filtrado no HTML, sem flash.
 */
export function ListaProjetos({ idioma }: { idioma: Idioma }) {
  const filtro = filtroDaUrl(useSearchParams().get("area"));
  const t = textos[idioma].projetos;
  const projetos = conteudo[idioma].projetos.filter((p) => p.destaque);

  return (
    <section aria-labelledby="projetos-titulo">
      <h2 id="projetos-titulo" className="sr-only">
        {t.titulo}
      </h2>
      <ul className="grid gap-4 lg:gap-6">
        {projetos.map((projeto, indice) => {
          const visivel = filtro === "todos" || projeto.areas.includes(filtro);
          return (
            <li key={projeto.slug} id={projeto.slug} hidden={!visivel} className="scroll-mt-6">
              <Link
                href={caminhoDoCase(idioma, projeto.slug)}
                className="group grid gap-[18px] rounded-[22px] bg-panel p-3.5 sm:rounded-[28px] sm:p-5"
              >
                <Tela projeto={projeto} numero={numeroDoProjeto(indice)} idioma={idioma} />
                <div className="grid gap-x-6 gap-y-3 px-2 pb-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    <h3 className="font-display text-[clamp(26px,2.4vw,34px)] leading-[1.05] font-medium tracking-[-0.03em]">
                      {projeto.titulo}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] text-pretty text-ink-2">{projeto.linha}</p>
                  </div>
                  <Metrica
                    metrica={projeto.metrica}
                    idioma={idioma}
                    className="sm:justify-items-end sm:text-right"
                  />
                  <span className="col-span-full mt-1 inline-flex w-fit items-center gap-2 border-b border-line pb-0.5 text-sm transition-colors group-hover:border-accent">
                    {t.lerCase}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-[3px] motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
