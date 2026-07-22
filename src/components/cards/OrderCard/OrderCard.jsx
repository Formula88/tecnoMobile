import { Link } from "react-router-dom";
import styles from "./OrderCard.module.scss";

import {
  FaReceipt,
  FaCircleInfo,
  FaMoneyBillWave,
  FaCalendarDays,
} from "react-icons/fa6";

import Toman from "../../../icon/Toman";
import { formatPrice, toPersianDigits } from "../../../utils/Utils";

function OrderCard({ status }) {
  return (
    <div className={styles.orderCard}>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.title}>
              <div className={styles.titleIcon}>
                <FaReceipt />
              </div>
              <h3 className={styles.titleText}>شماره سفارش</h3>
            </div>
            <div className={styles.text}>
              <span className={styles.id}>{`#${toPersianDigits(19254)}`}</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>
              <div className={styles.titleIcon}>
                <FaCircleInfo />
              </div>
              <h3 className={styles.titleText}>وضعیت سفارش</h3>
            </div>
            <div className={styles.text}>
              {status && (
                <span className={`${styles.status} ${styles.send}`}>
                  ارسال شده
                </span>
              )}
              {!status && (
                <span className={`${styles.status} ${styles.sending}`}>
                  درحال ارسال
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.title}>
              <div className={styles.titleIcon}>
                <FaMoneyBillWave />
              </div>
              <h3 className={styles.titleText}>مبلغ پرداختی</h3>
            </div>
            <div className={styles.text}>
              <div className={styles.price}>
                <span>{formatPrice(192500000)}</span>
                <Toman />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>
              <div className={styles.titleIcon}>
                <FaCalendarDays />
              </div>
              <h3 className={styles.titleText}>تاریخ سفارش</h3>
            </div>
            <div className={styles.text}>
              <span className={styles.date}>1405/4/01</span>
            </div>
          </div>
        </div>
      </div>
      <Link to={"#"} className={`btnOutline ${styles.btn}`}>مشاهده جزئیات</Link>
    </div>
  );
}

export default OrderCard;
