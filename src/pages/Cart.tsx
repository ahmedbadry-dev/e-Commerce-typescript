import { useCallback, useEffect } from "react"
import { Heading } from "@components/common"
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { cartItemChangeQuantity, getProductsByItems, removeCartItem, cartItemsFullInfoCleanUp } from "@store/cart/cartSlice"
import { Loading } from "@components/feedback"

const Cart = () => {
    const dispatch = useAppDispatch()
    const { error, items, productsFullInfo, loading } = useAppSelector(state => state.cart)


    useEffect(() => {
        dispatch(getProductsByItems())
        return () => {
            dispatch(cartItemsFullInfoCleanUp())
        }
    }, [])

    const products = productsFullInfo.map((el => (
        { ...el, quantity: items[el.id] }
    )))

    const changeQuantityHandler = useCallback((id: number, quantity: number) => {
        console.log(id, quantity);
        dispatch(cartItemChangeQuantity({ id, quantity }))
    }, [dispatch])

    const removeItemHandler = useCallback((id: number) => {
        console.log(id);
        dispatch(removeCartItem({ id }))

    }, [dispatch])

    return (
        <>
            <Heading>Cart</Heading>
            <Loading status={loading} error={error}>
                <CartItemsList products={products} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />
            </Loading>
            <CartSubtotalPrice products={products} />
        </>
    )
}

export default Cart