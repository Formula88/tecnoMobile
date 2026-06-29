import { useId } from "react";
import styles from "./Textareas.module.scss";
function Textareas({ register, name, option, label, error, placeholder }) {
  const inputId = useId();

  return (
    <div className={styles.inputBox}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <textarea
        id={inputId}
        className={styles.input}
        {...register(name, option)}
        placeholder={placeholder}
      />
      <p className={styles.error}>{error?.[name]?.message}</p>
    </div>
  );
}

export default Textareas;
