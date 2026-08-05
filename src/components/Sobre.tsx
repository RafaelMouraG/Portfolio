import { conteudo, textos, type Idioma } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

export function Sobre({ idioma }: { idioma: Idioma }) {
  const { perfil } = conteudo[idioma];
  return (
    <section aria-labelledby="sobre-titulo" className="py-12">
      <SectionTitle id="sobre-titulo">{textos[idioma].sobre}</SectionTitle>
      <div className="relative mt-6 max-w-2xl pl-5 sm:pl-6">
        {/* Barra amarelo → verde: as duas áreas costurando o texto */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-gradient-to-b from-accent-dados to-accent-dev"
        />
        <div className="space-y-3 text-lg leading-relaxed">
          {perfil.sobre.map((linha) => (
            <p key={linha}>{linha}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
