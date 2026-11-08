import { Link } from "react-router-dom";
import styles from "./PanelCard.module.scss";
import { FaArrowLeft } from "react-icons/fa";

function PanelCard({
  title,
  text,
  icon: Icon,
  color = "#1499e6",
  link,
  badge = "آمار زنده",
}) {
  const content = (
    <div
      className={styles.card}
      style={{
        "--accent-color": color,
      }}
    >
      <div className={styles.topRow}>
        <div className={styles.iconBox}>
          {Icon ? <Icon className={styles.icon} /> : <div className={styles.dot} />}
        </div>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.mainInfo}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{text}</span>
      </div>

      {link && (
        <div className={styles.cardFooter}>
          <span className={styles.linkText}>مشاهده و مدیریت</span>
          <FaArrowLeft className={styles.arrowIcon} />
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to={link} className={styles.cardLink}>
        {content}
      </Link>
    );
  }

  return content;
}

export default PanelCard;
