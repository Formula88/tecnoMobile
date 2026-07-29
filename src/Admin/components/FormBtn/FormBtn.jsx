import styles from "./FormBtn.module.scss";

function FormBtn({ text }) {
  return <input type="submit" value={text} className={styles.btn} />;
}

export default FormBtn;
