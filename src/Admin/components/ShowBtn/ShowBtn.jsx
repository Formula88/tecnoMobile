import { Link } from "react-router-dom";
import styles from "./ShowBtn.module.scss";
import { FaEye } from "react-icons/fa";

function ShowBtn({ link, text = "مشاهده" }) {
  return (
    <Link to={link} className={styles.btn} title={text}>
      <FaEye className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </Link>
  );
}

export default ShowBtn;
