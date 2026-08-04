import { perfil } from "@/content/perfil";

export function StackSection() {
  return (
    <section aria-labelledby="stack-titulo" className="py-12">
      <h2 id="stack-titulo" className="font-mono text-sm text-muted">
        stack
      </h2>
      <dl className="mt-6 space-y-5">
        {perfil.stack.map(({ grupo, itens }) => (
          <div key={grupo} className="sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4">
            <dt className="font-medium">{grupo}</dt>
            <dd className="mt-1 font-mono text-sm text-muted sm:mt-1">
              {itens.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
