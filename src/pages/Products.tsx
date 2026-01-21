import { Container } from "react-bootstrap"
import { Product } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getProductsByPrefix } from '@store/products/thunk/thunkGatProductsByPrefix'
import { useParams } from "react-router-dom"
import { productCleanUp } from "@store/products/productsSlice"
import { Loading } from "@components/feedback"
import { GridList, Heading } from "@components/common"

const Products = () => {
    const cardItems = useAppSelector(state => state.cart.items)
    const { error, loading, records } = useAppSelector(s => s.products)
    const wishListItemsId = useAppSelector(state => state.wishlist.itemsId)
    const params = useParams()
    const dispatch = useAppDispatch()


    const productFullInfo = records.map(record => (
        {
            ...record,
            quantity: cardItems[record.id] || 0,
            isLiked: wishListItemsId.includes(record.id)
        }
    ))

    useEffect(() => {
        dispatch(getProductsByPrefix(params.prefix as string))
        return () => {
            dispatch(productCleanUp())
        }
    }, [dispatch, params])




    return (
        <>
            <Heading><span className="text-capitalize">{(params.prefix)}</span> Products</Heading>
            <Container>
                <Loading status={loading} error={error}>
                    <GridList records={productFullInfo} renderRecord={(record) => <Product {...record} />} />
                </Loading>
            </Container>
        </>
    )
}

export default Products