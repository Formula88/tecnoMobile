import { Link } from "react-router-dom";
import styles from "./EditBtn.module.scss";
import { FaPen } from "react-icons/fa";
function EditBtn({link}) {
  return (
    <Link to={link} className={`btnPrimary ${styles.btn}`}>
      <span className={styles.text}>ویرایش</span>
      <FaPen />
    </Link>
  );
}

export default EditBtn;
