import styles from "./VPNServices.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";

function VPNServices() {
  return (
    <div>
      <HeaderNav />
      <section className={styles.vpnServices}></section>
      <Footer />
    </div>
  );
}

export default VPNServices;
