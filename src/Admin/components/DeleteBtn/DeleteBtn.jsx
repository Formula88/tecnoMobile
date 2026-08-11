import styles from "./DeleteBtn.module.scss";
import { FaTrash } from "react-icons/fa";
function DeleteBtn() {
  return (
    <div className={styles.btn}>
      <span className={styles.text}>حذف</span>
      <FaTrash />
    </div>
  );
}

export default DeleteBtn;