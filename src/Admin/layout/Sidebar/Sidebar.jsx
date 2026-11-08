import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import logo from "../../../assets/img/logo.svg";
import SliderItem from "../../components/SliderItem/SliderItem";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { BiSolidHomeAlt2 } from "react-icons/bi";
import { MdVpnKey, MdFactory, MdSettingsApplications } from "react-icons/md";
import { FaTools, FaListUl, FaMobile, FaHeadphones, FaTimes, FaShieldAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiCpuChip } from "react-icons/hi2";
import { TbDeviceMobilePlus } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Context } from "../../../context/AppContext";
import { confirmSwal, successSwal } from "../../../Swals/Swals";

const sidebarSections = [
  {
    title: "پیشخوان و نظارت",
    items: [
      { link: "/admin/panel", icon: BiSolidHomeAlt2, text: "داشبورد مدیریت" },
      { link: "/admin/users", icon: FaUserGroup, text: "مدیریت کاربران" },
    ],
  },
  {
    title: "محصولات و فروشگاه",
    items: [
      { link: "/admin/brands", icon: MdFactory, text: "برندها" },
      { link: "/admin/products/mobile", icon: FaMobile, text: "موبایل‌ها" },
      { link: "/admin/products/hardware", icon: HiCpuChip, text: "سخت‌افزارها" },
      { link: "/admin/products/accessories", icon: FaHeadphones, text: "لوازم جانبی" },
      { link: "/admin/products/accessoriesmodel", icon: TbDeviceMobilePlus, text: "لوازم جانبی مدل‌دار" },
      { link: "/admin/products/orders", icon: FaClipboardList, text: "سفارشات فروشگاه" },
    ],
  },
  {
    title: "سرویس‌های VPN",
    items: [
      { link: "/admin/vpnClients", icon: MdSettingsApplications, text: "کلاینت‌ها" },
      { link: "/admin/vpn", icon: MdVpnKey, text: "پلن‌های VPN" },
      { link: "/admin/VPNOrders", icon: FaListUl, text: "سفارشات VPN" },
    ],
  },
  {
    title: "خدمات و تعمیرات",
    items: [
      { link: "/admin/services", icon: FaTools, text: "مدیریت خدمات" },
      { link: "/admin/ServiceReservation", icon: FaClipboardList, text: "رزروهای خدمات" },
    ],
  },
];

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { logoutUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await confirmSwal(
      "آیا می‌خواهید از پنل مدیریت خارج شوید؟",
      "خروج از حساب ادمین",
      "بله، خارج شو"
    );
    if (confirmed) {
      await logoutUser();
      successSwal("با موفقیت از حساب مدیریت خارج شدید", "خروج موفق");
      navigate("/");
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} dir="rtl">
      {/* Sidebar Header */}
      <div className={styles.header}>
        <div className={styles.brandBox}>
          <Link to="/admin/panel" className={styles.logoLink} onClick={onClose}>
            <img src={logo} alt="tecnoMobile" className={styles.logo} />
          </Link>
          <span className={styles.adminBadge}>پنل مدیریت</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="بستن منو"
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation Links with OverlayScrollbars */}
      <OverlayScrollbarsComponent
        className={styles.scrollArea}
        options={{ scrollbars: { autoHide: "leave", autoHideDelay: 300 } }}
      >
        <nav className={styles.nav}>
          {sidebarSections.map((section, index) => (
            <SliderItem
              key={index}
              title={section.title}
              items={section.items}
              onItemClick={onClose}
            />
          ))}
        </nav>
      </OverlayScrollbarsComponent>

      {/* Sidebar Footer with Admin Profile & Logout */}
      <div className={styles.footer}>
        <div className={styles.profileBox}>
          <div className={styles.avatar}>
            <FaShieldAlt />
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.adminName}>مدیر سیستم</span>
            <span className={styles.adminRole}>Super Admin</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className={styles.logoutBtn}
          title="خروج از پنل مدیریت"
        >
          <FiLogOut />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
