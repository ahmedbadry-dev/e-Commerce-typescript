import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { getProductsByPrefix } from '@store/products/thunk/thunkGatProductsByPrefix'
import { useParams } from 'react-router-dom'
import { productCleanUp } from '@store/products/productsSlice'
const useProducts = () => {
  const cardItems = useAppSelector((state) => state.cart.items)
  const { error, loading, records } = useAppSelector((s) => s.products)
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId)
  const params = useParams()
  const productPrefix = params.prefix
  const dispatch = useAppDispatch()

  const productFullInfo = records.map((record) => ({
    ...record,
    quantity: cardItems[record.id] || 0,
    isLiked: wishListItemsId.includes(record.id),
  }))

  useEffect(() => {
    const promise = dispatch(getProductsByPrefix(params.prefix as string))
    return () => {
      promise.abort()
      dispatch(productCleanUp())
    }
  }, [dispatch, params])

  return { error, loading, productFullInfo, productPrefix }
}

export default useProducts
