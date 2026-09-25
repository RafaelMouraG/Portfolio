import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { CabecalhoSecao } from "./CabecalhoSecao";

/*
 * Trajetória: a linha do tempo à esquerda (a linha vertical se desenha com a
 * rolagem; o ponto do que é atual pulsa), e à direita os reconhecimentos e
 * os outros projetos, que no v3 eram seções soltas. Juntar encurta a home.
 */
export function Trajetoria({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].trajetoria;

  return (
    <section
      id="trajetoria"
      data-regua={`03 ${t.titulo}`}
      aria-labelledby="trajetoria-titulo"
      className="flex flex-col gap-10"
    >
      <CabecalhoSecao id="trajetoria-titulo" numero="03" titulo={t.titulo} />

      <div className="grid gap-14 lg:grid-cols-12">
        <ol className="relative flex flex-col gap-10 lg:col-span-7">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border">
            <span className="desenhar-y absolute inset-0 bg-border-strong" />
          </span>
          {perfil.experiencia.map(({ local, papel, periodo, descricao, stack }) => {
            const atual = periodo === "atual" || periodo === "now";
            return (
              <li key={local} className="relative grid gap-1.5 pl-10">
                <span aria-hidden className="absolute top-[7px] left-0 grid size-[15px] place-items-center rounded-full border border-border-strong bg-background">
                  <span className={`size-[5px] rounded-full ${atual ? "bg-signal" : "bg-muted"}`} />
                  {atual && <span className="onda absolute size-[15px] rounded-full border border-signal" />}
                </span>
                <p className={`font-mono text-[11px] tracking-[0.06em] uppercase ${atual ? "text-signal" : "text-faint"}`}>
                  {atual ? t.atual : periodo}
                </p>
                <h3 className="text-[22px] leading-[1.15] font-semibold tracking-[-0.02em]">{local}</h3>
                <p className="text-[14.5px] text-muted">{papel}</p>
                <p className="max-w-[58ch] text-[16px] leading-[1.6] text-prose">{descricao}</p>
                {stack && (
                  <p className="pt-1 font-mono text-[11px] text-faint">{stack.join(" · ")}</p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-10 lg:col-span-5">
          {perfil.reconhecimentos.length > 0 && (
            <div className="moldura-figura relative rounded-[12px] border border-border p-6">
              <h3 className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">{t.reconhecimentos}</h3>
              <ul className="mt-4 flex flex-col gap-5">
                {perfil.reconhecimentos.map(({ titulo, descricao }) => {
                  // "Melhor trabalho da turma · 3×": o multiplicador vira a leitura grande
                  const [, frase, vezes] = titulo.match(/^(.*?)\s*·\s*(\d+×)$/) ?? [null, titulo, null];
                  return (
                    <li key={titulo} className="flex flex-col gap-2">
                      {vezes && (
                        <span className="font-leitura text-[76px] leading-[0.9] font-bold text-signal">{vezes}</span>
                      )}
                      <span className="text-[19px] font-semibold tracking-[-0.015em]">{frase}</span>
                      <span className="text-[14.5px] leading-[1.55] text-muted">{descricao}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {perfil.outrosProjetos.length > 0 && (
            <div className="flex flex-col">
              <h3 className="border-b border-border-strong pb-2.5 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                {t.outros}
              </h3>
              <ul>
                {perfil.outrosProjetos.map(({ nome, descricao, link }) => (
                  <li key={nome} className="flex flex-col gap-1 border-b border-border-soft py-3.5">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transicao group inline-flex items-baseline gap-1.5 text-[16px] font-medium no-underline hover:text-signal"
                      >
                        {nome}
                        <span aria-hidden className="font-mono text-[12px] text-faint group-hover:text-signal">↗</span>
                      </a>
                    ) : (
                      <span className="text-[16px] font-medium">{nome}</span>
                    )}
                    <span className="text-[14px] leading-[1.55] text-muted">{descricao}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
