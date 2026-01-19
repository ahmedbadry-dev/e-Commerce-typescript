import { Container } from "react-bootstrap"
import { Category } from "@components/eCommerce"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { getCategories } from "@store/categories/thunk/thunkGatCategories"
import { Loading } from "@components/feedback"
import { GridList, Heading } from "@components/common"
const Categories = () => {
    const { error, loading, records } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (records.length > 0) return
        // this condition to prevent firing getCategories dispatch ever re-render 
        // why cose categories dose not change frequently it stay the same for long time 
        // if we have recorded so we do not need to fire dispatch 
        if (loading === 'idle') {
            dispatch(getCategories())
        }
    }, [dispatch, loading, records.length])


    return (
        <>
            <Heading>Categories</Heading>
            <Container>
                <Loading status={loading} error={error}>
                    <GridList records={records} renderRecord={(record) => <Category {...record} />} />
                </Loading>
            </Container>
        </>
    )
}

export default Categories
