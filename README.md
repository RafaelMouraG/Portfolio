# Portfólio — Rafael Ganascini de Moura

Portfólio pessoal em duas frentes que contam uma história só: dados/IA e desenvolvimento.

**Stack**: Next.js (App Router) · TypeScript · Tailwind CSS. Sem CMS, sem banco: o conteúdo vive em arquivos TypeScript versionados.

**Tipografia**: Funnel Display (títulos e números grandes, quase sempre em peso leve) · Funnel Sans (texto e interface) · Geist Mono (etiquetas, legendas e rótulos dos diagramas).

## Rodando

```bash
npm install
npm run dev
```

## Editando conteúdo

Todo o código fica em `src/` (`src/app`, `src/components`, `src/content`, `src/lib`); a raiz guarda só configuração e `public/`. O alias `@/` aponta para `src/`.

- `src/content/perfil.ts`: nome, tese da coluna fixa (`tese.forte` em tinta cheia, `tese.suave` em cinza), status, bloco "Sobre", links, currículos, linha do tempo, prêmios e outros projetos. `techsPrincipais` vira as etiquetas de stack do "Sobre".
- `src/content/projetos.ts`: fonte única dos projetos. Adicionar um projeto é adicionar um objeto; painel, índice, filtro e página de case derivam dele. Cada projeto traz uma `linha` (a frase do card), a `metrica` de destaque (com `antes` opcional, que sai riscado), o `contexto` ("solo", "equipe de 6") e a `legenda` do diagrama. O diagrama em si mora em `components/DiagramaVivo.tsx`, um por slug; slug novo sem diagrama cai num genérico. O build emite warning se qualquer filtro de área ficar com menos de 2 projetos.
- `src/content/perfil.en.ts` e `src/content/projetos.en.ts` — as versões em inglês, com o mesmo tipo dos originais: se a estrutura divergir, o compilador acusa. Ao editar um conteúdo, edite o par.

## Decisões que valem registro

- **Diagramas vivos no lugar de capas**: cada projeto é mostrado funcionando, não descrito. Uma animação em traço fino mostra o mecanismo que o case explica (a notificação gravada antes do fanout, a folha que fica abaixo do limiar, o extrato conciliado, o evento repetido descartado, o nó-ponte da rede). As partículas usam SMIL, então rodam já no HTML do servidor, sem JS.
- **Coluna fixa e palco que rola**: a partir de `lg`, a tese, o filtro, o índice e os links ficam parados à esquerda enquanto os projetos passam à direita. O índice acompanha a rolagem com um IntersectionObserver. No celular a coluna vira cabeçalho e o índice some, porque os projetos já vêm logo abaixo.
- **Filtro por área com estado na URL**: `/?area=dev` e `/?area=dados` abrem a lista já filtrada no HTML, porque a home renderiza no servidor lendo `searchParams`. Um link filtrado enviado numa candidatura mostra a primeira tela certa, sem flash. A coluna fixa e a lista leem o mesmo parâmetro, então ficam em sincronia sem estado compartilhado.
- **Paleta névoa com um laranja só**: cinza frio claro, painéis quase brancos e tinta quase preta. O laranja é reservado ao que está vivo (partículas, o ponto de status, a métrica corrigida e o foco), nunca à decoração. O tema segue o sistema: claro por padrão e escuro sob `prefers-color-scheme`, com os componentes consumindo só os tokens de `globals.css`.
- **Métrica honesta à vista**: quando um número foi corrigido, o antigo aparece riscado ao lado do novo (98,5% → 74,6% no AtlasLeaf). A correção é parte da história.
- **Acessibilidade como requisito**: o filtro é um radio group navegável por setas, o estado ativo nunca depende só de cor, os diagramas são decorativos (`aria-hidden`, com a legenda em texto) e, sob `prefers-reduced-motion`, as animações CSS param num quadro que ainda conta a história e os SVGs são pausados.
- **Versão em inglês por rota, não por toggle de estado**: `/en` e `/en/projects/[slug]` são páginas de verdade, indexáveis, com `hreflang` cruzado e `<html lang>` correto via dois route groups com layout raiz próprio. Um link `/en` enviado numa candidatura internacional abre direto no idioma certo, e o seletor PT/EN preserva o filtro ativo.
