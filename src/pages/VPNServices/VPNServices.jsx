import { useContext, useEffect, useState } from "react";
import styles from "./VPNServices.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import VPNServicesCard from "../../components/cards/VPNServicesCard/VPNServicesCard";
import { getUserVpnOrders } from "../../services/api";
import { Context } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaShoppingCart, FaLock, FaArrowLeft } from "react-icons/fa";

function VPNServices() {
  const { isLogin, isAuthChecking } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!isLogin) {
        setLoading(false);
        setOrders([]);
        return;
      }

      setLoading(true);
      const result = await getUserVpnOrders();
      if (result?.success && Array.isArray(result.data)) {
        setOrders(result.data);
      }
      setLoading(false);
    };

    if (!isAuthChecking) {
      fetchServices();
    }
  }, [isLogin, isAuthChecking]);

  return (
    <div>
      <HeaderNav />
      <section className={styles.vpnServices}>
        <h1 className={styles.title}>سرویس‌های VPN شما</h1>
        <div className="container">
          {loading || isAuthChecking ? (
            <div className="text-center py-5 text-secondary">
              <div className="spinner-border text-info mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div>درحال بارگذاری سرویس‌های VPN...</div>
            </div>
          ) : !isLogin ? (
            <div className="text-center py-5 my-4" dir="rtl">
              <div
                className="d-inline-flex p-4 rounded-circle mb-3"
                style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}
              >
                <FaLock size={44} />
              </div>
              <h4 className="text-white fw-bold mb-2">ورود به حساب کاربری</h4>
              <p className="text-secondary mb-4" style={{ maxWidth: "500px", margin: "0 auto 24px" }}>
                برای مشاهده سرویس‌های VPN خریداری‌شده و دریافت کانفیگ‌های اتصال، لطفاً وارد حساب کاربری خود شوید.
              </p>
              <Link to="/Auth" className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2">
                <span>ورود به حساب کاربری</span>
                <FaArrowLeft size={13} />
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-5 my-4" dir="rtl">
              <div
                className="d-inline-flex p-4 rounded-circle mb-3"
                style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}
              >
                <FaShieldAlt size={48} />
              </div>
              <h4 className="text-white fw-bold mb-2">هنوز هیچ سرویس VPN فعالی ندارید</h4>
              <p className="text-secondary mb-4" style={{ maxWidth: "500px", margin: "0 auto 24px" }}>
                برای دسترسی نامحدود به اینترنت آزاد و پرسرعت، یکی از پلن‌های اختصاصی ما را انتخاب کنید.
              </p>
              <Link to="/VPNs" className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2">
                <FaShoppingCart />
                <span>مشاهده و خرید پلن‌های VPN</span>
              </Link>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-lg-2">
              {orders.map((order) => (
                <div className="col d-flex align-items-stretch mb-4" key={order.id}>
                  <VPNServicesCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default VPNServices;
