import useProducts from "@hooks/useProducts"
import { Container } from "react-bootstrap"
import { Product } from "@components/eCommerce"
import { Loading } from "@components/feedback"
import { GridList, Heading } from "@components/common"

const Products = () => {
    const { error, loading, productFullInfo, productPrefix } = useProducts()

    return (
        <>
            <Heading title={`${productPrefix?.toUpperCase()} Products`} />
            <Container>
                <Loading status={loading} error={error} type='product'>
                    <GridList records={productFullInfo} renderRecord={(record) => <Product {...record} />} />
                </Loading>
            </Container>
        </>
    )
}

export default Products