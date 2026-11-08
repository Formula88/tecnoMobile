import styles from "./RepairorderCard.module.scss";
import { FaUser, FaPhone, FaTools } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { toPersianDigits } from "../../../utils/Utils";

function RepairorderCard({ fullName, phoneNumber, deviceType, serviceType, reviewed, status }) {
  const isReviewed = reviewed || status === "reviewed";
  const isCancelled = status === "cancelled";

  return (
    <div className={styles.repairorderCard}>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaUser />
            </div>
            <div className={styles.title}>نام و نام‌خانوادگی :</div>
            <div className={styles.text}>{fullName || "کاربر"}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaPhone />
            </div>
            <div className={styles.title}>شماره تماس :</div>
            <div className={styles.text}>{toPersianDigits(phoneNumber || "")}</div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <MdDevices />
            </div>
            <div className={styles.title}>دستگاه مورد نظر :</div>
            <div className={styles.text}>{deviceType || "ثبت نشده"}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaTools />
            </div>
            <div className={styles.title}>نوع سرویس :</div>
            <div className={styles.text}>{serviceType || "ثبت نشده"}</div>
          </div>
        </div>
      </div>
      {isReviewed ? (
        <span className={styles.reviewed}>بررسی شده است</span>
      ) : isCancelled ? (
        <span className={styles.noReviewed} style={{ borderColor: "#ef4444", color: "#f87171" }}>
          لغو شده
        </span>
      ) : (
        <span className={styles.noReviewed}>درحال بررسی ...</span>
      )}
    </div>
  );
}

export default RepairorderCard;
