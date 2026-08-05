import type { Perfil } from './perfil'

// Versão em inglês de content/perfil.ts. Mesma estrutura, mesmo tom.
// Ao editar um dos dois arquivos, edite o outro na sequência.
export const perfilEn: Perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend and systems integration, with parallel work in data and computer vision',

  // Mesma frase, segmentada para o Hero pintar cada metade com a cor da
  // sua área (dev = esmeralda, dados = amarelo).
  posicionamentoRico: [
    { texto: 'Backend and systems integration', area: 'dev' as const },
    { texto: ', with parallel work in ' },
    { texto: 'data and computer vision', area: 'dados' as const },
  ],

  disponibilidade: 'open to a first role — backend or data',

  sobre: [
    'Software Engineering student at PUC Minas, in Belo Horizonte, Brazil. Expected graduation at the end of 2027; native Portuguese speaker, advanced English.',
    'I work mainly on the backend, with Java and Python. Most of my work has centered on communication between systems: asynchronous messaging, integration with external services, and the guarantees a flow needs so nothing gets lost when one of those parts fails. A relevant share of that experience comes from team projects with real clients, from requirements gathering to delivery.',
    'In parallel, I build projects in data and computer vision, paying particular attention to the evaluation protocol and to what a metric actually measures.',
    'I am looking for a position in backend or data engineering — the areas where these two fronts meet.',
  ],

  techsPrincipais: ['Java', 'Spring Boot', 'Python', 'PyTorch', 'RabbitMQ', 'Docker'],

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
        'Scheduling and anamnesis platform for a massage therapist, with financial reporting. First project with a real client, 26 functional requirements.',
      link: 'https://avila-lotus.onrender.com/',
    },
    {
      nome: 'FeedbackFusion',
      descricao:
        'Corporate feedback platform with gamification. First cross-disciplinary project of the degree.',
      link: '',
    },
  ],
}
