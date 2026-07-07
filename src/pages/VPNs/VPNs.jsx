import styles from "./VPNs.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import IntroVPN from "../../components/sections/IntroVPN/IntroVPN";
import VPNCard from "../../components/cards/VPNCard/VPNCard";
import { useState } from "react";
import VPNGuide from "../../components/sections/VPNGuide/VPNGuide";

function VPNs() {
  const [vpns, setVpns] = useState(["", "", "", "", "", "", "", ""]);

  return (
    <>
      <HeaderNav />
      <div className={styles.VPNs}>
        <IntroVPN />
        <section className={styles.VPNsCards}>
          <div className="container">
            <h2 className={styles.title}>انتخاب پلن VPN</h2>
            <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
              {vpns.map((value) => {
                return (
                  <div className="col">
                    <VPNCard
                      id={1}
                      name={"پلن پایه"}
                      price={250000}
                      discount={50}
                      traffic={10}
                      duration={3}
                      userCount={1}
                      clientName={"V2RayN"}
                      protocol={"VLESS/VMESS"}
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
