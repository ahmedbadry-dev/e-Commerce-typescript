import type { TLoading } from '@types'

type TProduct = {
  id: number
  title: string
  price: number
  cat_prefix: string
  img: string
  quantity?: number
  max: number
  isLiked?: boolean
}

interface IProductsState {
  records: TProduct[]
  loading: TLoading
  error: string | null
}

export type { TProduct, IProductsState }
