import type { Loading } from '@customTypes/shared.type'

type TCategory = {
  id: number
  title: string
  prefix: string
  img: string
}

interface ICategoriesState {
  records: TCategory[]
  loading: Loading
  error: string | null
}

export type { TCategory, ICategoriesState }
