import { memo, useEffect, useState } from 'react';
import type { TProduct } from '@customTypes/product.type'
import { Button, Spinner } from "react-bootstrap";
import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/cart/cartSlice';
import { thunkLikeToggle } from '@store/wishlist/wishlistSlice';
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'
import styles from "./styles.module.css";


const { product, productImg, wishlistBtn } = styles;

const Product = memo(({ id, title, price, img, max, quantity, isLiked }: TProduct) => {
    const dispatch = useAppDispatch()
    const [isBtnClicked, setIsBtnClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const availableQuantity = max - (quantity ?? 0)
    const quantityReachedToMax = availableQuantity <= 0 ? true : false


    useEffect(() => {
        if (!isBtnClicked) return

        const handler = setTimeout(() => {
            setIsBtnClicked(false)
        }, 300)

        return () => clearTimeout(handler)
    }, [isBtnClicked])

    const handleAddCart = () => {
        dispatch(addToCart(id))
        setIsBtnClicked(true)
    }

    // => first way 
    // const likeToggleHandler = () => {
    //     setIsLoading(true)
    //     dispatch(thunkLikeToggle(id))
    //         .unwrap()
    //         .then(() => setIsLoading(false))
    //         .catch(() => setIsLoading(false))
    // }
    // =>  scend way
    const likeToggleHandler = async () => {
        if (isLoading) return

        setIsLoading(true)
        try {
            await dispatch(thunkLikeToggle(id)).unwrap()
        } finally {
            setIsLoading(false)
        }
    }
    console.log('render');


    return (
        <div className={product}>
            <div className={wishlistBtn} onClick={likeToggleHandler}>
                {
                    isLoading ? <Spinner animation="border" size='sm' color="primary" />
                        : isLiked ? <LikeFill /> : <Like />
                }
            </div>
            <div className={productImg}>
                <img
                    src={img}
                    alt={title}
                />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price.toFixed(2)}</h3>
            <p>
                {
                    quantityReachedToMax
                        ? `You reached to the limit`
                        : `You can add ${availableQuantity}`
                }
            </p>
            <Button
                variant="info"
                style={{ color: "white" }}
                onClick={handleAddCart}
                disabled={isBtnClicked || quantityReachedToMax}
            >
                {isBtnClicked ? <><Spinner animation='border' size='sm' /> Loading...</> : 'Add to cart'}
            </Button>
        </div>
    );
});

export default Product;