# Portfólio — Rafael Ganascini de Moura

Portfólio pessoal em duas frentes que contam uma história só: dados/IA e desenvolvimento.

**Stack**: Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion. Sem CMS, sem banco: o conteúdo vive em arquivos TypeScript versionados.

**Tipografia**: Space Grotesk (interface e títulos) · Newsreader (prosa, em itálico) · JetBrains Mono (rótulos, números e metadados).

## Rodando

```bash
npm install
npm run dev
```

## Editando conteúdo

Todo o código fica em `src/` (`src/app`, `src/components`, `src/content`, `src/lib`); a raiz guarda só configuração e `public/`. O alias `@/` aponta para `src/`.

- `src/content/perfil.ts` — nome, posicionamento, sobre, links, stack e outros projetos. Em `posicionamentoRico`, `area` pinta o trecho com a cor da área e `enfase: true` marca o trecho que sai em serifa itálica no cabeçalho (um por frase). `techsPrincipais` alimenta a esteira que corre abaixo do cabeçalho — oito itens dão volta suficiente para o laço não parecer curto.
- `src/content/projetos.ts` — fonte única dos projetos. Adicionar um projeto é adicionar um objeto; card, filtro e página de case derivam dele. O build emite warning se qualquer filtro de área ficar com menos de 2 projetos.
- `src/content/perfil.en.ts` e `src/content/projetos.en.ts` — as versões em inglês, com o mesmo tipo dos originais: se a estrutura divergir, o compilador acusa. Ao editar um conteúdo, edite o par.

## Decisões que valem registro

- **Filtro por área com estado na URL**: `/?area=dev` e `/?area=dados` abrem a grade já filtrada no HTML — a home renderiza no servidor lendo `searchParams`, então um link filtrado enviado numa candidatura mostra a primeira tela certa, sem flash.
- **Escuro e só**: a paleta é preto quente (`#0b0b0a`), texto osso e um dourado. Não há tema claro — é uma escolha do design, não uma pendência, por isso `:root` já é o tema final e `color-scheme: dark` avisa o navegador.
- **Duas variáveis de cor com papéis separados**: `--gold` é fixo e é a cor da casa (numeral das seções, hover de link, seleção, ponto de disponibilidade). `--accent` é trocável por área e só é consumido por filtro, cards, tags e página de case — dados veste o dourado, dev veste o verde, "Todos" veste osso. É o que deixa o site colorir por área sem virar arco-íris.
- **A bio mora no cabeçalho**: não existe seção "sobre". Nome, posicionamento, atalhos, bio em serifa e os dois botões são um bloco só, e as seções numeradas começam nos projetos.
- **Acessibilidade como requisito**: o filtro é um radio group navegável por setas, o estado ativo nunca depende só de cor, a contagem de resultados é anunciada por `aria-live` e todas as animações são cortadas sob `prefers-reduced-motion`.
- **Versão em inglês por rota, não por toggle de estado**: `/en` e `/en/projects/[slug]` são páginas de verdade — indexáveis, com `hreflang` cruzado e `<html lang>` correto via dois route groups com layout raiz próprio. Um link `/en` enviado numa candidatura internacional abre direto no idioma certo, e o seletor PT/EN preserva o filtro ativo.
