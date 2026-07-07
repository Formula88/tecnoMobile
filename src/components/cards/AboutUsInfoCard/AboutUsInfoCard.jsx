import { FaRegCheckCircle } from "react-icons/fa";
import styles from "./AboutUsInfoCard.module.scss";

function AboutUsInfoCard({ title, text }) {
  return (
    <li className={styles.infoCard}>
      <FaRegCheckCircle />
      <div className={styles.box}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{text}</p>
      </div>
    </li>
  );
}

export default AboutUsInfoCard;
