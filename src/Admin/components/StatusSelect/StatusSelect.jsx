import styles from "./StatusSelect.module.scss";

function StatusSelect({ items, onChange, defaultValue }) {
  return (
    <div className={styles.selectWrapper} dir="rtl">
      <select
        className={styles.select}
        onChange={onChange}
        defaultValue={defaultValue ? defaultValue : ""}
      >
        {items.map((item, index) => {
          return (
            <option value={item.name} key={index} className={styles.option}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default StatusSelect;
