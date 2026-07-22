import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./OrderDetails.module.scss";

function OrderDetails() {
  return (
    <>
      <HeaderNav />
      <div className={styles.orderDetails}>
        <h1 className={styles.title}>جزئیات سفارش</h1>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
