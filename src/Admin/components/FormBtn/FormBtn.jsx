import styles from "./FormBtn.module.scss";

function FormBtn({ text, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={styles.btn}
    >
      <span>{text}</span>
    </button>
  );
}

export default FormBtn;
