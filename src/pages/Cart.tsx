import useCart from "@hooks/useCart"
import { Heading } from "@components/common"
import { CartItemsList, CartSubtotalPrice } from "@components/eCommerce"
import { Loading, LottieHandler } from "@components/feedback"

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
            <Loading status={loading} error={error} type='cart'>
                {
                    products.length > 0 ?
                        <>
                            <CartItemsList
                                products={products}
                                changeQuantityHandler={changeQuantityHandler}
                                removeItemHandler={removeItemHandler}
                            />
                            <CartSubtotalPrice products={products} />
                        </>
                        : <LottieHandler message="Your cart is empty" type="empty" />
                }
            </Loading>
        </>
    )
}

export default Cart