import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/AppContext";
import { createVpnOrder } from "../../../services/api";
import { toPersianDigits } from "../../../utils/Utils";
import VPNCardBuy from "../../sections/VPNCardBuy/VPNCardBuy";
import VpnCardInfo from "../../sections/VpnCardInfo/VpnCardInfo";
import styles from "./VPNCard.module.scss";
import { confirmSwal, errorSwal, successSwal } from "../../../Swals/Swals";

function VPNCard({
  id,
  clientId,
  name,
  price,
  discount,
  traffic,
  duration,
  userCount,
  clientName,
  protocol,
}) {
  const { isLogin, userNumber } = useContext(Context);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

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

  const handleOrder = async () => {
    if (!isLogin) {
      errorSwal(
        "برای ثبت سفارش و خرید سرویس VPN، لطفاً ابتدا وارد حساب کاربری خود شوید.",
        "ورود الزامی است",
      );
      navigate("/Auth");
      return;
    }

    const confirmed = await confirmSwal(
      `آیا از ثبت سفارش پلن «${name}» اطمینان دارید؟ پس از ثبت، سفارش در وضعیت «درحال آماده‌سازی» قرار می‌گیرد.`,
      "تأیید سفارش VPN",
      "بله، ثبت سفارش",
    );

    if (!confirmed) return;

    setSubmitting(true);
    const result = await createVpnOrder({
      planId: id,
      clientId: clientId,
      phone: userNumber,
    });
    setSubmitting(false);

    if (result?.success) {
      successSwal(
        "سفارش شما با موفقیت ثبت شد و در وضعیت «درحال آماده‌سازی» قرار گرفت.",
        "سفارش ثبت شد",
      );
      navigate("/VPNServices");
    } else {
      errorSwal(result?.message || "خطا در ثبت سفارش VPN", "خطا");
    }
  };

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
      <button
        type="button"
        className={`btnPrimary ${styles.btn}`}
        onClick={handleOrder}
        disabled={submitting}
      >
        {submitting ? "درحال ثبت سفارش..." : "ثبت سفارش"}
      </button>
    </div>
  );
}

export default VPNCard;
