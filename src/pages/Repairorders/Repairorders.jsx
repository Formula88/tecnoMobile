import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./Repairorders.module.scss";

function Repairorders() {
  return (
    <div>
      <HeaderNav />
      <div className={styles.repairorders}>
        <h1 className={styles.title}>رزرو تعمیرات</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Repairorders;
