import { Link } from "react-router-dom";
import styles from "./AddBtn.module.scss";
import { FaPlus } from "react-icons/fa";

function AddBtn({ link, text = "افزودن مورد جدید" }) {
  return (
    <div className={styles.container} dir="rtl">
      <Link to={link} className={styles.btn}>
        <FaPlus className={styles.icon} />
        <span className={styles.text}>{text}</span>
      </Link>
    </div>
  );
}

export default AddBtn;
