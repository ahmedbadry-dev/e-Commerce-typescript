import type { TProduct } from "@customTypes/product.type"
import { CartItem } from "@components/eCommerce"
type TCartITemsList = {
    products: TProduct[],
    changeQuantityHandler: (id: number, quantity: number) => void
    removeItemHandler: (id: number) => void
}

const CartItemsList = ({ products, changeQuantityHandler, removeItemHandler }: TCartITemsList) => {

    const items = products.length > 0 && products.map(product => (
        <CartItem
            key={product.id}
            {...product}
            changeQuantityHandler={changeQuantityHandler}
            removeItemHandler={removeItemHandler}
        />
    ))
    return (
        <div>{items}</div>
    )
}

export default CartItemsList