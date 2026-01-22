import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { categoryImg, categoryTitle } = styles;
import type { TCategory } from '@types'
const Category = ({ img, prefix, title }: TCategory) => {
    return (
        <Link to={`products/${prefix}`}>
            <div>
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