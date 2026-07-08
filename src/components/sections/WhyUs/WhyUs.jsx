import WhyUsCard from "../../cards/WhyUsCard/WhyUsCard";
import styles from "./WhyUs.module.scss";

import { PiMedalFill } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaShieldHalved } from "react-icons/fa6";

function WhyUs() {
  return (
    <>
      <div className={styles.whyUs}>
        <div className="container">
          <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 flex-row-reverse">
            <div className="col">
              <WhyUsCard icon={PiMedalFill} title="ضمانت اصالت" text="تمامی محصولات با گارانتی معتبر ارائه می‌شوند"/>
            </div>
            <div className="col">
              <WhyUsCard icon={FaTruck} title="ارسال سریع" text="تحویل درب منزل در سریع‌ترین زمان ممکن"/>
            </div>
            <div className="col">
              <WhyUsCard icon={MdOutlineSupportAgent} title="پشتیبانی ۲۴/۷" text="همیشه در کنار شما هستیم برای پاسخگویی"/>
            </div>
            <div className="col">
              <WhyUsCard icon={FaShieldHalved} title="پرداخت امن" text="درگاه‌های پرداخت مستقیم و کاملا امن"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyUs;
