import styles from "./EditBtn.module.scss";
import { FaPen } from "react-icons/fa";
function EditBtn() {
  return (
    <div className={`btnPrimary ${styles.btn}`}>
      <span className={styles.text}>ویرایش</span>
      <FaPen />
    </div>
  );
}

export default EditBtn;
