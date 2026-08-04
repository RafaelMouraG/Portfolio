import { perfil } from "@/content/perfil";

export function Contato() {
  return (
    <section aria-labelledby="contato-titulo" className="py-12 pb-24">
      <h2 id="contato-titulo" className="font-mono text-sm text-muted">
        contato
      </h2>
      <p className="mt-4">
        <a
          href={`mailto:${perfil.links.email}`}
          className="accent-transition font-display text-2xl font-semibold tracking-tight break-all hover:text-accent sm:text-3xl"
        >
          {perfil.links.email}
        </a>
      </p>
      <p className="mt-3 max-w-2xl text-muted">
        Respondo rápido. O currículo em PDF está{" "}
        <a
          href={perfil.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="accent-transition underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
        >
          aqui
        </a>
        .
      </p>
    </section>
  );
}
