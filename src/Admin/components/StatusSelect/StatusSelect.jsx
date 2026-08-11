import styles from "./StatusSelect.module.scss";

function StatusSelect({ items, onChange, defaultValue }) {
  return (
    <select
      className={`btnOutline ${styles.btn}`}
      onChange={onChange}
      defaultValue={defaultValue ? defaultValue : ""}
    >
      {items.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
}

export default StatusSelect;
