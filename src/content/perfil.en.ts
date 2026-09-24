import type { Perfil } from './perfil'

// Versão em inglês de content/perfil.ts. Mesma estrutura, mesmo tom.
// Ao editar um dos dois arquivos, edite o outro na sequência.
export const perfilEn: Perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend in Java and Python, grounded in data and computer vision',

  tese: {
    forte: 'Backend and data.',
    suave: 'Systems that stay up when a piece fails.',
  },

  disponibilidade: 'Intern at Business Tec · Software Engineering at PUC Minas',

  cidade: 'Belo Horizonte',
  idiomasResumo: 'PT native · EN advanced',

  sobreTitulo: 'I care more about measuring right than training more.',
  sobre: [
    'I study Software Engineering at PUC Minas and intern at Business Tec, working with Java and PrimeFaces on both back and front ends.',
    'Outside work, I keep going in backend with Java and Python: async messaging, API integrations and systems that tolerate failure. In data and computer vision, I prefer an honest number to a pretty one.',
  ],

  techsPrincipais: [
    'Java',
    'Spring Boot',
    'Python',
    'FastAPI',
    'RabbitMQ',
    'Redis',
    'PostgreSQL',
    'PyTorch',
    'ONNX',
    'Docker',
    'k6',
  ],

  links: {
    github: 'https://github.com/RafaelMouraG',
    linkedin: 'https://www.linkedin.com/in/rafael-ganascini-de-moura-719107271',
    email: 'rafaelganascinidemoura@gmail.com',
  },

  // Na versão em inglês, o currículo em inglês é o principal.
  curriculos: [
    { rotulo: 'Résumé · EN', href: '/cv-dev-en.pdf', principal: true },
    { rotulo: 'Dev · PT-BR', href: '/cv-dev-ptbr.pdf', principal: false },
    { rotulo: 'Data · PT-BR', href: '/cv-dados-ptbr.pdf', principal: false },
  ],

  experiencia: [
    { local: 'Business Tec', papel: 'intern, Java and PrimeFaces', periodo: 'now' },
    { local: 'Hortifruti Santa Luzia', papel: 'backend for a real client, team of 6', periodo: 'project' },
    { local: 'PUC Minas', papel: 'Software Engineering', periodo: '2024 to 2027' },
  ],

  reconhecimentos: [
    {
      destaque: '3×',
      titulo: 'Best project in class.',
      descricao: 'Biblioo, Ávila Lótus and FeedbackFusion, in interdisciplinary coursework.',
    },
  ],

  outrosProjetos: [
    {
      nome: 'Ávila Lótus',
      descricao:
        'Scheduling and anamnesis for a massage therapist. First real client, 26 functional requirements.',
      link: 'https://avila-lotus.onrender.com/',
    },
    {
      nome: 'FeedbackFusion',
      descricao: 'Corporate feedback platform with gamification.',
      link: '',
    },
  ],
}
