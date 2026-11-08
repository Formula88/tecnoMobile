import styles from "./Profile.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import UserCard from "../../components/sections/UserCard/UserCard";
import ProfileCard from "../../components/cards/ProfileCard/ProfileCard";
import { FaCartShopping, FaBagShopping, FaShield } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { Context } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { confirmSwal, successSwal } from "../../Swals/Swals";

function Profile() {
  const links = {
    VPNServices: "/VPNServices",
    ShoppingCart: "/ShoppingCart",
    Repairorders: "/Repairorders",
    Orders: "/Orders",
  };

  const { userNumber, logoutUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await confirmSwal("آیا می‌خواهید از حساب کاربری خود خارج شوید؟", "خروج از حساب", "بله، خارج شو");
    if (confirmed) {
      await logoutUser();
      successSwal("با موفقیت از حساب کاربری خارج شدید", "خروج");
      navigate("/");
    }
  };

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

          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 py-2"
              style={{ borderRadius: "10px" }}
            >
              <FiLogOut />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
