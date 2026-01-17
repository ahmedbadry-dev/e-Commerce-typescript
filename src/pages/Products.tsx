import { Container, Row, Col } from "react-bootstrap"
import { Product } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getProductsByPrefix } from '@store/products/thunk/thunkGatProductsByPrefix'
import { useParams } from "react-router-dom"
import { productCleanUp } from "@store/products/ProductsSlice"

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

    const productsList = records.map(record => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Product {...record} />
        </Col>
    ))


    return (
        <Container>
            <Row>
                {loading === 'failed' && <p>{error}</p>}
                {loading === 'pending' && <p>Loading...</p>}
                {loading === 'succeeded' && records.length > 0 && productsList}
            </Row>
        </Container>
    )
}

export default Products