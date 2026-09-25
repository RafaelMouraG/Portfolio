# Portfólio — Rafael Ganascini de Moura

Portfólio pessoal em duas frentes que contam uma história só: dados/IA e desenvolvimento.

**Stack**: Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion. Sem CMS, sem banco: o conteúdo vive em arquivos TypeScript versionados.

**Tipografia**: Instrument Sans (interface, títulos e texto; o nome usa a largura condensada) · Instrument Serif (ênfase em itálico) · JetBrains Mono (rótulos e metadados) · Doto (números grandes, em matriz de pontos).

## Rodando

```bash
npm install
npm run dev
```

## Editando conteúdo

Todo o código fica em `src/` (`src/app`, `src/components`, `src/content`, `src/lib`); a raiz guarda só configuração e `public/`. O alias `@/` aponta para `src/`.

- `src/content/perfil.ts` — nome, posicionamento, sobre, links, stack e outros projetos. Em `posicionamentoRico`, `enfase: true` marca o trecho que sai em serifa itálica no cabeçalho (um por frase). `coordenadas` é a leitura de posição da barra do topo e do rodapé.
- `src/content/projetos.ts` — fonte única dos projetos. Adicionar um projeto é adicionar um objeto; card, filtro e página de case derivam dele. O build emite warning se qualquer filtro de área ficar com menos de 2 projetos.
- `src/content/perfil.en.ts` e `src/content/projetos.en.ts` — as versões em inglês, com o mesmo tipo dos originais: se a estrutura divergir, o compilador acusa. Ao editar um conteúdo, edite o par.

## Decisões que valem registro

- **Filtro por área com estado na URL**: `/?area=dev` e `/?area=dados` abrem a grade já filtrada no HTML — a home renderiza no servidor lendo `searchParams`, então um link filtrado enviado numa candidatura mostra a primeira tela certa, sem flash.
- **Escuro e um sinal só**: preto quente (`#0a0a09`), texto osso e um vermelho (`--signal`) reservado ao que está vivo: pacotes em movimento, o ponteiro da régua, o limiar que decide. Voltar ao monocromático é trocar `--signal` por `var(--foreground)` em `globals.css`.
- **Cada projeto é desenhado como o mecanismo que resolve**: `src/components/figuras/` tem uma animação SVG por slug (SMIL num laço comum, sem biblioteca), e o texto dela vem do campo `figura` do conteúdo. As figuras pausam fora da tela, têm botão de pausa e, sob `prefers-reduced-motion`, param no quadro que explica o mecanismo inteiro. Projeto novo sem desenho próprio cai numa figura genérica.
- **Números só do próprio case**: `numeros` e `medidas` em `projetos.ts` resumem o que o texto do case já diz; a stack liga cada ferramenta às figuras dos projetos que a usam, a partir do campo `stack` — sem nível de proficiência inventado.
- **A bio mora no cabeçalho**: não existe seção "sobre". Nome, posicionamento, atalhos, bio em serifa e os dois botões são um bloco só, e as seções numeradas começam nos projetos.
- **Acessibilidade como requisito**: o filtro é um radio group navegável por setas, o estado ativo nunca depende só de cor, a contagem de resultados é anunciada por `aria-live` e todas as animações são cortadas sob `prefers-reduced-motion`.
- **Versão em inglês por rota, não por toggle de estado**: `/en` e `/en/projects/[slug]` são páginas de verdade — indexáveis, com `hreflang` cruzado e `<html lang>` correto via dois route groups com layout raiz próprio. Um link `/en` enviado numa candidatura internacional abre direto no idioma certo, e o seletor PT/EN preserva o filtro ativo.
