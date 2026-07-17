import styles from "./VPNServices.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import VPNServicesCard from "../../components/cards/VPNServicesCard/VPNServicesCard";

function VPNServices() {
  return (
    <div>
      <HeaderNav />
      <section className={styles.vpnServices}>
        <h1 className={styles.title}>سرویس های VPN شما</h1>
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <VPNServicesCard />
            </div>
            <div className="col">
              <VPNServicesCard />
            </div>
            <div className="col">
              <VPNServicesCard />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default VPNServices;
