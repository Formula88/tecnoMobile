import { formatPrice, toPersianDigits } from "../../../utils/Utils";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Toman from "../../../icon/Toman";
import styles from "./CheckoutSummary.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context/AppContext";
function CheckoutSummary() {
  const { productCount } = useContext(Context);
  
  return (
    <div className={styles.CheckoutSummary}>
      <h3 className={styles.title}>خلاصه سفارش</h3>
      <div className={styles.item}>
        <span className={styles.itemTitle}>تعداد کالا ها :</span>
        <div className={styles.itemSub}>{toPersianDigits(productCount)} کالا</div>
      </div>
      <div className={styles.item}>
        <span className={styles.itemTitle}>مجموع قیمت :</span>
        <div className={styles.price}>
          <span className={styles.text}>{formatPrice(3000000)}</span>
          <Toman />
        </div>
      </div>
      <div className={styles.item}>
        <span className={styles.itemTitle}>تخفیف :</span>
        <div className={styles.price}>
          <span className={styles.text}>{formatPrice(1500000)}</span>
          <Toman />
        </div>
      </div>
      <hr className={styles.line} />
      <h4 className={styles.totalPriceT}>مبلغ قابل پرداخت</h4>
      <div className={styles.totalPrice}>
        <span>{formatPrice(1500000)}</span>
        <Toman />
      </div>
      <Link to={"/checkout"} className={`btnPrimary ${styles.btnPay}`}>
        <span>ادامه ثبت سفارش</span>
        <FaChevronLeft />
      </Link>
      <Link to={"/"} className={styles.btnBack}>
        <span>بازگشت به خانه</span>
        <FaChevronRight />
      </Link>
    </div>
  );
}

export default CheckoutSummary;
