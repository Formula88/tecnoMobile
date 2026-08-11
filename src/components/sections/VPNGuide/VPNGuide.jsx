import styles from "./VPNGuide.module.scss";
import { FaDownload } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import VPNGuideCard from "../../cards/VPNGuideCard/VPNGuideCard";

function VPNGuide() {
  return (
    <section className={`container ${styles.vpnGuide}`}>
        <h2 className={styles.title}>راهنمای اتصال سریع</h2>
      <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
        <div className="col">
          <VPNGuideCard
            icon={<FaDownload/>}
            title={"۱. دانلود اپلیکیشن"}
            description={"کلاینت مورد نظر را دانلود و نصب کنید."}
          />
        </div>
        <div className="col">
          <VPNGuideCard
            icon={<FaMoneyBills/>}
            title={"۲. خرید اشتراک"}
            description={"پلن مورد نظر خود را انتخاب و فعال کنید."}
          />
        </div>
        <div className="col">
          <VPNGuideCard
            icon={<IoCopy/>}
            title={"۳. کپی کد اتصال"}
            description={"کانفیگ را از پنل کاربری کپی کنید."}
          />
        </div>
        <div className="col">
          <VPNGuideCard
            icon={<FaGlobe/>}
            title={"۴. اتصال امن"}
            description={"کانفیگ را در اپلیکیشن وارد کرده و متصل شوید."}
          />
        </div>
      </div>
    </section>
  );
}

export default VPNGuide;
