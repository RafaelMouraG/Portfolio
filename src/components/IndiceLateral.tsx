"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { filtroDaUrl, numeroDoProjeto, ordemFiltros, type FiltroArea } from "@/lib/filtro";

/*
 * Filtro por área e índice da coluna fixa.
 *
 * O filtro segue o padrão WAI-ARIA de radio group: Tab entra e sai do grupo,
 * setas movem a seleção, e o ativo é marcado por preenchimento, não só cor.
 * O estado vai para a URL com router.replace, e a lista de projetos, que lê
 * o mesmo parâmetro, se filtra sozinha.
 *
 * O índice acompanha a rolagem: um IntersectionObserver olha uma faixa fina
 * perto do meio da tela e marca com aria-current o bloco que passa por ela.
 * O item ativo desliza 8px e o número acende em laranja. Some no celular,
 * onde a coluna vira cabeçalho e os projetos vêm logo abaixo.
 */
export function IndiceLateral({ idioma }: { idioma: Idioma }) {
  const router = useRouter();
  const pathname = usePathname();
  const filtro = filtroDaUrl(useSearchParams().get("area"));
  const t = textos[idioma];
  const botoes = useRef<Map<FiltroArea, HTMLButtonElement | null>>(new Map());

  const projetos = conteudo[idioma].projetos.filter((p) => p.destaque);
  const itens = [
    ...projetos.map((p, i) => ({
      id: p.slug,
      numero: numeroDoProjeto(i),
      nome: p.nomeCurto ?? p.titulo,
      area: t.areas[p.areas[0]].split(" ")[0],
      visivel: filtro === "todos" || p.areas.includes(filtro),
    })),
    { id: "sobre", numero: numeroDoProjeto(projetos.length), nome: t.painel.sobre, area: "", visivel: true },
    { id: "contato", numero: numeroDoProjeto(projetos.length + 1), nome: t.painel.contato, area: "", visivel: true },
  ];

  const [ativo, setAtivo] = useState(itens[0].id);
  const ids = itens.map(({ id }) => id).join(",");

  useEffect(() => {
    const alvos = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) if (entrada.isIntersecting) setAtivo(entrada.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, [ids]);

  const mudarFiltro = useCallback(
    (proximo: FiltroArea, focar = false) => {
      router.replace(proximo === "todos" ? pathname : `${pathname}?area=${proximo}`, {
        scroll: false,
      });
      if (focar) botoes.current.get(proximo)?.focus();
    },
    [router, pathname],
  );

  function aoTeclar(evento: React.KeyboardEvent) {
    const atual = ordemFiltros.indexOf(filtro);
    const total = ordemFiltros.length;
    const destinos: Record<string, number> = {
      ArrowRight: (atual + 1) % total,
      ArrowDown: (atual + 1) % total,
      ArrowLeft: (atual - 1 + total) % total,
      ArrowUp: (atual - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (evento.key in destinos) {
      evento.preventDefault();
      mudarFiltro(ordemFiltros[destinos[evento.key]], true);
    }
  }

  return (
    <nav aria-label={t.painel.ariaIndice}>
      <div
        role="radiogroup"
        aria-label={t.filtro.aria}
        onKeyDown={aoTeclar}
        className="mb-3.5 flex flex-wrap gap-1"
      >
        {ordemFiltros.map((opcao) => {
          const marcado = opcao === filtro;
          return (
            <button
              key={opcao}
              type="button"
              role="radio"
              aria-checked={marcado}
              tabIndex={marcado ? 0 : -1}
              ref={(el) => {
                botoes.current.set(opcao, el);
              }}
              onClick={() => mudarFiltro(opcao)}
              className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                marcado
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
              }`}
            >
              {t.filtro.rotulos[opcao]}
            </button>
          );
        })}
      </div>

      <ol className="hidden lg:block">
        {itens.map(({ id, numero, nome, area, visivel }) => (
          <li key={id} hidden={!visivel}>
            <a
              href={`#${id}`}
              aria-current={ativo === id ? "true" : undefined}
              className="group grid grid-cols-[28px_1fr_auto] items-baseline gap-2.5 py-[7px] text-ink-2 transition-colors hover:text-ink aria-[current=true]:text-ink"
            >
              <span className="font-mono text-xs group-aria-[current=true]:text-accent">{numero}</span>
              <span className="font-display text-[19px] tracking-[-0.015em] transition-transform duration-300 group-aria-[current=true]:translate-x-2 motion-reduce:transition-none">
                {nome}
              </span>
              <span className="font-mono text-xs">{area}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
