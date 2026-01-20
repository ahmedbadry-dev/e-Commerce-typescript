import { useAppSelector } from "@store/hooks"
import { getTotalCartQuantitySelector } from '@store/cart/cartSlice'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "@assets/svg/cart.svg?react"
import styles from './styles.module.css'


const { basketContainer, basketQuantity, quantityPumpAnimation } = styles

const HeaderBasket = () => {
    const navigate = useNavigate()
    const totalQuantity = useAppSelector(getTotalCartQuantitySelector)
    const [isAnimate, setIsAnimate] = useState(false)

    const style = isAnimate ? `${quantityPumpAnimation} ${basketQuantity}` : `${basketQuantity}`

    useEffect(() => {
        if (!totalQuantity) return

        setIsAnimate(true)
        const handler = setTimeout(() => {
            setIsAnimate(false)
        }, 300)

        return () => clearTimeout(handler)
    }, [totalQuantity])

    return (
        <div className={basketContainer} onClick={() => navigate('/cart')}>
            <Logo title="basket ico" />
            <div className={style}>{totalQuantity}</div>
        </div>
    )
}

export default HeaderBasket