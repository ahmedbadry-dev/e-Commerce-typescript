import type { TLoading } from '@types'

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
