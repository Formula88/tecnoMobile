import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./Orders.module.scss";

function Orders() {
  return (
    <>
      <HeaderNav />
      <div className={styles.orders}>
        <h1 className={styles.title}>سفارشات شما</h1>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
