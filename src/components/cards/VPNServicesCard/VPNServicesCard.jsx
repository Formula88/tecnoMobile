import styles from "./VPNServicesCard.module.scss";
import { FaDatabase } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";
import { BiLink } from "react-icons/bi";
import { IoQrCode } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { successSwal } from "../../../Swals/Swals";

function VPNServicesCard() {
  const handleCopyLink = () => {
    navigator.clipboard?.writeText("vless://tecnomobile-sample-config@127.0.0.1:443?security=reality");
    successSwal("لینک کانفیگ در کلیپ‌بورد کپی شد", "کپی شد");
  };

  const handleQrCode = () => {
    successSwal("بارکد QR کانفیگ فعال است", "QR Code");
  };

  const handleDownload = () => {
    window.open("https://github.com/2dust/v2rayNG/releases", "_blank");
  };

  return (
    <div className={styles.VPNServicesCard}>
      <div className={styles.right}>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaDatabase />
          </div>
          <h2 className={styles.title}>حجم : ۵۰ گیگابایت</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaRegCalendar />
          </div>
          <h2 className={styles.title}>مدت زمان : ۱ ماه</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FiUsers />
          </div>
          <h2 className={styles.title}>تعداد کاربر : ۲ کاربر</h2>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <FaRegCalendar />
          </div>
          <h2 className={styles.title}>وضعیت : فعال</h2>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.feature}>
          <h2 className={styles.title}>کلاینت : V2Ray / v2rayNG</h2>
        </div>
        <div className={`btnOutline ${styles.btn}`} onClick={handleCopyLink} style={{ cursor: "pointer" }}>
          <div className={styles.icon}>
            <BiLink />
          </div>
          <span className={styles.title}>دریافت لینک</span>
        </div>
        <div className={`btnOutline ${styles.btn}`} onClick={handleQrCode} style={{ cursor: "pointer" }}>
          <div className={styles.icon}>
            <IoQrCode />
          </div>
          <span className={styles.title}>دریافت QR code</span>
        </div>
        <div className={`btnOutline ${styles.btn}`} onClick={handleDownload} style={{ cursor: "pointer" }}>
          <div className={styles.icon}>
            <HiOutlineDownload />
          </div>
          <span className={styles.title}>دانلود کلاینت</span>
        </div>
      </div>
    </div>
  );
}

export default VPNServicesCard;
