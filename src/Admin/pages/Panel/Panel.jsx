import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import PanelCard from "../../components/PanelCard/PanelCard";
import SystemDiagnostics from "../../components/SystemDiagnostics/SystemDiagnostics";
import styles from "./Panel.module.scss";
import { getAdminStats } from "../../../services/api";
import { toPersianDigits } from "../../../utils/Utils";

import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaTools,
  FaClipboardCheck,
  FaMobile,
  FaPlus,
} from "react-icons/fa";
import { MdFactory, MdVpnKey, MdSettingsApplications } from "react-icons/md";

function Panel() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    brands: 0,
    vpnPlans: 0,
    vpnClients: 0,
    services: 0,
    repairOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAdminStats().then((result) => {
      if (isMounted) {
        if (result?.success && result.data) {
          setStats(result.data);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      title: "تعداد کل کاربران",
      text: `${toPersianDigits(stats.users)} نفر`,
      icon: FaUsers,
      color: "#38bdf8",
      link: "/admin/users",
      badge: "اعضا",
    },
    {
      title: "سفارشات خرید فروشگاه",
      text: `${toPersianDigits(stats.orders)} سفارش`,
      icon: FaShoppingCart,
      color: "#10b981",
      link: "/admin/products/orders",
      badge: "فروش کالا",
    },
    {
      title: "تعداد کل محصولات",
      text: `${toPersianDigits(stats.products)} کالا`,
      icon: FaBoxOpen,
      color: "#f59e0b",
      link: "/admin/products/mobile",
      badge: "انبار",
    },
    {
      title: "برندهای ثبت‌شده",
      text: `${toPersianDigits(stats.brands)} برند`,
      icon: MdFactory,
      color: "#a855f7",
      link: "/admin/brands",
      badge: "دسته‌بندی",
    },
    {
      title: "پلن‌های اشتراک VPN",
      text: `${toPersianDigits(stats.vpnPlans)} پلن`,
      icon: MdVpnKey,
      color: "#06b6d4",
      link: "/admin/vpn",
      badge: "سرویس‌ها",
    },
    {
      title: "کلاینت‌های متصل VPN",
      text: `${toPersianDigits(stats.vpnClients)} کلاینت`,
      icon: MdSettingsApplications,
      color: "#ec4899",
      link: "/admin/vpnClients",
      badge: "زیرساخت",
    },
    {
      title: "خدمات فنی و تعمیرات",
      text: `${toPersianDigits(stats.services)} خدمت`,
      icon: FaTools,
      color: "#6366f1",
      link: "/admin/services",
      badge: "سرویس فنی",
    },
    {
      title: "رزروهای خدمات و تعمیرات",
      text: `${toPersianDigits(stats.repairOrders)} درخواست`,
      icon: FaClipboardCheck,
      color: "#14b8a6",
      link: "/admin/ServiceReservation",
      badge: "در انتظار",
    },
  ];

  const quickActions = [
    {
      title: "افزودن موبایل جدید",
      link: "/admin/products/mobile/add",
      icon: FaMobile,
      color: "#38bdf8",
    },
    {
      title: "ثبت برند تازه",
      link: "/admin/brands/add",
      icon: FaPlus,
      color: "#a855f7",
    },
    {
      title: "مشاهده سفارشات خرید",
      link: "/admin/products/orders",
      icon: FaShoppingCart,
      color: "#10b981",
    },
    {
      title: "رزروهای تعمیراتی",
      link: "/admin/ServiceReservation",
      icon: FaTools,
      color: "#14b8a6",
    },
    {
      title: "سفارشات اکانت VPN",
      link: "/admin/VPNOrders",
      icon: MdVpnKey,
      color: "#06b6d4",
    },
  ];

  return (
    <AdminLayout>
      <div className={styles.dashboardContainer} dir="rtl">
        {/* Welcome Hero Banner */}
        <div className={styles.heroBanner}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>پیشخوان مدیریت تکنوموبایل</h2>
            <p className={styles.heroSubtitle}>
              مرکز نظارت و کنترل هوشمند فروشگاه، مدیریت محصولات، سفارشات کاربران و سلامت سیستم
            </p>
          </div>
          <div className={styles.heroDateBadge}>
            <span className={styles.dot} />
            <span>پنل ادمین فعال و برخط</span>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>دسترسی سریع به بخش‌های پرکاربرد</h3>
        </div>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                to={action.link}
                key={index}
                className={styles.actionPill}
                style={{ "--action-color": action.color }}
              >
                <div className={styles.actionIconBox}>
                  <Icon />
                </div>
                <span>{action.title}</span>
              </Link>
            );
          })}
        </div>

        {/* 8 Stats Cards Grid */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>خلاصه آمار کلی سیستم</h3>
          {loading && <span className={styles.loadingBadge}>درحال به‌روزرسانی آمار...</span>}
        </div>
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-3">
          {cards.map((value, index) => (
            <div className="col" key={index}>
              <PanelCard
                title={value.title}
                text={value.text}
                icon={value.icon}
                color={value.color}
                link={value.link}
                badge={value.badge}
              />
            </div>
          ))}
        </div>

        {/* Live Diagnostics & System Health Monitoring */}
        <div className={styles.diagnosticsSection}>
          <SystemDiagnostics />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Panel;
