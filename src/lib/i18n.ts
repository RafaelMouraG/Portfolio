import { perfil, type Perfil } from '@/content/perfil'
import { perfilEn } from '@/content/perfil.en'
import { projetos, type Area, type Projeto } from '@/content/projetos'
import { projetosEn } from '@/content/projetos.en'

export type Idioma = 'pt' | 'en'

// Conteúdo por idioma: componentes recebem `idioma` e buscam aqui.
export const conteudo: Record<Idioma, { perfil: Perfil; projetos: Projeto[] }> = {
  pt: { perfil, projetos },
  en: { perfil: perfilEn, projetos: projetosEn },
}

// A home pt vive em / e a en em /en; os cases seguem o mesmo par.
export function caminhoDaHome(idioma: Idioma): string {
  return idioma === 'pt' ? '/' : '/en'
}

export function caminhoDoCase(idioma: Idioma, slug: string): string {
  return idioma === 'pt' ? `/projetos/${slug}` : `/en/projects/${slug}`
}

type Textos = {
  filtro: { rotulos: Record<Area | 'todos', string>; aria: string }
  areas: Record<Area, string>
  nav: { aria: string; itens: Record<'projetos' | 'stack' | 'trajetoria' | 'contato', string> }
  hero: {
    ariaNav: string
    curriculo: string
    email: string
    copiarEmail: string
    copiado: string
    lerMais: string
  }
  // Simulador do Hero: fila, dois workers e a DLQ, com leituras ao vivo
  sistema: {
    titulo: string
    instrucao: string
    entregues: string
    fila: string
    reentregas: string
    dlq: string
    ativo: string
    fora: string
    derrubar: string
    religar: string
    caos: string
    reduzido: string
  }
  figura: { fig: string; aoVivo: string; pausada: string; pausar: string; retomar: string }
  projetos: {
    titulo: string
    umProjeto: string
    variosProjetos: string
    abrir: string
  }
  stack: { titulo: string; usadoEm: string; legenda: string }
  trajetoria: { titulo: string; atual: string; reconhecimentos: string; outros: string }
  contato: {
    titulo: string
    // A frase de fechamento é quebrada em três porque o miolo ganha a serifa
    // em itálico. Traduzir sempre os três pedaços juntos.
    frase: { inicio: string; destaque: string; fim: string }
    escreva: string
    copiar: string
    copiado: string
    curriculos: string
    feito: string
  }
  caso: {
    voltar: string
    secoes: { problema: string; abordagem: string; decisoes: string; resultado: string }
    indice: string
    verNoAr: string
    demoEmVideo: string
    repositorio: string
    capturas: string
    papel: string
    stack: string
    links: string
    emNumeros: string
    proximoProjeto: string
    conversar: string
    todosProjetos: string
  }
  idioma: { alvo: string; rotuloLink: string }
}

