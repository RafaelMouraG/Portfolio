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
  projetos: {
    titulo: string
    umProjeto: string
    variosProjetos: string
    outros: string
    meuPapel: string
    abrir: string
  }
  hero: {
    ariaNav: string
    curriculo: string
    email: string
    copiarEmail: string
    copiado: string
    lerMais: string
    terminal: string
  }
  stack: string
  experiencia: string
  reconhecimentos: string
  contato: {
    titulo: string
    // A frase de fechamento é quebrada em três porque o miolo ganha peso
    // (era dourado no design). Traduzir sempre os três pedaços juntos.
    frase: { inicio: string; destaque: string; fim: string }
    curriculos: string
    cidade: string
    codigoNoGitHub: string
  }
  caso: {
    voltar: string
    secoes: { problema: string; abordagem: string; decisoes: string; resultado: string }
    verNoAr: string
    demoEmVideo: string
    repositorio: string
    capturas: string
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
    projetos: {
      titulo: 'projetos',
      umProjeto: 'projeto',
      variosProjetos: 'projetos',
      outros: 'outros projetos',
      meuPapel: 'Papel:',
      abrir: 'no ar ↗',
    },
    hero: {
      ariaNav: 'Contato, currículo e idioma',
      curriculo: 'Currículo',
      email: 'E-mail',
      copiarEmail: 'Copiar e-mail',
      copiado: 'Copiado!',
      lerMais: 'mais sobre mim',
      terminal: 'Terminal com apresentação',
    },
    stack: 'stack',
    experiencia: 'experiência',
    reconhecimentos: 'reconhecimentos',
    contato: {
      titulo: 'contato',
      frase: {
        inicio: 'Estou à disposição para ',
        destaque: 'backend, dados e visão computacional',
        fim: '.',
      },
      curriculos: 'Currículo em três versões:',
      cidade: 'Belo Horizonte',
      codigoNoGitHub: 'código no GitHub',
    },
    caso: {
      voltar: '← voltar',
      secoes: {
        problema: 'problema',
        abordagem: 'abordagem',
        decisoes: 'decisões e trade-offs',
        resultado: 'resultado',
      },
      verNoAr: 'Ver no ar',
      demoEmVideo: 'Demo em vídeo',
      repositorio: 'Repositório',
      capturas: 'Capturas do projeto',
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
    projetos: {
      titulo: 'projects',
      umProjeto: 'project',
      variosProjetos: 'projects',
      outros: 'other projects',
      meuPapel: 'Role:',
      abrir: 'live ↗',
    },
    hero: {
      ariaNav: 'Contact, résumé and language',
      curriculo: 'Résumé',
      email: 'Email',
      copiarEmail: 'Copy email',
      copiado: 'Copied!',
      lerMais: 'more about me',
      terminal: 'Terminal with introduction',
    },
    stack: 'stack',
    experiencia: 'experience',
    reconhecimentos: 'recognition',
    contato: {
      titulo: 'contact',
      frase: {
        inicio: 'I’m available for ',
        destaque: 'backend, data and computer vision',
        fim: ' work.',
      },
      curriculos: 'Résumé in three versions:',
      cidade: 'Belo Horizonte',
      codigoNoGitHub: 'code on GitHub',
    },
    caso: {
      voltar: '← back',
      secoes: {
        problema: 'problem',
        abordagem: 'approach',
        decisoes: 'decisions & trade-offs',
        resultado: 'outcome',
      },
      verNoAr: 'See it live',
      demoEmVideo: 'Video demo',
      repositorio: 'Repository',
      capturas: 'Project screenshots',
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
