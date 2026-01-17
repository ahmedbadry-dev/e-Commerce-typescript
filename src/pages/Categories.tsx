import { Container, Row, Col } from "react-bootstrap"
import { Category } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getCategories } from "@store/categories/thunk/thunkGatCategories"
const Categories = () => {
    const { error, loading, records } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (loading === 'idle') {
            dispatch(getCategories())
        }
    }, [dispatch, loading])

    const categoriesList = records.map(record => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Category {...record} />
        </Col>
    ))

    return (
        <Container>
            <Row>
                {loading === 'pending' && <p>Loading...</p>}
                {loading === 'failed' && <p>{error}</p>}
                {records.length > 0 && loading === 'succeeded' && categoriesList}
            </Row>
        </Container>
    )
}

export default Categories
