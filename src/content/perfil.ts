import type { Area } from './projetos'

// A mesma forma vale para os dois idiomas: perfil.ts (pt) e perfil.en.ts
// declaram este tipo, e o compilador acusa se as estruturas divergirem.
export type Perfil = {
  nome: string
  posicionamento: string
  // `enfase` marca o trecho que ganha a serifa em itálico no Hero — o gesto
  // que o design usa para dar voz a uma parte da linha. Só um trecho por frase.
  posicionamentoRico: Array<{ texto: string; area?: Area; enfase?: boolean }>
  disponibilidade: string
  cidade: string
  // Leitura de posição na barra do topo e no rodapé, no tom de instrumento.
  coordenadas: string
  formacaoCurta: string
  idiomasResumo: string
  sobre: string[]
  techsPrincipais: string[]
  links: { github: string; linkedin: string; email: string }
  curriculos: Array<{ rotulo: string; href: string; principal: boolean }>
  // Linha do tempo curta: onde está + projetos com cliente real + formação.
  // Sem datas inventadas — o período é "atual", "projeto" ou a conclusão.
  experiencia: Array<{
    local: string
    papel: string
    periodo: string
    descricao: string
    stack?: string[]
  }>
  // Prêmios acadêmicos (Trabalhos Interdisciplinares). `pendente` marca o que
  // ainda está em disputa — renderiza com o ponto pulsante, não com o ✦.
  reconhecimentos: Array<{ titulo: string; descricao: string; pendente?: boolean }>
  stack: Array<{ grupo: string; area?: Area; itens: string[] }>
  outrosProjetos: Array<{ nome: string; descricao: string; link: string }>
}

