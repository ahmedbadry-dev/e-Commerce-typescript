import Logo from "@assets/svg/cart.svg?react"
import styles from './styles.module.css'
import { useAppSelector } from "@store/hooks"
import { getTotalCartQuantitySelector } from '@store/cart/cartSlice'
const { basketContainer, basketQuantity } = styles
const HeaderBasket = () => {

    const totalQuantity = useAppSelector(getTotalCartQuantitySelector)
    console.log('rendering');
    return (
        <div className={basketContainer}>
            <Logo title="basket ico" />
            <div className={basketQuantity}>{totalQuantity}</div>
        </div>
    )
}

export default HeaderBasket