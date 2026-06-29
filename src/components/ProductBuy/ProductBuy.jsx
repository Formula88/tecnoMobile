import Toman from "../../icon/Toman";
import { formatPrice, getDiscountAmount } from "../../utils/Utils";
import styles from "./ProductBuy.module.scss";
function ProductBuy({ price, discount, models }) {
  let totalPrice = price;
  if (discount > 0) {
    totalPrice = getDiscountAmount(price, discount);
  }
  return (
    <>
      <div className={styles.ProductBuy}>
        <div className={styles.up}>
          {discount > 0 ? (
            <div className={styles.discount}>
              <span className={styles.price}>{formatPrice(price)}</span>
              <Toman />
              <span className={styles.discountNum}>
                {formatPrice(discount)}%
              </span>
            </div>
          ) : (
            ""
          )}
          {models !== null? (
            <div>
              <span className={styles.models}>مدل گوشی :</span>
              <select className={`btnOutline ${styles.select}`}>
                {models.map((value, index) => {
                  return <option key={index}>{value}</option>;
                })}
              </select>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.down}>
          <div className={styles.totalPrice}>
            <span>{formatPrice(totalPrice)}</span>
            <Toman />
          </div>
          <button className={`btnPrimary ${styles.btn}`}>
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductBuy;
