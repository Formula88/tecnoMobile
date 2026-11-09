import { useEffect, useState } from "react";
import OrderCard from "../../components/cards/OrderCard/OrderCard";
import { OrderCardSkeleton } from "../../components/ui/Skeleton/Skeleton";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./Orders.module.scss";
import { getUserOrders } from "../../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders().then((result) => {
      if (result?.success && Array.isArray(result.data)) {
        setOrders(result.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <HeaderNav />
      <div className={styles.orders}>
        <h1 className={styles.title}>سفارشات شما</h1>
        <div className="container">
          {loading ? (
            <div>
              {Array.from({ length: 3 }).map((_, idx) => (
                <OrderCardSkeleton key={idx} />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-secondary py-5">هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
          ) : (
            <div className={styles.cards}>
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  status={order.status}
                  totalPrice={order.totalPrice}
                  createdAt={order.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
