import type { TProduct } from '@customTypes/product.type'
import { Button } from "react-bootstrap";
import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/cart/cartSlice';
import styles from "./styles.module.css";


const { product, productImg } = styles;

const Product = ({ id, title, price, img }: TProduct) => {
    const dispatch = useAppDispatch()

    const handleAddCart = () => {
        dispatch(addToCart(id))
    }
    return (
        <div className={product}>
            <div className={productImg}>
                <img
                    src={img}
                    alt={title}
                />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price}</h3>
            <Button variant="info" style={{ color: "white" }} onClick={handleAddCart}>
                Add to cart
            </Button>
        </div>
    );
};

export default Product;