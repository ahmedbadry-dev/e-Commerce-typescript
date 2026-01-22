import {
  thunkGetWishlistByProductId,
  wishlistItemsFullInfoCleanUp,
} from '@store/wishlist/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
const useWishlist = () => {
  const dispatch = useAppDispatch()
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  )
  const carItem = useAppSelector((state) => state.cart.items)
  useEffect(() => {
    const promise = dispatch(thunkGetWishlistByProductId())
    return () => {
      promise.abort()
      dispatch(wishlistItemsFullInfoCleanUp())
    }
  }, [dispatch])

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: carItem[el.id],
    isLiked: true,
  }))
  return { error, loading, records }
}

export default useWishlist
