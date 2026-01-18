import { Container } from "react-bootstrap"
import { Product } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getProductsByPrefix } from '@store/products/thunk/thunkGatProductsByPrefix'
import { useParams } from "react-router-dom"
import { productCleanUp } from "@store/products/productsSlice"
import { Loading } from "@components/feedback"
import { GridList } from "@components/common"

const Products = () => {
    const { error, loading, records } = useAppSelector(s => s.products)
    const params = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProductsByPrefix(params.prefix as string))
        return () => {
            dispatch(productCleanUp())
        }
    }, [dispatch, params])




    return (
        <Container>
            <Loading status={loading} error={error}>
                <GridList records={records} renderRecord={(record) => <Product {...record} />} />
            </Loading>
        </Container>
    )
}

export default Products