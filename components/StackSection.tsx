import { perfil } from "@/content/perfil";
import { SectionTitle } from "./SectionTitle";

export function StackSection() {
  return (
    <section aria-labelledby="stack-titulo" className="py-12">
      <SectionTitle id="stack-titulo">stack</SectionTitle>
      <dl className="mt-6 space-y-6">
        {perfil.stack.map(({ grupo, itens, ...resto }) => (
          <div
            key={grupo}
            // Grupo de dev fica verde, de dados fica amarelo, o resto azul
            data-accent={"area" in resto ? resto.area : undefined}
            className="sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4"
          >
            <dt className="flex items-center gap-2 font-medium">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
              {grupo}
            </dt>
            <dd className="mt-2 sm:mt-0">
              <ul className="flex flex-wrap gap-1.5">
                {itens.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
