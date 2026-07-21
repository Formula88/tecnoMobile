import styles from "./RepairorderCard.module.scss";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
function RepairorderCard({ reviewed }) {
  return (
    <div className={styles.repairorderCard}>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaUser />
            </div>
            <div className={styles.title}>نام و نام‌خانوادگی :</div>
            <div className={styles.text}>علی محمدی</div>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaPhone />
            </div>
            <div className={styles.title}>شماره تماس :</div>
            <div className={styles.text}>09129072416</div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <MdDevices />
            </div>
            <div className={styles.title}>دستگاه مورد نظر :</div>
            <div className={styles.text}>تبلت</div>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <FaTools />
            </div>
            <div className={styles.title}>نوع سرویس :</div>
            <div className={styles.text}>مشاوره فنی</div>
          </div>
        </div>
      </div>
      {reviewed && <span className={styles.reviewed}>برسی شده است</span>}
      {!reviewed && <span className={styles.noReviewed}>درحال برسی ...</span>}
    </div>
  );
}

export default RepairorderCard;
