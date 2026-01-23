import useCategories from "@hooks/useCategories"
import { Container } from "react-bootstrap"
import { Category } from "@components/eCommerce"
import { Loading } from "@components/feedback"
import { GridList, Heading } from "@components/common"
const Categories = () => {
    const { error, loading, records } = useCategories()
    return (
        <>
            <Heading title="Categories" />
            <Container>
                <Loading status={loading} error={error} type='category'>
                    <GridList
                        records={records}
                        renderRecord={(record) => <Category {...record} />}
                        emptyMessage="There are no categories"
                    />
                </Loading>
            </Container>
        </>
    )
}

export default Categories
