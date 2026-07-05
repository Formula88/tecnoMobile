import { Link } from "react-router-dom";
import Toman from "../../../icon/Toman";
import styles from "./ProductsCard.module.scss";
import {
  formatPrice,
  getDiscountAmount,
  toPersianDigits,
} from "../../../utils/Utils";

function ProductsCard({ imgs, title, description, id, price, discount }) {
  const img = JSON.parse(imgs)[0];
  let totalPrice = price;
  if (discount > 0) {
    totalPrice = getDiscountAmount(price, discount);
  }
  return (
    <Link to={`/Product/${id ?? 2}`} className={styles.card}>
      <div className={styles.img}>
        <img src={img} alt={title} />
      </div>
      <div className={styles.info}>
        <h2 className={`text-truncate ${styles.title}`}>{title}</h2>
        <p className={`text-truncate ${styles.description}`}>{description}</p>
        <div className={styles.priceBox}>
          {discount > 0 && (
            <span className={styles.discount}>
              {toPersianDigits(discount)}%
            </span>
          )}
          <div className={styles.totalPriceBox}>
            <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
            <Toman />
          </div>
          {discount > 0 && (
            <span className={styles.price}>{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductsCard;
