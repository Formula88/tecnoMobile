import styles from "./Profile.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import UserCard from "../../components/sections/UserCard/UserCard";
import ProfileCard from "../../components/cards/ProfileCard/ProfileCard";
import { FaCartShopping } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
import { FaShield } from "react-icons/fa6";
import { useContext } from "react";
import { Context } from "../../context/AppContext";

function profile() {
  const links = {
    VPNServices: "/VPNServices",
    ShoppingCart: "/ShoppingCart",
    Repairorders: "/Repairorders",
    Orders: "/Orders",
  };

  const { userNumber } = useContext(Context);

  return (
    <div>
      <HeaderNav />
      <section className={styles.profile}>
        <div className="container">
          <UserCard userNumber={userNumber} />
          <div className={styles.profileCards}>
            <ProfileCard
              icon={<FaCartShopping />}
              title={"سبد خرید"}
              link={links.ShoppingCart}
            />
            <ProfileCard
              icon={<FaBagShopping />}
              title={"سفارشات شما"}
              link={links.Orders}
            />
            <ProfileCard
              icon={<FaShield />}
              title={"سرویس های VPN"}
              link={links.VPNServices}
            />
            <ProfileCard
              icon={<AiFillTool />}
              title={"رزرو تعمیرات"}
              link={links.Repairorders}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default profile;
