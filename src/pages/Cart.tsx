import useCart from "@hooks/useCart"
import { Heading } from "@components/common"
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce"
import { Loading } from "@components/feedback"

const Cart = () => {
    const {
        error,
        loading,
        removeItemHandler,
        changeQuantityHandler,
        products,
    } = useCart()
    return (
        <>
            <Heading title="Cart" />
            <Loading status={loading} error={error}>
                <CartItemsList products={products} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />
            </Loading>
            <CartSubtotalPrice products={products} />
        </>
    )
}

export default Cart