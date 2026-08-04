export const perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend e integração entre sistemas, com trabalho paralelo em dados e visão computacional',
  // Alternativas:
  // 'Backend, mensageria e engenharia de dados'
  // 'Desenvolvimento backend e projetos em dados'

  // Mesma frase, segmentada para o Hero pintar cada metade com a cor da
  // sua área (dev = esmeralda, dados = amarelo). Manter em sincronia com
  // `posicionamento`, que segue sendo a fonte para metadados/OG.
  posicionamentoRico: [
    { texto: 'Backend e integração entre sistemas', area: 'dev' as const },
    { texto: ', com trabalho paralelo em ' },
    { texto: 'dados e visão computacional', area: 'dados' as const },
  ],

  // Selo de disponibilidade no topo do Hero.
  disponibilidade: 'disponível para primeira vaga — backend ou dados',

  // Seção Sobre. Tom sóbrio, sem narrativa pessoal e sem autoelogio.
  sobre: [
    'Estudante de Engenharia de Software na PUC Minas, em Belo Horizonte. Formação prevista para o fim de 2027; inglês avançado.',
    'Atuo principalmente no backend, com Java e Python. Meu trabalho tem se concentrado na comunicação entre sistemas: mensageria assíncrona, integração com serviços externos e as garantias necessárias para que um fluxo não se perca quando alguma dessas partes falha. Parte relevante dessa experiência vem de projetos em equipe com clientes reais, do levantamento de requisitos à entrega.',
    'Em paralelo, desenvolvo projetos em dados e visão computacional, com atenção particular ao protocolo de avaliação e ao que uma métrica realmente mede.',
    'Busco uma posição em backend ou em engenharia de dados, áreas em que essas duas frentes se aproximam.',
  ],

  // 5 ou 6 tecnologias principais, exibidas no Hero.
  techsPrincipais: ['Java', 'Spring Boot', 'Python', 'PyTorch', 'RabbitMQ', 'Docker'],

  links: {
    github: 'https://github.com/RafaelMouraG',
    linkedin: 'https://www.linkedin.com/in/rafael-ganascini-de-moura-719107271',
    email: 'rafaelganascinidemoura@gmail.com',
  },

  // Três versões do currículo, todas em public/ com exatamente esses nomes.
  // A principal vira o CTA do Hero; o Contato lista as três.
  curriculos: [
    { rotulo: 'Dev · PT-BR', href: '/cv-dev-ptbr.pdf', principal: true },
    { rotulo: 'Dev · EN', href: '/cv-dev-en.pdf', principal: false },
    { rotulo: 'Dados · PT-BR', href: '/cv-dados-ptbr.pdf', principal: false },
  ],

  // Agrupada por função, não em nuvem de logos.
  // REGRA: só permanece o que aguenta sabatina em entrevista.
  // `area` colore o marcador do grupo (dev = esmeralda, dados = amarelo);
  // sem área, o grupo usa o azul neutro.
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

  // Lista compacta no fim da seção de projetos. Só nome, uma linha e link.
  // Sem card, sem página de case.
  outrosProjetos: [
    {
      nome: 'Ávila Lótus',
      descricao:
        'Plataforma de agendamento e anamnese para uma massoterapeuta, com relatório financeiro. Primeiro projeto com cliente real, 26 requisitos funcionais.',
      link: 'https://avila-lotus.onrender.com/', // CONFERIR se ainda responde
    },
    {
      nome: 'FeedbackFusion',
      descricao:
        'Plataforma corporativa de feedback com gamificação. Primeiro trabalho interdisciplinar do curso.',
      link: '', // PREENCHER ou remover o item — enquanto vazio, aparece sem link
    },
  ],
}
