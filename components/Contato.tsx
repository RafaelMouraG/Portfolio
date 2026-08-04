import { perfil } from "@/content/perfil";
import { SectionTitle } from "./SectionTitle";

export function Contato() {
  return (
    <section aria-labelledby="contato-titulo" className="py-12 pb-10">
      <SectionTitle id="contato-titulo">contato</SectionTitle>
      <p className="mt-6">
        {/* O e-mail carrega o gradiente-assinatura: amarelo → azul → verde */}
        <a
          href={`mailto:${perfil.links.email}`}
          className="texto-gradiente font-display text-2xl font-semibold tracking-tight break-all underline decoration-transparent underline-offset-8 transition-[text-decoration-color] duration-300 hover:decoration-accent sm:text-3xl"
        >
          {perfil.links.email}
        </a>
      </p>
      <p className="mt-4 max-w-2xl text-muted">
        Respondo rápido. O currículo em PDF está em três versões:{" "}
        {perfil.curriculos.map(({ rotulo, href }, i) => (
          <span key={href}>
            {i > 0 && " · "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="accent-transition underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              {rotulo}
            </a>
          </span>
        ))}
        .
      </p>

      <footer className="mt-16 flex flex-wrap items-center gap-3 border-t border-border pt-6 pb-8 font-mono text-xs text-muted">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-accent-dados" />
          <span className="size-2 rounded-full bg-accent-neutral" />
          <span className="size-2 rounded-full bg-accent-dev" />
        </span>
        <span>
          feito por mim, em Next.js —{" "}
          <a
            href={perfil.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-transition underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            o código está no GitHub
          </a>
        </span>
      </footer>
    </section>
  );
}
