import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  cartItemChangeQuantity,
  getProductsByItems,
  removeCartItem,
  cartItemsFullInfoCleanUp,
} from '@store/cart/cartSlice'

const useCart = () => {
  const dispatch = useAppDispatch()
  const { error, items, productsFullInfo, loading } = useAppSelector(
    (state) => state.cart
  )

  useEffect(() => {
    const promise = dispatch(getProductsByItems())
    return () => {
      promise.abort()
      dispatch(cartItemsFullInfoCleanUp())
    }
  }, [])

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }))

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      console.log(id, quantity)
      dispatch(cartItemChangeQuantity({ id, quantity }))
    },
    [dispatch]
  )

  const removeItemHandler = useCallback(
    (id: number) => {
      console.log(id)
      dispatch(removeCartItem({ id }))
    },
    [dispatch]
  )
  return {
    error,
    items,
    productsFullInfo,
    loading,
    removeItemHandler,
    changeQuantityHandler,
    products,
  }
}

export default useCart
