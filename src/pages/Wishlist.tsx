import { GridList, Heading } from "@components/common"
import { thunkGetWishlistByProductId, wishlistItemsFullInfoCleanUp } from "@store/wishlist/wishlistSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { Loading } from "@components/feedback"
import { Product } from "@components/eCommerce"
const Wishlist = () => {
    const dispatch = useAppDispatch()
    const { error, loading, productsFullInfo } = useAppSelector(state => state.wishlist)
    const carItem = useAppSelector(state => state.cart.items)
    useEffect(() => {
        dispatch(thunkGetWishlistByProductId())
        return () => {
            dispatch(wishlistItemsFullInfoCleanUp())
        }
    }, [dispatch])


    const records = productsFullInfo.map(el => (
        {
            ...el,
            quantity: carItem[el.id],
            isLiked: true
        }
    ))

    return (
        <>
            <Heading>Your Wishlist</Heading>
            <Loading status={loading} error={error}>
                <GridList
                    records={records}
                    renderRecord={(record) => <Product {...record} />}
                />
            </Loading>
        </>
    )
}

export default Wishlist