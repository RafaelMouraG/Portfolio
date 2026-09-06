import type { Perfil } from './perfil'

// Versão em inglês de content/perfil.ts. Mesma estrutura, mesmo tom.
// Ao editar um dos dois arquivos, edite o outro na sequência.
export const perfilEn: Perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend in Java and Python, grounded in data and computer vision',

  // Mesma frase, segmentada para o Hero pintar cada metade com a cor da
  // sua área (dev = verde, dados = dourado). O trecho com `enfase` ganha a
  // serifa em itálico.
  posicionamentoRico: [
    { texto: 'Backend in Java and Python', area: 'dev' as const },
    { texto: ', grounded in ' },
    { texto: 'data and computer vision', area: 'dados' as const, enfase: true },
  ],

  disponibilidade: 'intern at Business Tec · Java + PrimeFaces',

  cidade: 'Belo Horizonte',
  formacaoCurta: 'Software Engineering · PUC Minas · graduating end of 2027',
  idiomasResumo: 'PT native · EN advanced',

  sobre: [
    'I study Software Engineering at PUC Minas and intern at Business Tec. I work with Java and PrimeFaces, touching both back and front ends.',
    'Outside work, I keep going in backend with Java and Python: async messaging, API integrations, and flows that stay up when a piece goes down. In data and computer vision I care more about measuring right than training more — along the way, three projects were voted best in class.',
  ],

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

  // Na versão em inglês, o currículo em inglês é o principal (CTA do Hero).
  curriculos: [
    { rotulo: 'Résumé · EN', href: '/cv-dev-en.pdf', principal: true },
    { rotulo: 'Dev · PT-BR', href: '/cv-dev-ptbr.pdf', principal: false },
    { rotulo: 'Data · PT-BR', href: '/cv-dados-ptbr.pdf', principal: false },
  ],

  experiencia: [
    {
      local: 'Business Tec',
      papel: 'Intern · Java + PrimeFaces',
      periodo: 'now',
      descricao: 'Back and front in the day-to-day.',
      stack: ['Java', 'PrimeFaces'],
    },
    {
      local: 'Hortifruti Santa Luzia',
      papel: 'Backend · real-client interdisciplinary coursework, team of 6',
      periodo: 'project',
      descricao:
        'Communication layer and integrations: boletos, bank reconciliation and e-invoices.',
      stack: ['Spring Boot', 'MySQL', 'Sicoob API', 'Focus NFe'],
    },
    {
      local: 'PUC Minas',
      papel: 'Software Engineering',
      periodo: 'Feb 2024 — Dec 2027',
      descricao: 'Degree in progress — the base of the real-client projects.',
    },
  ],

  reconhecimentos: [
    {
      titulo: 'Best in class · 3×',
      descricao:
        'Biblioo, Ávila Lótus and FeedbackFusion — interdisciplinary coursework.',
    },
  ],

  stack: [
    {
      grupo: 'Languages',
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
        'Hexagonal architecture',
        'Clean Architecture',
        'JWT & OAuth',
      ],
    },
    {
      grupo: 'Messaging & data',
      area: 'dev' as const,
      itens: ['RabbitMQ', 'Redis', 'MySQL', 'PostgreSQL', 'OpenSearch'],
    },
    {
      grupo: 'Data & AI',
      area: 'dados' as const,
      itens: [
        'PyTorch',
        'Transfer learning',
        'ONNX',
        'Evaluation protocol',
        'Network analysis',
        'Function calling',
        'Power BI',
        'Excel',
      ],
    },
    {
      grupo: 'Infra & quality',
      itens: [
        'Docker',
        'GitHub Actions',
        'Cloud Run',
        'Railway',
        'Vercel',
        'k6',
        'Prometheus & Grafana',
        'pytest',
      ],
    },
  ],

  outrosProjetos: [
    {
      nome: 'Ávila Lótus',
      descricao:
        'Scheduling and anamnesis for a massage therapist, with financial reporting. First real client, 26 functional requirements.',
      link: 'https://avila-lotus.onrender.com/',
    },
    {
      nome: 'FeedbackFusion',
      descricao:
        'Corporate feedback platform with gamification. Second interdisciplinary project of the degree.',
      link: '',
    },
  ],
}
