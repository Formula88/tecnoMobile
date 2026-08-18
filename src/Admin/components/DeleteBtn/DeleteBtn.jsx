import styles from "./DeleteBtn.module.scss";
import { FaTrash } from "react-icons/fa";
function DeleteBtn({ btnHandle = () => {} }) {
  return (
    <div
      className={styles.btn}
      onClick={btnHandle}
    >
      <span className={styles.text}>حذف</span>
      <FaTrash />
    </div>
  );
}

export default DeleteBtn;