export const textos: Record<Idioma, Textos> = {
  pt: {
    filtro: {
      rotulos: { dados: 'Dados e IA', todos: 'Todos', dev: 'Dev' },
      aria: 'Filtrar projetos por área',
    },
    areas: { dados: 'dados e IA', dev: 'dev' },
    nav: {
      aria: 'Seções da página',
      itens: { projetos: 'projetos', stack: 'stack', trajetoria: 'trajetória', contato: 'contato' },
    },
    hero: {
      ariaNav: 'GitHub e LinkedIn',
      curriculo: 'Currículo',
      email: 'E-mail',
      copiarEmail: 'Copiar e-mail',
      copiado: 'Copiado!',
      lerMais: 'mais sobre mim',
    },
    sistema: {
      titulo: 'Um sistema que continua de pé',
      instrucao: 'clique num worker para derrubá-lo',
      entregues: 'entregues',
      fila: 'na fila',
      reentregas: 'reentregas',
      dlq: 'dlq',
      ativo: 'ativo',
      fora: 'fora',
      derrubar: 'derrubar',
      religar: 'religar',
      caos: 'caos automático',
      reduzido: 'movimento reduzido: simulação parada',
    },
    figura: {
      fig: 'fig.',
      aoVivo: 'ao vivo',
      pausada: 'pausada',
      pausar: 'Pausar a animação',
      retomar: 'Retomar a animação',
    },
    projetos: {
      titulo: 'projetos',
      umProjeto: 'projeto',
      variosProjetos: 'projetos',
      abrir: 'abrir o case',
    },
    stack: {
      titulo: 'stack',
      usadoEm: 'usado em',
      legenda: 'número da figura de cada projeto desta página que usa a ferramenta',
    },
    trajetoria: {
      titulo: 'trajetória',
      atual: 'atual',
      reconhecimentos: 'reconhecimentos',
      outros: 'outros projetos',
    },
    contato: {
      titulo: 'contato',
      frase: {
        inicio: 'Estou à disposição para ',
        destaque: 'backend, dados e visão computacional',
        fim: '.',
      },
      escreva: 'me escreve',
      copiar: 'copiar',
      copiado: 'copiado',
      curriculos: 'Currículo em três versões:',
      feito: 'Figuras desenhadas à mão em SVG, animadas sem biblioteca.',
    },
    caso: {
      voltar: '← todos os projetos',
      secoes: {
        problema: 'problema',
        abordagem: 'abordagem',
        decisoes: 'decisões e trade-offs',
        resultado: 'resultado',
      },
      indice: 'Neste case',
      verNoAr: 'Ver no ar',
      demoEmVideo: 'Demo em vídeo',
      repositorio: 'Repositório',
      capturas: 'Capturas do projeto',
      papel: 'papel',
      stack: 'stack',
      links: 'links',
      emNumeros: 'em números',
      proximoProjeto: 'próximo projeto',
      conversar: 'Dúvida sobre este projeto? Me escreve:',
      todosProjetos: 'todos os projetos',
    },
    // O rótulo do seletor fala a língua de destino: quem procura "EN"
    // provavelmente não lê português.
    idioma: { alvo: 'EN', rotuloLink: 'Read this page in English' },
  },
  en: {
    filtro: {
      rotulos: { dados: 'Data & AI', todos: 'All', dev: 'Dev' },
      aria: 'Filter projects by area',
    },
    areas: { dados: 'data & AI', dev: 'dev' },
    nav: {
      aria: 'Page sections',
      itens: { projetos: 'projects', stack: 'stack', trajetoria: 'path', contato: 'contact' },
    },
    hero: {
      ariaNav: 'GitHub and LinkedIn',
      curriculo: 'Résumé',
      email: 'Email',
      copiarEmail: 'Copy email',
      copiado: 'Copied!',
      lerMais: 'more about me',
    },
    sistema: {
      titulo: 'A system that stays up',
      instrucao: 'click a worker to take it down',
      entregues: 'delivered',
      fila: 'queued',
      reentregas: 'redelivered',
      dlq: 'dlq',
      ativo: 'up',
      fora: 'down',
      derrubar: 'take down',
      religar: 'bring back',
      caos: 'auto chaos',
      reduzido: 'reduced motion: simulation paused',
    },
    figura: {
      fig: 'fig.',
      aoVivo: 'live',
      pausada: 'paused',
      pausar: 'Pause the animation',
      retomar: 'Resume the animation',
    },
    projetos: {
      titulo: 'projects',
      umProjeto: 'project',
      variosProjetos: 'projects',
      abrir: 'open the case',
    },
    stack: {
      titulo: 'stack',
      usadoEm: 'used in',
      legenda: 'figure number of each project on this page that uses the tool',
    },
    trajetoria: {
      titulo: 'path',
      atual: 'now',
      reconhecimentos: 'recognition',
      outros: 'other projects',
    },
    contato: {
      titulo: 'contact',
      frase: {
        inicio: 'I’m available for ',
        destaque: 'backend, data and computer vision',
        fim: ' work.',
      },
      escreva: 'write me',
      copiar: 'copy',
      copiado: 'copied',
      curriculos: 'Résumé in three versions:',
      feito: 'Figures drawn by hand in SVG, animated without a library.',
    },
    caso: {
      voltar: '← all projects',
      secoes: {
        problema: 'problem',
        abordagem: 'approach',
        decisoes: 'decisions & trade-offs',
        resultado: 'outcome',
      },
      indice: 'In this case',
      verNoAr: 'See it live',
      demoEmVideo: 'Video demo',
      repositorio: 'Repository',
      capturas: 'Project screenshots',
      papel: 'role',
      stack: 'stack',
      links: 'links',
      emNumeros: 'in numbers',
      proximoProjeto: 'next project',
      conversar: 'Questions about this project? Write me:',
      todosProjetos: 'all projects',
    },
    idioma: { alvo: 'PT', rotuloLink: 'Ler esta página em português' },
  },
}

// Validação em tempo de build: a lista en precisa espelhar slugs e ordem da pt,
// senão o seletor de idioma leva para um case que não corresponde.
const slugsPt = projetos.map((p) => p.slug).join(',')
const slugsEn = projetosEn.map((p) => p.slug).join(',')
if (slugsPt !== slugsEn) {
  console.warn(
    `[lib/i18n] projetos.en.ts não espelha projetos.ts — pt: [${slugsPt}] vs en: [${slugsEn}]`,
  )
}
