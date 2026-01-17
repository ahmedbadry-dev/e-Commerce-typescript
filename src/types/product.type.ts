import type { Loading } from '@customTypes/shared.type'

type TProduct = {
  id: number
  title: string
  price: string
  cat_prefix: string
  img: string
}

interface IProductsState {
  records: TProduct[]
  loading: Loading
  error: string | null
}

export type { TProduct, IProductsState }
