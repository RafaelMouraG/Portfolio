export const perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Construo sistemas que aguentam falha e modelos que aguentam dado real',
  // Alternativas:
  // 'Backend orientado a eventos, com uma queda por problemas de dados'
  // 'Da fila de mensagens ao modelo em produção'

  // Seção Sobre. 4 linhas, sem adjetivo de autoelogio.
  sobre: [
    'Estudante de Engenharia de Software na PUC Minas, em Belo Horizonte.',
    'Trabalho principalmente no backend, e é onde estou mais confortável: mensageria, integração com sistemas externos e o que acontece quando alguma dessas peças falha. Boa parte do que aprendi veio de projeto em equipe com cliente real, onde requisito nasce de conversa e não de enunciado.',
    'A parte de dados não é um desvio disso. O projeto que mais me ensinou foi um classificador de doenças de soja que marcava 98% de acurácia e estava errado, porque aprendeu a assinatura da câmera em vez da lesão. O conserto foi de método, não de arquitetura, e é assim que penso os dois lados: o problema quase nunca está onde a métrica aponta.',
    'Procuro uma primeira vaga onde essas duas coisas se encontrem, e não me importo se ela se chama backend ou dados.',
  ],

  // 5 ou 6 tecnologias principais, exibidas no Hero.
  techsPrincipais: ['Java', 'Spring Boot', 'Python', 'PyTorch', 'RabbitMQ', 'Docker'],

  links: {
    github: 'https://github.com/RafaelMouraG',
    linkedin: '', // PREENCHER — enquanto vazio, o link não aparece no Hero
    email: 'rafaelganascinidemoura@gmail.com',
    cv: '/cv.pdf',
  },

  // Agrupada por função, não em nuvem de logos.
  // REGRA: só permanece o que aguenta sabatina em entrevista.
  stack: [
    {
      grupo: 'Linguagens',
      itens: ['Java', 'Python', 'TypeScript', 'Dart'],
    },
    {
      grupo: 'Backend',
      itens: [
        'Spring Boot',
        'FastAPI',
        'REST',
        'Arquitetura hexagonal',
        'Clean Architecture',
        'JWT',
      ],
    },
    {
      grupo: 'Mensageria e dados',
      itens: ['RabbitMQ', 'Redis', 'MySQL', 'PostgreSQL'],
      // Neo4j e OpenSearch existem no Biblioo, mas não foram sua frente de trabalho.
      // Só inclua se você conseguir explicar por que o projeto usa cada um.
    },
    {
      grupo: 'Dados e IA',
      itens: [
        'PyTorch',
        'Transfer learning',
        'ONNX',
        'Protocolo de avaliação',
        'Análise de redes',
      ],
    },
    {
      grupo: 'Infra e qualidade',
      itens: ['Docker', 'GitHub Actions', 'Cloud Run', 'Railway', 'Vercel', 'k6', 'pytest'],
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
