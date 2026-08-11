import { toPersianDigits } from "../../../utils/Utils";
import VPNCardBuy from "../../sections/VPNCardBuy/VPNCardBuy";
import VpnCardInfo from "../../sections/VpnCardInfo/VpnCardInfo";
import styles from "./VPNCard.module.scss";

function VPNCard({
  id,
  name,
  price,
  discount,
  traffic,
  duration,
  userCount,
  clientName,
  protocol,
}) {
  let vpnTraffic, vpnUserCount, vpnDuration;

  vpnUserCount = `${toPersianDigits(userCount)} نفر`;
  if (traffic <= 0) {
    vpnTraffic = "نامحدود";
  } else {
    vpnTraffic = `${toPersianDigits(traffic)} گیگ`;
  }
  if (duration <= 0) {
    vpnDuration = "نامحدود";
  } else {
    vpnDuration = `${toPersianDigits(duration)} ماه`;
  }

  return (
    <div className={styles.vpnCard}>
      <h3 className={styles.title}>{name}</h3>
      <ul className={styles.info}>
        <VpnCardInfo title={"مدت زمان"} text={vpnDuration} />
        <VpnCardInfo title={"حجم"} text={vpnTraffic} />
        <VpnCardInfo title={"تعداد کاربر"} text={vpnUserCount} />
        <VpnCardInfo title={"کلاینت"} text={clientName} />
        <VpnCardInfo title={"پروتکل"} text={protocol} />
      </ul>
      <VPNCardBuy price={price} discount={discount} />
      <button className={`btnPrimary ${styles.btn}`}>ثبت سفارش</button>
    </div>
  );
}

export default VPNCard;
