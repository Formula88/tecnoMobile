import styles from "./IntroVPN.module.scss";
import { MdOutlineSpeed } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import IntroVPNCard from "../../cards/IntroVPNCard/IntroVPNCard";

function IntroVPN() {
  return (
    <div className={styles.introVPN}>
      <h1 className={styles.title}>
        دسترسی امن و بدون محدودیت با <span>تکنوموبایل</span>
      </h1>
      <p className={styles.description}>
        سرویس‌های اختصاصی با بالاترین پایداری و امنیت، طراحی شده برای حرفه‌ای‌ها
        و کاربران خاص تکنوموبایل.
      </p>
      <div className={styles.introCards}>
        <IntroVPNCard icon={<MdOutlineSpeed />} text={"سرعت بالا"} />
        <IntroVPNCard icon={<FaShieldAlt />} text={"پایداری کامل"} />
        <IntroVPNCard
          icon={<MdOutlineSupportAgent />}
          text={"پشتیبانی ۲۴ ساعته"}
        />
      </div>
    </div>
  );
}

export default IntroVPN;
