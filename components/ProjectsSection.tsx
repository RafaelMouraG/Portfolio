"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Projeto } from "@/content/projetos";
import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { AreaFilter, type FiltroArea } from "./AreaFilter";
import { AreaFundo } from "./AreaFundo";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./SectionTitle";

const destaquesPorIdioma: Record<Idioma, Projeto[]> = {
  pt: conteudo.pt.projetos.filter((projeto) => projeto.destaque),
  en: conteudo.en.projetos.filter((projeto) => projeto.destaque),
};

// Param inválido cai em "Todos" silenciosamente.
function filtroDaUrl(param: string | null): FiltroArea {
  return param === "dados" || param === "dev" ? param : "todos";
}

function contarPorFiltro(destaques: Projeto[]): Record<FiltroArea, number> {
  return {
    todos: destaques.length,
    dados: destaques.filter((p) => p.areas.includes("dados")).length,
    dev: destaques.filter((p) => p.areas.includes("dev")).length,
  };
}

export function ProjectsSection({ idioma }: { idioma: Idioma }) {
  const router = useRouter();
  const pathname = usePathname();
  const filtro = filtroDaUrl(useSearchParams().get("area"));

  const destaques = destaquesPorIdioma[idioma];
  const { outrosProjetos } = conteudo[idioma].perfil;
  const t = textos[idioma].projetos;

  // Contadores só aparecem se os lados forem equilibrados; um lado muito menor
  // que o outro enfraquece a tese e é melhor não quantificar.
  const contagens = contarPorFiltro(destaques);
  const contagensEquilibradas =
    Math.abs(contagens.dados - contagens.dev) <= 1 ? contagens : undefined;

  const mudarFiltro = useCallback(
    (proximo: FiltroArea) => {
      const url = proximo === "todos" ? pathname : `${pathname}?area=${proximo}`;
      router.replace(url, { scroll: false });
    },
    [router, pathname],
  );

  const visiveis = useMemo(
    () =>
      filtro === "todos"
        ? destaques
        : destaques.filter((projeto) => projeto.areas.includes(filtro)),
    [filtro, destaques],
  );

  return (
    // Só a variável --accent muda com o filtro; o resto da seção fica neutro.
    <section aria-labelledby="projetos-titulo" data-accent={filtro} className="py-12">
      {/* O fundo da página acompanha o filtro: verde em dev, amarelo em dados */}
      <AreaFundo area={filtro === "todos" ? undefined : filtro} />
      <SectionTitle id="projetos-titulo">{t.titulo}</SectionTitle>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <AreaFilter
          valor={filtro}
          aoMudar={mudarFiltro}
          idioma={idioma}
          contagens={contagensEquilibradas}
        />
        <p aria-live="polite" className="font-mono text-sm text-muted">
          {visiveis.length} {visiveis.length === 1 ? t.umProjeto : t.variosProjetos}
        </p>
      </div>

      {/* reducedMotion="user" corta deslize e re-layout sob prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((projeto, indice) => (
              <motion.li
                key={projeto.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
              >
                <ProjectCard projeto={projeto} indice={indice} idioma={idioma} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </MotionConfig>

      {outrosProjetos.length > 0 && (
        <div className="mt-12">
          <h3 className="flex items-center gap-3 font-mono text-sm text-muted">
            <span aria-hidden className="accent-transition font-semibold text-accent">
              {"//"}
            </span>
            {t.outros}
          </h3>
          <ul className="mt-4 space-y-3">
            {outrosProjetos.map(({ nome, descricao, link }) => (
              <li key={nome} className="max-w-2xl text-sm leading-relaxed">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-transition font-medium underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
                  >
                    {nome}
                  </a>
                ) : (
                  <span className="font-medium">{nome}</span>
                )}
                <span className="text-muted"> — {descricao}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
