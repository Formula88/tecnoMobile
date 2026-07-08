import styles from "./VPNs.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import IntroVPN from "../../components/sections/IntroVPN/IntroVPN";
import VPNCard from "../../components/cards/VPNCard/VPNCard";
import { useEffect, useState } from "react";
import VPNGuide from "../../components/sections/VPNGuide/VPNGuide";
import { GetVPNPlan } from "../../services/api";
import { ServerErrorSwal } from "../../Swals/Swals";

function VPNs() {
  const [vpnPlan, setVpnPlan] = useState([]);

  useEffect(() => {
    GetVPNPlan().then((result) => {
      if (result?.success === true) {
        setVpnPlan(result.data);
      } else {
        ServerErrorSwal();
      }
    });
  });
  return (
    <>
      <HeaderNav />
      <div className={styles.VPNs}>
        <IntroVPN />
        <section className={styles.VPNsCards}>
          <div className="container">
            <h2 className={styles.title}>انتخاب پلن VPN</h2>
            <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
              {vpnPlan.map((value) => {
                return (
                  <div className="col">
                    <VPNCard
                      id={value.id}
                      name={value.name}
                      price={value.price}
                      discount={value.discount}
                      traffic={value.traffic}
                      duration={value.duration}
                      userCount={value.userCount}
                      clientName={value.clientName}
                      protocol={value.protocol}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <VPNGuide />
      </div>
      <Footer />
    </>
  );
}
export default VPNs;
