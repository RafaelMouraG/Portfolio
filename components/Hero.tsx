import { perfil } from "@/content/perfil";

// O Hero mostra só o currículo principal; as três versões ficam no Contato.
const cvPrincipal =
  perfil.curriculos.find(({ principal }) => principal) ?? perfil.curriculos[0];

const contatos = [
  { label: "Currículo (PDF)", href: cvPrincipal?.href, externo: true, primario: true },
  { label: "GitHub", href: perfil.links.github, externo: true, primario: false },
  { label: "LinkedIn", href: perfil.links.linkedin, externo: true, primario: false },
  { label: "E-mail", href: `mailto:${perfil.links.email}`, externo: false, primario: false },
  // Link com URL vazia no perfil (ex.: LinkedIn ainda não preenchido) não aparece
].filter(({ href }) => href && href !== "mailto:");

export function Hero() {
  return (
    <header className="pt-16 pb-16 sm:pt-24">
      <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
        <span aria-hidden className="relative flex size-2">
          <span className="pulso-disponivel absolute inline-flex size-full rounded-full bg-accent" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        {perfil.disponibilidade}
      </p>

      <p className="mt-8 font-mono text-sm text-muted">{perfil.nome}</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {/* Cada metade da tese na cor da sua área: verde para dev, amarelo para dados */}
        {perfil.posicionamentoRico.map(({ texto, area }) =>
          area ? (
            <span key={texto} data-accent={area} className="text-accent">
              {texto}
            </span>
          ) : (
            <span key={texto}>{texto}</span>
          ),
        )}
      </h1>

      <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm text-muted">
        {perfil.techsPrincipais.map((tech, i) => (
          <li key={tech} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden className="text-accent/60">
                ·
              </span>
            )}
            {tech}
          </li>
        ))}
      </ul>

      <nav aria-label="Contato e currículo" className="mt-10">
        <ul className="flex flex-wrap gap-3">
          {contatos.map(({ label, href, externo, primario }) => (
            <li key={label}>
              <a
                href={href}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={
                  primario
                    ? "accent-transition inline-flex items-center rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-background hover:bg-accent/85"
                    : "accent-transition inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
