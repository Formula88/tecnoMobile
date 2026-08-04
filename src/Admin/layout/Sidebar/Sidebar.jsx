import styles from "./Sidebar.module.scss";
import logo from "../../../assets/img/logo.svg";
import SliderItem from "../../components/SliderItem/SliderItem";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { BiSolidHomeAlt2 } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { MdVpnKey } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

import { LuLayoutPanelTop } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";

import { MdFactory } from "react-icons/md";
import { FaMobile } from "react-icons/fa6";
import { HiCpuChip } from "react-icons/hi2";
import { FaHeadphones } from "react-icons/fa6";
import { TbDeviceMobilePlus } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";

import { MdSettingsApplications } from "react-icons/md";
const sidebarItems = [
  {
    title: "لینک صفحات",
    items: [
      { link: "/", icon: BiSolidHomeAlt2, text: "خانه" },
      { link: "/products", icon: AiFillProduct, text: "محصولات" },
      { link: "/VPN", icon: MdVpnKey, text: "VPN" },
      { link: "/Services", icon: FaTools, text: "خدمات" },
      { link: "/AboutUs", icon: FaListUl, text: "درباره ما" },
    ],
  },
  {
    title: "صفحات کاربردی",
    items: [
      { link: "/admin/panel", icon: LuLayoutPanelTop, text: "پنل ادمین" },
      { link: "/admin/users", icon: FaUserGroup, text: "کاربران" },
    ],
  },
  {
    title: "محصولات",
    items: [
      { link: "/admin/brands", icon: MdFactory, text: "برند ها" },
      { link: "/admin/products/mobile", icon: FaMobile, text: "موبایل ها" },
      {
        link: "/admin/products/hardware",
        icon: HiCpuChip,
        text: "سخت افزار ها",
      },
      {
        link: "/admin/products/accessories",
        icon: FaHeadphones,
        text: "لوازم جانبی",
      },
      {
        link: "/admin/products/accessoriesmodel",
        icon: TbDeviceMobilePlus,
        text: "لوازم جانبی مدل دار",
      },
      { link: "", icon: FaClipboardList, text: "سفارشات" },
    ],
  },
  {
    title: "VPN",
    items: [
      {
        link: "/admin/vpnClients",
        icon: MdSettingsApplications,
        text: "کلاینت ها",
      },
      { link: "/admin/vpn", icon: MdVpnKey, text: "وی پی ان ها" },
      { link: "", icon: FaClipboardList, text: "سفارشات وی پی ان" },
    ],
  },
  {
    title: "خدمات",
    items: [
      { link: "/admin/services", icon: FaTools, text: "مدریت خدمات" },
      { link: "", icon: FaClipboardList, text: "رزرو خدمات" },
    ],
  },
];

function Sidebar() {
  return (
    <OverlayScrollbarsComponent
      className={styles.Sidebar}
      options={{ scrollbars: { visibility: "hidden" } }}
    >
      <img src={logo} alt="tecnoMobile" className={styles.logo} />
      <div className={styles.items}>
        {sidebarItems.map((item, index) => {
          return (
            <SliderItem title={item.title} items={item.items} key={index} />
          );
        })}
      </div>
    </OverlayScrollbarsComponent>
  );
}

export default Sidebar;
