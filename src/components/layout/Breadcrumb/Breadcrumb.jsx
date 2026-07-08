import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Breadcrumb({ productType }) {
  let thisType;
  switch (productType) {
    case "mobile":
      thisType = "موبایل";
      break;
    case "hardware":
      thisType = "سخت افزار";
      break;
    case "accessories":
      thisType = "وسایل جانبی";
      break;
    case "accessoriesmodel":
      thisType = "وسایل جانبی";
      break;
    default:
      break;
  }
  return (
    <>
      <div className={styles.breadcrumb}>
        <ul>
          <li>
            <Link to="/">خانه</Link>
          </li>
          <li>
            <MdKeyboardArrowLeft />
          </li>
          <li>
            <Link to="/products">محصولات</Link>
          </li>
          <li>
            <MdKeyboardArrowLeft />
          </li>
          <li><span>{thisType}</span></li>
        </ul>
      </div>
    </>
  );
}

export default Breadcrumb;