export const perfil: Perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend em Java e Python, com base em dados e visão computacional',

  // Mesma frase, segmentada para o Hero pintar cada metade com a cor da
  // sua área (dev = verde, dados = dourado). Manter em sincronia com
  // `posicionamento`, que segue sendo a fonte para metadados/OG.
  posicionamentoRico: [
    { texto: 'Backend em Java e Python', area: 'dev' as const },
    { texto: ', com base em ' },
    { texto: 'dados e visão computacional', area: 'dados' as const, enfase: true },
  ],

  // Selo de status no topo do Hero. Curto: é uma etiqueta em mono,
  // não uma frase. Mostra onde está, sem pedir vaga.
  disponibilidade: 'estagiário na Business Tec · Java + PrimeFaces',

  cidade: 'Belo Horizonte',
  coordenadas: '19,92° S · 43,94° O',
  formacaoCurta: 'Eng. de Software · PUC Minas · Conclusão no fim de 2027',
  idiomasResumo: 'PT nativo · EN avançado',

  // Bio do cabeçalho, em serifa. [0] é o lead sempre visível (2-3 linhas);
  // o resto fica dentro do <details> "mais sobre mim".
  sobre: [
    'Sou estudante de Engenharia de Software na PUC Minas e estagiário na Business Tec. Trabalho com Java e PrimeFaces, atuando tanto no back quanto no front.',
    'Fora do trabalho, sigo em backend com Java e Python: mensageria assíncrona, integrações com APIs e fluxos que continuam de pé quando uma peça falha. Em dados e visão computacional, me interessa mais medir certo do que treinar mais — no caminho, três trabalhos foram eleitos melhor da turma.',
  ],

  // Alimenta a esteira que corre abaixo do cabeçalho. Oito itens dão volta
  // suficiente para o laço não parecer curto.
  techsPrincipais: [
    'Java',
    'Spring Boot',
    'Python',
    'FastAPI',
    'PyTorch',
    'RabbitMQ',
    'PostgreSQL',
    'Docker',
  ],

  links: {
    github: 'https://github.com/RafaelMouraG',
    linkedin: 'https://www.linkedin.com/in/rafael-ganascini-de-moura-719107271',
    email: 'rafaelganascinidemoura@gmail.com',
  },

  // Três versões do currículo, todas em public/ com exatamente esses nomes.
  // A principal vira o CTA do Hero; o fechamento lista as três.
  curriculos: [
    { rotulo: 'Dev · PT-BR', href: '/cv-dev-ptbr.pdf', principal: true },
    { rotulo: 'Dev · EN', href: '/cv-dev-en.pdf', principal: false },
    { rotulo: 'Dados · PT-BR', href: '/cv-dados-ptbr.pdf', principal: false },
  ],

  experiencia: [
    {
      local: 'Business Tec',
      papel: 'Estagiário · Java + PrimeFaces',
      periodo: 'atual',
      descricao: 'Back e front no dia a dia.',
      stack: ['Java', 'PrimeFaces'],
    },
    {
      local: 'Hortifruti Santa Luzia',
      papel: 'Backend · Trabalhos Interdisciplinares com cliente real, equipe de 6',
      periodo: 'projeto',
      descricao:
        'Camada de comunicação e integrações: boleto, conciliação bancária e nota fiscal.',
      stack: ['Spring Boot', 'MySQL', 'API Sicoob', 'Focus NFe'],
    },
    {
      local: 'PUC Minas',
      papel: 'Engenharia de Software',
      periodo: 'fev 2024 — dez 2027',
      descricao: 'Graduação em andamento — base dos projetos com cliente real.',
    },
  ],

  reconhecimentos: [
    {
      titulo: 'Melhor trabalho da turma · 3×',
      descricao:
        'Biblioo, Ávila Lótus e FeedbackFusion — Trabalhos Interdisciplinares.',
    },
  ],

  // Agrupada por função, não em nuvem de logos.
  // REGRA: só permanece o que aguenta sabatina em entrevista.
  // `area` colore o marcador do grupo (dev = verde, dados = dourado);
  // sem área, o grupo usa o osso neutro.
  stack: [
    {
      grupo: 'Linguagens',
      itens: ['Java', 'Python', 'TypeScript', 'Dart'],
    },
    {
      grupo: 'Backend',
      area: 'dev' as const,
      itens: [
        'Spring Boot',
        'Spring Security',
        'FastAPI',
        'REST',
        'Arquitetura hexagonal',
        'Clean Architecture',
        'JWT e OAuth',
      ],
    },
    {
      grupo: 'Mensageria e dados',
      area: 'dev' as const,
      itens: ['RabbitMQ', 'Redis', 'MySQL', 'PostgreSQL', 'OpenSearch'],
      // Neo4j existe no Biblioo, mas não foi sua frente de trabalho.
      // Só inclua se você conseguir explicar por que o projeto o usa.
    },
    {
      grupo: 'Dados e IA',
      area: 'dados' as const,
      itens: [
        'PyTorch',
        'Transfer learning',
        'ONNX',
        'Protocolo de avaliação',
        'Análise de redes',
        'Function calling',
        'Power BI',
        'Excel',
      ],
    },
    {
      grupo: 'Infra e qualidade',
      itens: [
        'Docker',
        'GitHub Actions',
        'Cloud Run',
        'Railway',
        'Vercel',
        'k6',
        'Prometheus e Grafana',
        'pytest',
      ],
    },
  ],

  // Lista compacta no fim da página. Só nome, uma linha e link.
  // Sem card, sem página de case.
  outrosProjetos: [
    {
      nome: 'Ávila Lótus',
      descricao:
        'Agendamento e anamnese para uma massoterapeuta, com relatório financeiro. Primeiro cliente real, 26 requisitos funcionais.',
      link: 'https://avila-lotus.onrender.com/', // CONFERIR se ainda responde
    },
    {
      nome: 'FeedbackFusion',
      descricao:
        'Plataforma corporativa de feedback com gamificação. Segundo Trabalho Interdisciplinar do curso.',
      link: '', // PREENCHER ou remover o item — enquanto vazio, aparece sem link
    },
  ],
}
