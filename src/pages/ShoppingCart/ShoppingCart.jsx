import ShoppingCartCard from "../../components/cards/ShoppingCartCard/ShoppingCartCard";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import CheckoutSummary from "../../components/sections/CheckoutSummary/CheckoutSummary";
import styles from "./ShoppingCart.module.scss";
import { FaCartShopping } from "react-icons/fa6";
function ShoppingCart() {
  return (
    <>
      <HeaderNav />
      <div className={styles.ShoppingCart}>
        <div className={styles.title}>
          <FaCartShopping />
          <h1 className={styles.titleText}>سبد خرید</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <CheckoutSummary />
            </div>
            <div className="col-8">
              <div className={styles.ShoppingCartCards}>
                <ShoppingCartCard />
                <ShoppingCartCard />
                <ShoppingCartCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingCart;
