import { useContext } from "react";
import ShoppingCartCard from "../../components/cards/ShoppingCartCard/ShoppingCartCard";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import CheckoutSummary from "../../components/sections/CheckoutSummary/CheckoutSummary";
import styles from "./ShoppingCart.module.scss";
import { FaCartShopping } from "react-icons/fa6";
import { Context } from "../../context/AppContext";
function ShoppingCart() {
  const { cardItem } = useContext(Context);
  
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
            <div className="col-lg-4 col-12">
              <CheckoutSummary />
            </div>
            <div className="col-lg-8 col-12">
              <div className={styles.ShoppingCartCards}>
                {cardItem.map((item) => {
                  return <ShoppingCartCard {...item} key={`${item.id}-${item.model}`}/>;
                })}
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
