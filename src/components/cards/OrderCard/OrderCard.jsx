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

function OrderCard({ id, status, totalPrice, createdAt }) {
  const isSent = status === "sent" || status === true;
  const isDelivered = status === "delivered";
  const isCancelled = status === "cancelled";

  let statusText = "درحال ارسال";
  let statusClass = styles.sending;

  if (isDelivered) {
    statusText = "تحویل داده شده";
    statusClass = styles.send;
  } else if (isSent) {
    statusText = "ارسال شده";
    statusClass = styles.send;
  } else if (isCancelled) {
    statusText = "لغو شده";
    statusClass = styles.sending;
  }

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("fa-IR")
    : "ثبت شده";

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
              <span className={styles.id}>{`#${toPersianDigits(id || 19254)}`}</span>
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
              <span className={`${styles.status} ${statusClass}`}>
                {statusText}
              </span>
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
                <span>{formatPrice(totalPrice || 0)}</span>
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
              <span className={styles.date}>{toPersianDigits(formattedDate)}</span>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/OrderDetails?id=${id}`} className={`btnOutline ${styles.btn}`}>
        مشاهده جزئیات
      </Link>
    </div>
  );
}

export default OrderCard;
