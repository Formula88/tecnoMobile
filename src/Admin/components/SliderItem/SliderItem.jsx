import { Link } from "react-router-dom";
import styles from "./SliderItem.module.scss";

function SliderItem({ title, items }) {
  return (
    <div className={styles.itemBox}>
      <h2 className={styles.title}>{title}</h2>
      <ul>
        {items.map((value, index) => {
          return (
            <li key={index}>
              <Link to={value.link} className={styles.item}>
                {<value.icon />}
                <span className={styles.itemTitle}>{value.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SliderItem;
