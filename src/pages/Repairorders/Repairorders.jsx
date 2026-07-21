import RepairorderCard from "../../components/cards/RepairorderCard/RepairorderCard";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./Repairorders.module.scss";

function Repairorders() {
  return (
    <div>
      <HeaderNav />
      <div className={styles.repairorders}>
        <h1 className={styles.title}>رزرو تعمیرات</h1>
        <div className="container">
          <div className="row row-cols-xl-2 row-cols-1">
            <div className="col">
              <RepairorderCard reviewed={true} />
            </div>
            <div className="col">
              <RepairorderCard reviewed={true} />
            </div>
            <div className="col">
              <RepairorderCard reviewed={false} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Repairorders;
