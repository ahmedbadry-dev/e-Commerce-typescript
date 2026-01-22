import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@types";
import { memo } from "react";


const { cartItem, product, productImg, productInfo, cartItemSelection } =
    styles;

type TCartItemProps = TProduct & {
    changeQuantityHandler: (id: number, quantity: number) => void
    removeItemHandler: (id: number) => void
}

const CartItem = memo(({ id, img, price, title, max, quantity, changeQuantityHandler, removeItemHandler }: TCartItemProps) => {

    // render option list 
    const renderOptions = Array(max).fill(0).map((_, idx) => {
        const quantity = ++idx
        return <option key={quantity} value={quantity}>{quantity}</option>
    })


    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = +event.target.value
        changeQuantityHandler(id, quantity)
    }


    return (
        <div className={cartItem}>
            <div className={product}>
                <div className={productImg}>
                    <img
                        src={img}
                        alt={title}
                    />
                </div>
                <div className={productInfo}>
                    <h2>{title}</h2>
                    <h3>{price.toFixed(2)}</h3>
                    <Button
                        variant="secondary"
                        style={{ color: "white", width: "100px" }}
                        className="mt-auto"
                        onClick={() => removeItemHandler(id)}
                    >
                        Remove
                    </Button>
                </div>
            </div>

            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select
                    value={quantity}
                    aria-label="Default select example"
                    onChange={changeQuantity}
                >
                    {renderOptions}
                </Form.Select>
            </div>
        </div>
    );
});

export default CartItem;