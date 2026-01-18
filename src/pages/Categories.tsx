import { Container, Row, Col } from "react-bootstrap"
import { Category } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getCategories } from "@store/categories/thunk/thunkGatCategories"
import Loading from "@components/feedback/Loading/Loading"
const Categories = () => {
    const { error, loading, records } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    useEffect(() => {
        // this condition to prevent firing getCategories dispatch ever re-render 
        // why cose categories dose not change frequently it stay the same for long time 
        // if we have recorded so we do not need to fire dispatch 
        if (!records.length) {
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
            <Loading status={loading} error={error}>
                <Row>
                    {records.length > 0 && loading === 'succeeded' && categoriesList}
                </Row>
            </Loading>
        </Container>
    )
}

export default Categories
