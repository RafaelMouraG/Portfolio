import type { Area } from "@/content/projetos";
import { textos, type Idioma } from "@/lib/i18n";

/*
 * Etiqueta de área em mono minúsculo, como todo metadado no design. Só o
 * texto: com a paleta neutra, um marcador colorido não teria o que dizer.
 * O data-accent fica como gancho para o dia em que a cor por área voltar.
 */
export function AreaTag({ area, idioma }: { area: Area; idioma: Idioma }) {
  return (
    <span
      data-accent={area}
      className="inline-flex items-center font-mono text-[10.5px] tracking-[0.06em] text-accent"
    >
      {textos[idioma].areas[area]}
    </span>
  );
}
