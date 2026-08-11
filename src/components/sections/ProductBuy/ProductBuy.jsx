import { useContext } from "react";
import Toman from "../../../icon/Toman";
import {
  formatPrice,
  getDiscountAmount,
  toPersianDigits,
} from "../../../utils/Utils";
import styles from "./ProductBuy.module.scss";
import { Context } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
function ProductBuy({ price, discount, models }) {
  let totalPrice = price;
  if (discount > 0) {
    totalPrice = getDiscountAmount(price, discount);
  }

  const params = useParams();
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQtt,
    getProductQty,
    cardItem,
  } = useContext(Context);

  console.log(cardItem);

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
          {models !== null ? (
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
          {getProductQty(params.id) == 0 ? (
            <button
              className={`btnPrimary ${styles.btn}`}
              onClick={() => {
                handleIncreaseProductQty(params.id);
              }}
            >
              افزودن به سبد خرید
            </button>
          ) : (
            <div className={styles.counter}>
              <FaPlus
                onClick={() => {
                  handleIncreaseProductQty(params.id);
                }}
              />
              <span className={styles.count}>
                {toPersianDigits(getProductQty(params.id))}
              </span>
              <FaMinus
                onClick={() => {
                  handleDecreaseProductQtt(params.id);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductBuy;
