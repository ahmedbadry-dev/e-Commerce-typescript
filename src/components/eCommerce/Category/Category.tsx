import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;
import type { TCategory } from '@customTypes/categories.type'
const Category = ({ img, prefix, title }: TCategory) => {
    return (
        <Link to={`products/${prefix}`}>
            <div className={category}>
                <div className={categoryImg}>
                    <img
                        src={img}
                        alt={title}
                    />
                </div>
                <h4 className={categoryTitle}>{title}</h4>
            </div>
        </Link>
    );
};

export default Category;