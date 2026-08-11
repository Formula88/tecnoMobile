import styles from "./ShoppingCartCard.module.scss";
import img from "../../../../data/uplode/iPhone.png";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatPrice, toPersianDigits } from "../../../utils/Utils";
import Toman from "../../../icon/Toman";

function ShoppingCartCard() {
  return (
    <div className={styles.card}>
      <Link className={styles.right}>
        <div className={styles.img}>
          <img src={img} alt="" />
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <h2 className={styles.title}>iPhone 13 Pro Max</h2>
            <p className={styles.subTitle}>گوشی اپل iPhone 13 Pro Max</p>
          </div>
          <div className={styles.priceBox}>
            <div className={styles.price}>
              <span>{formatPrice(500000)}</span>
              <Toman />
            </div>
            <div className={styles.discountPrice}>{formatPrice(1000000)}</div>
            <div className={styles.discount}>{toPersianDigits(50)}%</div>
          </div>
        </div>
      </Link>
      <div className={styles.left}>
        <div className={styles.remove}>
          <span>حذف محصول</span>
          <FaTrash />
        </div>
        <div className={styles.counter}>
          <FaPlus />
          <span className={styles.count}>1</span>
          <FaMinus />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartCard;
