import { Container, Row, Col } from "react-bootstrap"
import { Category } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getCategories } from "@store/categories/thunk/thunkGatCategories"
const Categories = () => {
    const { error, loading, records } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategories())
        console.log(error);
        console.log(records);
        console.log(loading);
    }, [dispatch])
    return (
        <Container>
            <Row>
                <Col xs={6} md={3} lg className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Category />
                </Col>

            </Row>
        </Container>
    )
}

export default Categories
