import type { Projeto } from "@/content/projetos";
import type { Idioma } from "@/lib/i18n";
import { Figura } from "./Figura";
import { FiguraAtlasLeaf, poseAtlasLeaf } from "./FiguraAtlasLeaf";
import { FiguraBiblioo, poseBiblioo } from "./FiguraBiblioo";
import { FiguraFieldFlow, poseFieldFlow } from "./FiguraFieldFlow";
import { FiguraGrafos, poseGrafos } from "./FiguraGrafos";
import { FiguraHortifruti, poseHortifruti } from "./FiguraHortifruti";
import { FiguraLlmBench, poseLlmBench } from "./FiguraLlmBench";

/*
 * Uma figura por slug. Projeto novo sem desenho próprio cai no genérico
 * (a moldura com a legenda), então adicionar projeto nunca quebra a home.
 */
const figuras: Record<string, { Desenho: (p: { idioma: Idioma }) => React.ReactNode; pose: number }> = {
  atlasleaf: { Desenho: FiguraAtlasLeaf, pose: poseAtlasLeaf },
  "llm-bench": { Desenho: FiguraLlmBench, pose: poseLlmBench },
  biblioo: { Desenho: FiguraBiblioo, pose: poseBiblioo },
  "hortifruti-santa-luzia": { Desenho: FiguraHortifruti, pose: poseHortifruti },
  fieldflow: { Desenho: FiguraFieldFlow, pose: poseFieldFlow },
  "biblioteca-de-grafos": { Desenho: FiguraGrafos, pose: poseGrafos },
};

function Generica() {
  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      <circle cx="240" cy="150" r="5" fill="var(--signal)" className="pulso" />
    </svg>
  );
}

export function FiguraDoProjeto({
  projeto,
  numero,
  idioma,
  compacta,
  controles,
}: {
  projeto: Projeto;
  numero: number;
  idioma: Idioma;
  compacta?: boolean;
  controles?: boolean;
}) {
  const figura = figuras[projeto.slug];
  return (
    <Figura
      numero={numero}
      titulo={projeto.figura.titulo}
      idioma={idioma}
      pose={figura?.pose ?? 0}
      compacta={compacta}
      controles={controles}
    >
      {figura ? <figura.Desenho idioma={idioma} /> : <Generica />}
    </Figura>
  );
}
