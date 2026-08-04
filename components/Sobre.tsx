import { perfil } from "@/content/perfil";

export function Sobre() {
  return (
    <section aria-labelledby="sobre-titulo" className="py-12">
      <h2 id="sobre-titulo" className="font-mono text-sm text-muted">
        sobre
      </h2>
      <div className="mt-4 max-w-2xl space-y-3 text-lg leading-relaxed">
        {perfil.sobre.map((linha) => (
          <p key={linha}>{linha}</p>
        ))}
      </div>
    </section>
  );
}
