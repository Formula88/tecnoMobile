import styles from "./UserCard.module.scss";
import userIcon from "../../../assets/img/userCard.svg";
import { toPersianDigits } from "../../../utils/Utils";
function UserCard({ userNumber }) {
  return (
    <div className={styles.userCard}>
      <img src={userIcon} className={styles.icon} />
      <h1 className={styles.title}>
        شماره موبایل : {toPersianDigits(userNumber)}
      </h1>
    </div>
  );
}

export default UserCard;
