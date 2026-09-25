import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { Assinatura } from "./Assinatura";
import { CabecalhoSecao } from "./CabecalhoSecao";
import { EnvioEmail } from "./EnvioEmail";
import { HoraLocal } from "./HoraLocal";

/*
 * Fechamento: a frase grande (o miolo em serifa itálica), o e-mail como
 * manchete com o botão que "publica" o endereço, os currículos e o rodapé
 * com a leitura de posição. Por último, o primeiro nome em matriz de pontos,
 * enorme e apagado, que acende sob o cursor.
 */
export function Contato({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  const t = textos[idioma].contato;
  const primeiroNome = perfil.nome.split(" ")[0];

  return (
    <>
      <section
        id="contato"
        data-regua={`04 ${t.titulo}`}
        aria-labelledby="contato-titulo"
        className="flex flex-col gap-10"
      >
        <CabecalhoSecao id="contato-titulo" numero="04" titulo={t.titulo} />

        <p className="max-w-[20ch] text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance [font-stretch:85%]">
          {t.frase.inicio}
          <span className="font-serif font-normal tracking-[-0.02em] text-signal italic">{t.frase.destaque}</span>
          {t.frase.fim}
        </p>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] tracking-[0.08em] text-faint uppercase">↳ {t.escreva}</p>
          <EnvioEmail email={perfil.links.email} copiar={t.copiar} copiado={t.copiado} />
        </div>

        <p className="font-mono text-[12px] leading-[1.8] text-faint">
          {t.curriculos}{" "}
          {perfil.curriculos.map(({ rotulo, href }, i) => (
            <span key={href}>
              {i > 0 && <span aria-hidden className="text-dim"> · </span>}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline decoration-border-strong hover:text-signal hover:decoration-signal"
              >
                {rotulo}
              </a>
            </span>
          ))}
        </p>
      </section>

      <footer className="flex flex-col gap-2 pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-border-soft pt-6 font-mono text-[11.5px] leading-[1.6] text-faint">
          <span className="tabular-nums">
            {perfil.cidade} · {perfil.coordenadas}
            <HoraLocal locale={idioma === "pt" ? "pt-BR" : "en-GB"} />
          </span>
          <span>{t.feito}</span>
          <span className="flex gap-4">
            <a href={perfil.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              GitHub ↗
            </a>
            <a href={perfil.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              LinkedIn ↗
            </a>
          </span>
        </div>

        <Assinatura texto={primeiroNome.toUpperCase()} />
      </footer>
    </>
  );
}
