"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Projeto } from "@/content/projetos";
import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { AreaFilter, type FiltroArea } from "./AreaFilter";
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

  // Contagem ímpar deixaria o último card sozinho com meia linha vazia. Em vez
  // disso o primeiro (o mais forte, pela ordem do conteúdo) ocupa a largura
  // toda e os demais fecham a grade em pares.
  const primeiroLargo = visiveis.length % 2 === 1;

  return (
    // Só a variável --accent muda com o filtro; o resto da seção fica neutro.
    <section
      aria-labelledby="projetos-titulo"
      data-accent={filtro === "todos" ? undefined : filtro}
      className="flex flex-col gap-[22px]"
    >
      <SectionTitle
        id="projetos-titulo"
        numero="01"
        meta={
          // Ocupa o lugar do metadado da direita no cabeçalho do design
          <p aria-live="polite" className="font-mono text-xs text-faint">
            {visiveis.length} {visiveis.length === 1 ? t.umProjeto : t.variosProjetos}
          </p>
        }
      >
        {t.titulo}
      </SectionTitle>

      <AreaFilter
        valor={filtro}
        aoMudar={mudarFiltro}
        idioma={idioma}
        contagens={contagensEquilibradas}
      />

      {/* reducedMotion="user" corta deslize e re-layout sob prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <motion.ul layout className="grid gap-3.5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((projeto, indice) => {
              const largo = primeiroLargo && indice === 0;
              return (
                <motion.li
                  key={projeto.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className={largo ? "sm:col-span-2" : undefined}
                >
                  <ProjectCard projeto={projeto} idioma={idioma} largo={largo} indice={indice} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </MotionConfig>
    </section>
  );
}
