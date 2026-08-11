import {
  formatPrice,
  getDiscountAmount,
  toPersianDigits,
} from "../../../utils/Utils";
import styles from "./VPNCardBuy.module.scss";
import Toman from "../../../icon/Toman";

function VPNCardBuy({ price, discount }) {
  let totalPrice;
  if (discount <= 0) {
    totalPrice = formatPrice(price);
  } else {
    totalPrice = getDiscountAmount(price, discount);
    totalPrice = formatPrice(totalPrice);
  }
  return (
    <>
      <div className={styles.vpnBuy}>
        {discount > 0 && (
          <span className={styles.discount}>{toPersianDigits(discount)}%</span>
        )}
        <div className={styles.totalPrice}>
          <span>{toPersianDigits(totalPrice)}</span>
          <Toman />
        </div>
        {discount > 0 && (
          <div className={styles.price}>
            {toPersianDigits(formatPrice(price))}
          </div>
        )}
      </div>
    </>
  );
}

export default VPNCardBuy;
