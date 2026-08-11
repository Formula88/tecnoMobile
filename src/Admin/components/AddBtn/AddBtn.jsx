import styles from "./AddBtn.module.scss";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function AddBtn({ link }) {
  return (
    <Link to={link} className={`btnPrimary ${styles.btn}`}>
      <span className={styles.text}>افزودن</span>
      <FaPlus />
    </Link>
  );
}

export default AddBtn;
