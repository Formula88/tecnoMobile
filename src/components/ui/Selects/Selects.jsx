import { useId } from "react";
import styles from "./Selects.module.scss";

function Selects({ register, name, option, label, error, items }) {
  const inputId = useId();

  return (
    <div className={styles.inputBox}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <select id={inputId} className={styles.input} {...register(name, option)} defaultValue="">
        <option value="" disabled>لطفا انتخاب نمایید</option>
        {items.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
      <p className={styles.error}>{error?.[name]?.message}</p>
    </div>
  );
}
export default Selects;
