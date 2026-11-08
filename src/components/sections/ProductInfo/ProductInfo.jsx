import { toPersianDigits } from "../../../utils/Utils";
import DetailsList from "../DetailsList/DetailsList";
import PhoneInformation from "../PhoneInformation/PhoneInformation";
import ProductBuy from "../ProductBuy/ProductBuy";
import styles from "./ProductInfo.module.scss";

function ProductInfo(props) {
  const isMobile = props.productType === "mobile";
  
  let extra = {};
  if (typeof props.extra === "object" && props.extra !== null) {
    extra = props.extra;
  } else if (typeof props.extra === "string") {
    try {
      extra = JSON.parse(props.extra);
    } catch {
      extra = {};
    }
  }

  let warranty;
  if (extra.warranty !== undefined && extra.warranty !== null) {
    if (Number(extra.warranty) < 1) {
      warranty = "ندارد";
    } else {
      warranty = toPersianDigits(extra.warranty) + " ماه";
    }
  }

  return (
    <>
      <div className={styles.ProductInfo}>
        {isMobile && extra.phoneType && (
          <span className={styles.phoneType}>{extra.phoneType}</span>
        )}
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.description}>{props.description}</p>
        {isMobile && extra.phoneInformation && <PhoneInformation extra={extra.phoneInformation} />}
        <div className={styles.details}>
          <h3>جزئیات :</h3>
          <ul>
            <li>
              <DetailsList title={"برند"} text={props.brand} />
            </li>
            {extra.status && (
              <li>
                <DetailsList title={"وضعیت"} text={extra.status} />
              </li>
            )}
            {extra.warranty && (
              <li>
                <DetailsList title={"گارانتی"} text={warranty} />
              </li>
            )}
          </ul>
        </div>
        <div className={styles.buy}>
          <ProductBuy
            price={props.price}
            discount={props.discount}
            models={extra.models ?? null}
          />
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
