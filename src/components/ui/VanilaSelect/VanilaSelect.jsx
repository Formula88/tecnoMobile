import { useId } from "react";
import styles from "./VanilaSelect.module.scss";

function VanilaSelect({ name, label, items, onChange }) {
  const inputId = useId();

  return (
    <div className={styles.inputBox}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <select id={inputId} className={styles.input} onChange={onChange}>
        {items.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default VanilaSelect;
