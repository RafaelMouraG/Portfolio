import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CabecalhoSecao } from "./CabecalhoSecao";

// "Java" casa com "Java 25", "Spring Boot" com "Spring Boot 4", mas "Java"
// não casa com "JavaScript": depois do nome só pode vir fim, espaço ou versão.
function usa(itemDaStack: string, ferramenta: string) {
  const a = itemDaStack.toLowerCase();
  const b = ferramenta.toLowerCase();
  return a === b || (a.startsWith(b) && /^[\s\d.]/.test(a.slice(b.length)));
}

/*
 * A stack como folha de especificação: grupos por função, e ao lado de cada
 * ferramenta os números das figuras dos projetos que a usam de fato. A
 * ligação sai do próprio conteúdo (o campo `stack` de cada projeto), então
 * não há nível de proficiência inventado — só onde a ferramenta aparece.
 */
export function StackSection({ idioma }: { idioma: Idioma }) {
  const { perfil, projetos } = conteudo[idioma];
  const t = textos[idioma].stack;
  const total = perfil.stack.reduce((soma, { itens }) => soma + itens.length, 0);
  const destaques = projetos.filter((p) => p.destaque);

  return (
    <section id="stack" data-regua={`02 ${t.titulo}`} aria-labelledby="stack-titulo" className="flex flex-col gap-9">
      <CabecalhoSecao
        id="stack-titulo"
        numero="02"
        titulo={t.titulo}
        meta={<p className="pb-1 font-mono text-[11.5px] text-faint">{total}</p>}
      />

      <div className="gap-x-10 sm:columns-2 lg:columns-3">
        {perfil.stack.map(({ grupo, itens }) => (
          <div key={grupo} className="mb-10 flex break-inside-avoid flex-col">
            <h3 className="flex items-baseline justify-between border-b border-border-strong pb-2.5 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
              {grupo}
              <span className="text-faint">{String(itens.length).padStart(2, "0")}</span>
            </h3>
            <ul>
              {itens.map((item) => {
                const usos = destaques
                  .map((p, i) => ({ projeto: p, numero: i + 1 }))
                  .filter(({ projeto }) => projeto.stack.some((s) => usa(s, item)));
                return (
                  <li
                    key={item}
                    className="group flex items-baseline justify-between gap-3 border-b border-border-soft py-2"
                  >
                    <span className="text-[15px] tracking-[-0.005em] text-prose transition-colors group-hover:text-foreground">
                      {item}
                    </span>
                    {usos.length > 0 && (
                      <span className="flex shrink-0 gap-1.5 font-mono text-[10.5px] tabular-nums">
                        <span className="sr-only">
                          {t.usadoEm} {usos.map(({ projeto }) => projeto.titulo).join(", ")}
                        </span>
                        {usos.map(({ projeto, numero }) => (
                          <span
                            key={projeto.slug}
                            aria-hidden
                            title={projeto.titulo}
                            className="rounded-[3px] border border-signal/40 px-1 text-signal"
                          >
                            {String(numero).padStart(2, "0")}
                          </span>
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="flex items-center gap-2 font-mono text-[11px] text-faint">
        <span aria-hidden className="rounded-[3px] border border-signal/40 px-1 text-[10.5px] text-signal">03</span>
        {t.legenda}
      </p>
    </section>
  );
}
