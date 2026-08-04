# Portfólio — Rafael Ganascini de Moura

Portfólio pessoal em duas frentes que contam uma história só: dados/IA e desenvolvimento.

**Stack**: Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion. Sem CMS, sem banco: o conteúdo vive em arquivos TypeScript versionados.

## Rodando

```bash
npm install
npm run dev
```

## Editando conteúdo

- `content/perfil.ts` — nome, posicionamento, sobre, links, stack e outros projetos.
- `content/projetos.ts` — fonte única dos projetos. Adicionar um projeto é adicionar um objeto; card, filtro e página de case derivam dele. O build emite warning se qualquer filtro de área ficar com menos de 2 projetos.
- `content/perfil.en.ts` e `content/projetos.en.ts` — as versões em inglês, com o mesmo tipo dos originais: se a estrutura divergir, o compilador acusa. Ao editar um conteúdo, edite o par.

## Decisões que valem registro

- **Filtro por área com estado na URL**: `/?area=dev` e `/?area=dados` abrem a grade já filtrada no HTML — a home renderiza no servidor lendo `searchParams`, então um link filtrado enviado numa candidatura mostra a primeira tela certa, sem flash.
- **Um accent só**: a cor de destaque é uma única variável CSS (`--accent`) que muda com o filtro selecionado. Texto, fundo e bordas ficam neutros.
- **Acessibilidade como requisito**: o filtro é um radio group navegável por setas, o estado ativo nunca depende só de cor, a contagem de resultados é anunciada por `aria-live` e todas as animações são cortadas sob `prefers-reduced-motion`.
- **Versão em inglês por rota, não por toggle de estado**: `/en` e `/en/projects/[slug]` são páginas de verdade — indexáveis, com `hreflang` cruzado e `<html lang>` correto via dois route groups com layout raiz próprio. Um link `/en` enviado numa candidatura internacional abre direto no idioma certo, e o seletor PT/EN preserva o filtro ativo.
