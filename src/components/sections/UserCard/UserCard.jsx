import styles from "./UserCard.module.scss";
import userIcon from "../../../assets/img/userCard.svg";
import { toPersianDigits } from "../../../utils/Utils";

function UserCard({ userName, userEmail, userNumber, userType }) {
  const displayName = userName || (userNumber ? `کاربر ${toPersianDigits(userNumber)}` : "کاربر تکنوموبایل");

  return (
    <div className={styles.userCard}>
      <img src={userIcon} alt="پروفایل کاربر" className={styles.icon} />
      <div className={styles.userInfo}>
        <h1 className={styles.title}>{displayName}</h1>
        {userEmail && <p className={styles.meta}>{userEmail}</p>}
        {userNumber && (
          <p className={styles.phone}>
            شماره تماس: {toPersianDigits(userNumber)}
          </p>
        )}
        {userType === "admin" && (
          <span className={styles.roleBadge}>مدیر سیستم</span>
        )}
      </div>
    </div>
  );
}

export default UserCard;
