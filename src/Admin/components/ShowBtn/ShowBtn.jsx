import { Link } from "react-router-dom";
import styles from "./ShowBtn.module.scss";
import { FaEye } from "react-icons/fa";

function ShowBtn({ link }) {
  return (
    <Link to={link} className={`btnOutline ${styles.btn}`}>
      <span className={styles.text}>مشاهده</span>
      <FaEye />
    </Link>
  );
}

export default ShowBtn;
