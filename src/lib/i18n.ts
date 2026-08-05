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
    verCase: string
  }
  hero: { ariaNav: string; curriculo: string; email: string }
  sobre: string
  stack: string
  contato: {
    titulo: string
    curriculos: string
    feitoPor: string
    codigoNoGitHub: string
  }
  caso: {
    voltar: string
    secoes: { problema: string; abordagem: string; decisoes: string; resultado: string }
    verNoAr: string
    demoEmVideo: string
    repositorio: string
    capturas: string
  }
  idioma: { alvo: string; rotuloLink: string }
}

export const textos: Record<Idioma, Textos> = {
  pt: {
    filtro: {
      rotulos: { dados: 'Dados e IA', todos: 'Todos', dev: 'Dev' },
      aria: 'Filtrar projetos por área',
    },
    areas: { dados: 'Dados e IA', dev: 'Dev' },
    projetos: {
      titulo: 'projetos',
      umProjeto: 'projeto',
      variosProjetos: 'projetos',
      outros: 'outros projetos',
      meuPapel: 'Meu papel:',
      verCase: 'ver case →',
    },
    hero: {
      ariaNav: 'Contato e currículo',
      curriculo: 'Currículo (PDF)',
      email: 'E-mail',
    },
    sobre: 'sobre',
    stack: 'stack',
    contato: {
      titulo: 'contato',
      curriculos: 'Respondo rápido. O currículo em PDF está em três versões:',
      feitoPor: 'feito por mim, em Next.js —',
      codigoNoGitHub: 'o código está no GitHub',
    },
    caso: {
      voltar: '← voltar',
      secoes: {
        problema: 'Problema',
        abordagem: 'Abordagem',
        decisoes: 'Decisões e trade-offs',
        resultado: 'Resultado',
      },
      verNoAr: 'Ver no ar',
      demoEmVideo: 'Demo em vídeo',
      repositorio: 'Repositório',
      capturas: 'Capturas do projeto',
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
    areas: { dados: 'Data & AI', dev: 'Dev' },
    projetos: {
      titulo: 'projects',
      umProjeto: 'project',
      variosProjetos: 'projects',
      outros: 'other projects',
      meuPapel: 'My role:',
      verCase: 'view case →',
    },
    hero: {
      ariaNav: 'Contact and résumé',
      curriculo: 'Résumé (PDF)',
      email: 'Email',
    },
    sobre: 'about',
    stack: 'stack',
    contato: {
      titulo: 'contact',
      curriculos: 'I reply fast. The résumé comes in three versions:',
      feitoPor: 'built by me, with Next.js —',
      codigoNoGitHub: 'the code is on GitHub',
    },
    caso: {
      voltar: '← back',
      secoes: {
        problema: 'Problem',
        abordagem: 'Approach',
        decisoes: 'Decisions & trade-offs',
        resultado: 'Outcome',
      },
      verNoAr: 'See it live',
      demoEmVideo: 'Video demo',
      repositorio: 'Repository',
      capturas: 'Project screenshots',
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
