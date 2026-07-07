import { toPersianDigits } from "../../../utils/Utils";
import styles from "./VPNGuideCard.module.scss";
function VPNGuideCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{toPersianDigits(title)}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default VPNGuideCard;
