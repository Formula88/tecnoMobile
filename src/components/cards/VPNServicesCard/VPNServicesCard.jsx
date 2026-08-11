import styles from "./VPNServicesCard.module.scss";
import { FaDatabase } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";
import { BiLink } from "react-icons/bi";
import { IoQrCode } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";

function VPNServicesCard() {
  return (
    <div className={styles.VPNServicesCard}>
      <div className={styles.right}>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaDatabase />
          </div>
          <h2 className={styles.title}>حجم : 10 گیگ</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaRegCalendar />
          </div>
          <h2 className={styles.title}>مدت زمان : 3 ماه</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FiUsers />
          </div>
          <h2 className={styles.title}>تعداد کاربر : 3 کاربر</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaRegCalendar />
          </div>
          <h2 className={styles.title}>تاریخ انقضای سرویس : 04/09/11</h2>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.feature}>
          <h2 className={styles.title}>کلاینت : open vpn</h2>
        </div>
        <div className={`btnOutline ${styles.btn}`}>
          <div className={styles.icon}>
            <BiLink />
          </div>
          <span className={styles.title}>دریافت لینک</span>
        </div>
        <div className={`btnOutline ${styles.btn}`}>
          <div className={styles.icon}>
            <IoQrCode />
          </div>
          <span className={styles.title}>دریافت QR code</span>
        </div>
        <div className={`btnOutline ${styles.btn}`}>
          <div className={styles.icon}>
            <HiOutlineDownload />
          </div>
          <span className={styles.title}>دانلود open vpn</span>
        </div>
      </div>
    </div>
  );
}

export default VPNServicesCard;
