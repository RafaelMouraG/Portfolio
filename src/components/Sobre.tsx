import { conteudo, textos, type Idioma } from "@/lib/i18n";

/*
 * Bloco "Sobre", depois dos projetos: uma frase grande de título, dois
 * parágrafos curtos, a linha do tempo em três linhas, o prêmio em destaque,
 * a stack em etiquetas e os projetos menores numa lista discreta.
 */
export function Sobre({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="grid scroll-mt-6 gap-7 rounded-[22px] bg-panel p-6 sm:rounded-[28px] sm:p-10"
    >
      <h2
        id="sobre-titulo"
        className="max-w-[22ch] font-display text-[clamp(28px,2.8vw,40px)] leading-[1.08] font-light tracking-[-0.035em] text-balance"
      >
        {perfil.sobreTitulo}
      </h2>

      <div className="grid max-w-[62ch] gap-3 text-pretty text-ink-2">
        {perfil.sobre.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>

      <ol className="border-b border-line">
        {perfil.experiencia.map(({ local, papel, periodo }) => (
          <li
            key={local}
            className="grid gap-0.5 border-t border-line py-3.5 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-4"
          >
            <span className="font-mono text-xs text-ink-2">{periodo}</span>
            <span>
              <span className="font-medium">{local}</span>
              <span className="text-ink-2"> · {papel}</span>
            </span>
          </li>
        ))}
      </ol>

      {perfil.reconhecimentos.map(({ titulo, descricao, destaque, pendente }) => (
        <div key={titulo} className="flex items-baseline gap-3.5">
          {pendente ? (
            <span aria-hidden className="pulso size-2 shrink-0 self-center rounded-full bg-accent" />
          ) : (
            destaque && (
              <span className="font-display text-[56px] leading-none font-light tracking-[-0.04em] text-accent">
                {destaque}
              </span>
            )
          )}
          <p className="max-w-[40ch] text-ink-2">
            <strong className="font-medium text-ink">{titulo}</strong> {descricao}
          </p>
        </div>
      ))}

      <div className="grid gap-3">
        <h3 className="font-mono text-xs text-ink-2">{t.sobre.stack}</h3>
        <ul className="flex flex-wrap gap-2">
          {perfil.techsPrincipais.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3 py-1.5 text-[13.5px] text-ink-2"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {perfil.outrosProjetos.length > 0 && (
        <div className="grid gap-3">
          <h3 className="font-mono text-xs text-ink-2">{t.sobre.outros}</h3>
          <ul className="border-b border-line">
            {perfil.outrosProjetos.map(({ nome, descricao, link }) => (
              <li key={nome} className="border-t border-line">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-5 py-3.5"
                  >
                    <span>
                      <span className="font-medium">{nome}</span>
                      <span className="text-ink-2"> · {descricao}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-ink-2 transition-colors group-hover:text-accent">
                      {t.projetos.abrir}
                    </span>
                  </a>
                ) : (
                  <p className="py-3.5">
                    <span className="font-medium">{nome}</span>
                    <span className="text-ink-2"> · {descricao}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
