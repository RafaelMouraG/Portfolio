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
  painel: {
    ariaIndice: string
    ariaLinks: string
    curriculo: string
    copiarEmail: string
    copiado: string
    sobre: string
    contato: string
    cidadeCurta: string
  }
  projetos: { titulo: string; lerCase: string; abrir: string; antes: string }
  sobre: { stack: string; outros: string }
  contato: {
    // O fechamento é uma pergunta curta, em corpo grande.
    frase: string
    copiar: string
    copiado: string
    codigoNoGitHub: string
  }
  caso: {
    voltar: string
    secoes: { problema: string; abordagem: string; decisoes: string; resultado: string }
    meuPapel: string
    verNoAr: string
    demoEmVideo: string
    repositorio: string
    capturas: string
    proximoProjeto: string
    conversar: string
    todosProjetos: string
  }
  // Rótulos desenhados dentro dos diagramas vivos (components/DiagramaVivo).
  diagrama: {
    banco: string
    web: string
    mobile: string
    limiar: string
    confiante: [string, string]
    abstencao: [string, string]
    extrato: string
    lancamentos: string
    eventos: string
    contratacao: string
    comunidadeA: string
    comunidadeB: string
    popularidade: string
  }
  idioma: { alvo: string; rotuloLink: string }
}

export const textos: Record<Idioma, Textos> = {
  pt: {
    filtro: {
      rotulos: { todos: 'Tudo', dev: 'Backend', dados: 'Dados e IA' },
      aria: 'Filtrar projetos por área',
    },
    areas: { dados: 'dados e ia', dev: 'backend' },
    painel: {
      ariaIndice: 'Projetos e seções',
      ariaLinks: 'Contato, currículo e idioma',
      curriculo: 'Currículo',
      copiarEmail: 'Copiar e-mail',
      copiado: 'Copiado',
      sobre: 'Sobre',
      contato: 'Contato',
      cidadeCurta: 'BH',
    },
    projetos: { titulo: 'Projetos', lerCase: 'Ler o case', abrir: 'no ar ↗', antes: 'antes' },
    sobre: { stack: 'Stack principal', outros: 'outros projetos' },
    contato: {
      frase: 'Vamos construir algo que não cai?',
      copiar: 'Copiar e-mail',
      copiado: 'Copiado',
      codigoNoGitHub: 'código no GitHub',
    },
    caso: {
      voltar: '← voltar',
      secoes: {
        problema: 'Problema',
        abordagem: 'Abordagem',
        decisoes: 'Decisões e trade-offs',
        resultado: 'Resultado',
      },
      meuPapel: 'Meu papel',
      verNoAr: 'Ver no ar',
      demoEmVideo: 'Demo em vídeo',
      repositorio: 'Repositório',
      capturas: 'Capturas do projeto',
      proximoProjeto: 'próximo projeto',
      conversar: 'Dúvida sobre este projeto? Me escreve:',
      todosProjetos: 'todos os projetos',
    },
    diagrama: {
      banco: 'banco',
      web: 'web · SSE',
      mobile: 'mobile · FCM',
      limiar: 'limiar',
      confiante: ['ferrugem', 'confiança 0,91'],
      abstencao: ['não sei', 'vai para revisão'],
      extrato: 'extrato.pdf',
      lancamentos: 'lançamentos',
      eventos: 'eventos',
      contratacao: 'contratação',
      comunidadeA: 'urbano latino',
      comunidadeB: 'hip-hop EUA',
      popularidade: 'popularidade 84',
    },
    // O rótulo do seletor fala a língua de destino: quem procura "EN"
    // provavelmente não lê português.
    idioma: { alvo: 'EN', rotuloLink: 'Read this page in English' },
  },
  en: {
    filtro: {
      rotulos: { todos: 'All', dev: 'Backend', dados: 'Data & AI' },
      aria: 'Filter projects by area',
    },
    areas: { dados: 'data & ai', dev: 'backend' },
    painel: {
      ariaIndice: 'Projects and sections',
      ariaLinks: 'Contact, résumé and language',
      curriculo: 'Résumé',
      copiarEmail: 'Copy email',
      copiado: 'Copied',
      sobre: 'About',
      contato: 'Contact',
      cidadeCurta: 'BH',
    },
    projetos: { titulo: 'Projects', lerCase: 'Read the case', abrir: 'live ↗', antes: 'previously' },
    sobre: { stack: 'Main stack', outros: 'other projects' },
    contato: {
      frase: 'Shall we build something that doesn’t fall over?',
      copiar: 'Copy email',
      copiado: 'Copied',
      codigoNoGitHub: 'code on GitHub',
    },
    caso: {
      voltar: '← back',
      secoes: {
        problema: 'Problem',
        abordagem: 'Approach',
        decisoes: 'Decisions & trade-offs',
        resultado: 'Outcome',
      },
      meuPapel: 'My role',
      verNoAr: 'See it live',
      demoEmVideo: 'Video demo',
      repositorio: 'Repository',
      capturas: 'Project screenshots',
      proximoProjeto: 'next project',
      conversar: 'Questions about this project? Write me:',
      todosProjetos: 'all projects',
    },
    diagrama: {
      banco: 'database',
      web: 'web · SSE',
      mobile: 'mobile · FCM',
      limiar: 'threshold',
      confiante: ['rust', 'confidence 0.91'],
      abstencao: ['not sure', 'sent to review'],
      extrato: 'statement.pdf',
      lancamentos: 'ledger',
      eventos: 'events',
      contratacao: 'hiring',
      comunidadeA: 'latin urban',
      comunidadeB: 'US hip-hop',
      popularidade: 'popularity 84',
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
