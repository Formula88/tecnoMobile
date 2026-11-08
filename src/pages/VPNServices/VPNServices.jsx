import { useEffect, useState } from "react";
import styles from "./VPNServices.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import VPNServicesCard from "../../components/cards/VPNServicesCard/VPNServicesCard";
import { getUserVpnOrders } from "../../services/api";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaShoppingCart } from "react-icons/fa";

function VPNServices() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const result = await getUserVpnOrders();
      if (result?.success && Array.isArray(result.data)) {
        setOrders(result.data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div>
      <HeaderNav />
      <section className={styles.vpnServices}>
        <h1 className={styles.title}>سرویس‌های VPN شما</h1>
        <div className="container">
          {loading ? (
            <div className="text-center py-5 text-secondary">
              <div className="spinner-border text-info mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div>درحال بارگذاری سرویس‌های VPN...</div>
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
              <p className="text-secondary mb-4">
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
                <div className="col" key={order.id}>
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
