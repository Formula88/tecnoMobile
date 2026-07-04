import { useId } from "react";
import styles from "./Inputs.module.scss";

function Inputs({ register, name, option, label, error, placeholder , type = "text"}) {
  const inputId = useId();

  return (
    <div className={styles.inputBox}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={inputId}
        className={styles.input}
        {...register(name, option)}
        placeholder={placeholder}
      />
      <p className={styles.error}>{error?.[name]?.message}</p>
    </div>
  );
}

export default Inputs;
