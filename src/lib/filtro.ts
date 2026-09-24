import type { Area } from '@/content/projetos'

// O filtro por área vive na URL (?area=dev | ?area=dados). A coluna fixa e a
// lista de projetos leem o mesmo parâmetro, então ficam em sincronia sem
// estado compartilhado.
export type FiltroArea = Area | 'todos'

export const ordemFiltros: ReadonlyArray<FiltroArea> = ['todos', 'dev', 'dados']

// Param inválido cai em "todos" silenciosamente.
export function filtroDaUrl(param: string | null | undefined): FiltroArea {
  return param === 'dados' || param === 'dev' ? param : 'todos'
}

// Número estável do projeto: a posição na lista completa, não na filtrada,
// para "03" continuar sendo o Hortifruti com qualquer filtro.
export function numeroDoProjeto(indice: number): string {
  return String(indice + 1).padStart(2, '0')
}
