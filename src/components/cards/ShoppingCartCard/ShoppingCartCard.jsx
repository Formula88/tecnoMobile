import styles from "./ShoppingCartCard.module.scss";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  formatPrice,
  getDiscountAmount,
  toPersianDigits,
  parseProductImages,
  getImageUrl,
} from "../../../utils/Utils";
import Toman from "../../../icon/Toman";
import { useContext, useEffect, useState } from "react";
import { GetProduct } from "../../../services/api";
import { Context } from "../../../context/AppContext";
import { ServerErrorSwal } from "../../../Swals/Swals";
import { ShoppingCartCardSkeleton } from "../../ui/Skeleton/Skeleton";

function ShoppingCartCard({ id, model, qty }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetProduct(id)
      .then((result) => {
        setLoading(false);
        if (result?.success === true) {
          setProduct(result.data);
        } else {
          ServerErrorSwal();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const {
    cardItemRemoveProduct,
    handleIncreaseProductQty,
    handleDecreaseProductQtt,
  } = useContext(Context);

  if (loading || !product?.name) {
    return <ShoppingCartCardSkeleton />;
  }

  const images = parseProductImages(product.imgs);
  const img = getImageUrl(images[0]);

  let totalPrice = product.price;
  if (product.discount > 0) {
    totalPrice = getDiscountAmount(product.price, product.discount);
  }

  return (
    <div className={styles.card}>
      <Link className={styles.right} to={`/Product/${id}`}>
        <div className={styles.img}>
          <img src={img || null} alt={product.name} />
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.subTitle}>{product.description}</p>
            {model && <span className={styles.model}>مدل : {model}</span>}
          </div>
          <div className={styles.priceBox}>
            <div className={styles.price}>
              <span>{formatPrice(totalPrice)}</span>
              <Toman />
            </div>
            {product.discount > 0 && (
              <>
                <div className={styles.discountPrice}>
                  {formatPrice(product.price)}
                </div>
                <div className={styles.discount}>
                  {toPersianDigits(product.discount)}%
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.left}>
        <div
          className={styles.remove}
          onClick={() => {
            cardItemRemoveProduct(id, model);
          }}
        >
          <span>حذف محصول</span>
          <FaTrash />
        </div>
        <div className={styles.counter}>
          <FaPlus
            onClick={() => {
              handleIncreaseProductQty(id, model);
            }}
          />
          <span className={styles.count}>{toPersianDigits(qty ?? 0)}</span>
          <FaMinus
            onClick={() => {
              handleDecreaseProductQtt(id, model);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartCard;
