import type { TLoading } from '@customTypes/shared.type'

type TCategory = {
  id: number
  title: string
  prefix: string
  img: string
}

interface ICategoriesState {
  records: TCategory[]
  loading: TLoading
  error: string | null
}

export type { TCategory, ICategoriesState }
