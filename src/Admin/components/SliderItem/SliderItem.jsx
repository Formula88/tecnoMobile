import { NavLink } from "react-router-dom";
import styles from "./SliderItem.module.scss";

function SliderItem({ title, items, onItemClick }) {
  return (
    <div className={styles.itemBox}>
      <span className={styles.groupTitle}>{title}</span>
      <ul className={styles.list}>
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <NavLink
                to={item.link}
                onClick={onItemClick}
                end={item.link === "/admin/panel" || item.link === "/"}
                className={({ isActive }) =>
                  `${styles.item} ${isActive ? styles.activeItem : ""}`
                }
              >
                {Icon && <Icon className={styles.icon} />}
                <span className={styles.itemTitle}>{item.text}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SliderItem;
