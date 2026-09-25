"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { AreaFilter, type FiltroArea } from "./AreaFilter";
import { CabecalhoSecao } from "./CabecalhoSecao";
import { ProjectCard } from "./ProjectCard";

// Param inválido cai em "Todos" silenciosamente.
function filtroDaUrl(param: string | null): FiltroArea {
  return param === "dados" || param === "dev" ? param : "todos";
}

/*
 * Grade de projetos com o filtro de área no URL (?area=dev|dados). A
 * numeração das figuras vem da ordem do conteúdo, não da grade filtrada:
 * "fig. 03" é sempre o mesmo projeto, e a stack usa esses números.
 */
export function ProjectsSection({ idioma }: { idioma: Idioma }) {
  const router = useRouter();
  const pathname = usePathname();
  const filtro = filtroDaUrl(useSearchParams().get("area"));

  const destaques = useMemo(
    () => conteudo[idioma].projetos.filter((projeto) => projeto.destaque),
    [idioma],
  );
  const t = textos[idioma].projetos;

  const contagens = useMemo(
    () => ({
      todos: destaques.length,
      dados: destaques.filter((p) => p.areas.includes("dados")).length,
      dev: destaques.filter((p) => p.areas.includes("dev")).length,
    }),
    [destaques],
  );

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

  // Contagem ímpar deixaria o último card sozinho: o primeiro ocupa a linha.
  const primeiroLargo = visiveis.length % 2 === 1;

  return (
    <section id="projetos" data-regua={`01 ${t.titulo}`} aria-labelledby="projetos-titulo" className="flex flex-col gap-9">
      <CabecalhoSecao
        id="projetos-titulo"
        numero="01"
        titulo={t.titulo}
        meta={
          <p aria-live="polite" className="pb-1 font-mono text-[11.5px] text-faint">
            {visiveis.length} {visiveis.length === 1 ? t.umProjeto : t.variosProjetos}
          </p>
        }
      />

      <div>
        <AreaFilter valor={filtro} aoMudar={mudarFiltro} idioma={idioma} contagens={contagens} />
      </div>

      <MotionConfig reducedMotion="user">
        <motion.ul layout className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((projeto, indice) => {
              const largo = primeiroLargo && indice === 0;
              return (
                <motion.li
                  key={projeto.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className={largo ? "lg:col-span-2" : undefined}
                >
                  <ProjectCard
                    projeto={projeto}
                    idioma={idioma}
                    numero={destaques.indexOf(projeto) + 1}
                    largo={largo}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </MotionConfig>
    </section>
  );
}
