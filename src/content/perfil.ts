// A mesma forma vale para os dois idiomas: perfil.ts (pt) e perfil.en.ts
// declaram este tipo, e o compilador acusa se as estruturas divergirem.
export type Perfil = {
  nome: string
  // Fonte dos metadados e da imagem OG. Na página, quem fala é a `tese`.
  posicionamento: string
  // Frase de abertura da coluna fixa: `forte` sai em tinta cheia e `suave`
  // continua a frase em cinza, no mesmo corpo.
  tese: { forte: string; suave: string }
  // Linha de status embaixo da tese, com o ponto pulsante. Curta.
  disponibilidade: string
  cidade: string
  idiomasResumo: string
  // Bloco "Sobre": uma frase grande de título e parágrafos curtos embaixo.
  sobreTitulo: string
  sobre: string[]
  // Etiquetas de stack do bloco "Sobre". REGRA: só entra o que aguenta
  // sabatina em entrevista.
  techsPrincipais: string[]
  links: { github: string; linkedin: string; email: string }
  curriculos: Array<{ rotulo: string; href: string; principal: boolean }>
  // Linha do tempo curta: onde está + projetos com cliente real + formação.
  // Sem datas inventadas: o período é "atual", "projeto" ou a conclusão.
  experiencia: Array<{ local: string; papel: string; periodo: string }>
  // Prêmios acadêmicos (Trabalhos Interdisciplinares). `destaque` é o número
  // grande ao lado ("3×"). `pendente` marca o que ainda está em disputa e
  // troca o número pelo ponto pulsante, para não vender o que não aconteceu.
  reconhecimentos: Array<{
    titulo: string
    descricao: string
    destaque?: string
    pendente?: boolean
  }>
  outrosProjetos: Array<{ nome: string; descricao: string; link: string }>
}

export const perfil: Perfil = {
  nome: 'Rafael Ganascini de Moura',

  posicionamento:
    'Backend em Java e Python, com base em dados e visão computacional',

  tese: {
    forte: 'Backend e dados.',
    suave: 'Sistemas que continuam de pé quando uma peça falha.',
  },

  disponibilidade: 'Estagiário na Business Tec · Eng. de Software na PUC Minas',

  cidade: 'Belo Horizonte',
  idiomasResumo: 'PT nativo · EN avançado',

  sobreTitulo: 'Gosto mais de medir certo do que de treinar mais.',
  sobre: [
    'Estudo Engenharia de Software na PUC Minas e estagio na Business Tec, onde trabalho com Java e PrimeFaces no back e no front.',
    'Fora do trabalho, sigo em backend com Java e Python: mensageria assíncrona, integrações com APIs e sistemas que aguentam falha. Em dados e visão computacional, prefiro um número honesto a um número bonito.',
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

  // Três versões do currículo, todas em public/ com exatamente esses nomes.
  // A principal é o link "Currículo" da coluna fixa; o contato lista as três.
  curriculos: [
    { rotulo: 'Dev · PT-BR', href: '/cv-dev-ptbr.pdf', principal: true },
    { rotulo: 'Dev · EN', href: '/cv-dev-en.pdf', principal: false },
    { rotulo: 'Dados · PT-BR', href: '/cv-dados-ptbr.pdf', principal: false },
  ],

  experiencia: [
    { local: 'Business Tec', papel: 'estagiário, Java e PrimeFaces', periodo: 'atual' },
    { local: 'Hortifruti Santa Luzia', papel: 'backend com cliente real, equipe de 6', periodo: 'projeto' },
    { local: 'PUC Minas', papel: 'Engenharia de Software', periodo: '2024 a 2027' },
  ],

  reconhecimentos: [
    {
      destaque: '3×',
      titulo: 'Melhor trabalho da turma.',
      descricao: 'Biblioo, Ávila Lótus e FeedbackFusion, nos Trabalhos Interdisciplinares.',
    },
  ],

  // Lista compacta no fim do bloco "Sobre". Só nome, uma linha e link.
  // Sem card, sem página de case.
  outrosProjetos: [
    {
      nome: 'Ávila Lótus',
      descricao:
        'Agendamento e anamnese para uma massoterapeuta. Primeiro cliente real, 26 requisitos funcionais.',
      link: 'https://avila-lotus.onrender.com/', // CONFERIR se ainda responde
    },
    {
      nome: 'FeedbackFusion',
      descricao: 'Plataforma corporativa de feedback com gamificação.',
      link: '', // PREENCHER ou remover o item; enquanto vazio, aparece sem link
    },
  ],
}
