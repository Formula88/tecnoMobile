import { Link } from "react-router-dom";
import styles from "./ProfileCard.module.scss";
import { FaChevronLeft } from "react-icons/fa";

function ProfileCard({ icon , title , link}) {
  return (
    <Link to={link} className={styles.profileCard}>
      <div className={styles.right}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <FaChevronLeft className={styles.arrowLeft} />
    </Link>
  );
}

export default ProfileCard;
