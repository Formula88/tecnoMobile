import styles from "./DeleteBtn.module.scss";
import { FaTrash } from "react-icons/fa";
import { confirmSwal } from "../../../Swals/Swals";

function DeleteBtn({
  btnHandle = () => {},
  confirmText = "آیا از حذف این مورد اطمینان دارید؟",
  text = "حذف",
}) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmed = await confirmSwal(confirmText);
    if (confirmed) {
      btnHandle();
    }
  };

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={handleClick}
      title={text}
    >
      <FaTrash className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default DeleteBtn;
