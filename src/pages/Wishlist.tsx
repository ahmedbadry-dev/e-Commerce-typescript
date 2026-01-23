import useWishlist from "@hooks/useWishlist"
import { GridList, Heading } from "@components/common"
import { Loading } from "@components/feedback"
import { Product } from "@components/eCommerce"
const Wishlist = () => {

    const { error, loading, records } = useWishlist()
    return (
        <>
            <Heading title="Your Wishlist" />
            <Loading status={loading} error={error} type='product'>
                <GridList
                    records={records}
                    renderRecord={(record) => <Product {...record} />}
                    emptyMessage="Your Wishlist is empty, add one !!"
                />
            </Loading>
        </>
    )
}

export default Wishlist