import { perfil } from "@/content/perfil";

const contatos = [
  { label: "GitHub", href: perfil.links.github, externo: true },
  { label: "LinkedIn", href: perfil.links.linkedin, externo: true },
  { label: "E-mail", href: `mailto:${perfil.links.email}`, externo: false },
  { label: "Currículo (PDF)", href: perfil.links.cv, externo: true },
  // Link com URL vazia no perfil (ex.: LinkedIn ainda não preenchido) não aparece
].filter(({ href }) => href && href !== "mailto:");

export function Hero() {
  return (
    <header className="pt-20 pb-16 sm:pt-28">
      <p className="font-mono text-sm text-muted">{perfil.nome}</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {perfil.posicionamento}
      </h1>
      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-muted">
        {perfil.techsPrincipais.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <nav aria-label="Contato e currículo" className="mt-10">
        <ul className="flex flex-wrap gap-3">
          {contatos.map(({ label, href, externo }) => (
            <li key={label}>
              <a
                href={href}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="accent-transition inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
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
