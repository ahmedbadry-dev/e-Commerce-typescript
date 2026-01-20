import type { TProduct } from '@customTypes/product.type'
import styles from './styles.module.css'


type TCartSubtotalPriceProps = {
    products: TProduct[]
}
const CartSubtotalPrice = ({ products }: TCartSubtotalPriceProps) => {

    const subtitle = products.reduce((acc, el) => {
        const price = el.price
        const quantity = el.quantity
        if (quantity && typeof quantity === 'number') {
            return acc + (price * quantity)
        } else {
            return acc
        }
    }, 0)

    return (
        <div className={styles.container}>
            <span>Subtotal: </span>
            <span>{subtitle}</span>
        </div>
    )
}

export default CartSubtotalPrice