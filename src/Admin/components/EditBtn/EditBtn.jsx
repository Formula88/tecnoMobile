import { Link } from "react-router-dom";
import styles from "./EditBtn.module.scss";
import { FaPen } from "react-icons/fa";

function EditBtn({ link, text = "ویرایش" }) {
  return (
    <Link to={link} className={styles.btn} title={text}>
      <FaPen className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </Link>
  );
}

export default EditBtn;
