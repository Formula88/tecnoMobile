import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./ShoppingCart.module.scss";

function ShoppingCart() {
  return (
    <>
      <HeaderNav />
      <div className={styles.ShoppingCart}></div>
      <Footer />
    </>
  );
}

export default ShoppingCart;
