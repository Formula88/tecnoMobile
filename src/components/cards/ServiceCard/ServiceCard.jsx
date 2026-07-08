import { formatPrice, toPersianDigits } from "../../../utils/Utils";
import styles from "./ServiceCard.module.scss";
import Toman from "../../../icon/Toman";

function ServiceCard({ title, description, priceIn, priceOut, warranty }) {
  let Twarranty;
  if (warranty && warranty > 0) {
    Twarranty = toPersianDigits(warranty) + " ماه";
  } else {
    Twarranty = "ندارد";
  }
  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.price}>
          <h4 className={styles.titleP}>محدوده قیمت :</h4>
          <div className={styles.priceBox}>
            <span className={styles.in}>از : {formatPrice(priceIn)}</span>
            <Toman />
          </div>
          <div className={styles.priceBox}>
            <span className={styles.out}>تا : {formatPrice(priceOut)}</span>
            <Toman />
          </div>
        </div>
        <span className={styles.warranty}>گارانتی : {Twarranty}</span>
      </div>
    </>
  );
}

export default ServiceCard;
