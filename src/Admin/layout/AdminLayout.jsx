import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import AdminErrorBoundary from "../components/AdminErrorBoundary/AdminErrorBoundary";
import { FaBars, FaStore, FaExternalLinkAlt } from "react-icons/fa";

// Breadcrumb & Page title mapping based on pathname
const routeTitles = {
  "/admin/panel": { title: "داشبورد و آمار سیستم", category: "پیشخوان" },
  "/admin/users": { title: "مدیریت کاربران", category: "کاربران" },
  "/admin/brands": { title: "مدیریت برندها", category: "محصولات" },
  "/admin/brands/add": { title: "افزودن برند جدید", category: "محصولات" },
  "/admin/products/mobile": { title: "مدیریت موبایل‌ها", category: "محصولات" },
  "/admin/products/mobile/add": { title: "افزودن موبایل جدید", category: "محصولات" },
  "/admin/products/hardware": { title: "مدیریت سخت‌افزارها", category: "محصولات" },
  "/admin/products/hardware/add": { title: "افزودن قطعه سخت‌افزاری", category: "محصولات" },
  "/admin/products/accessories": { title: "مدیریت لوازم جانبی", category: "محصولات" },
  "/admin/products/accessories/add": { title: "افزودن لوازم جانبی", category: "محصولات" },
  "/admin/products/accessoriesmodel": { title: "مدیریت لوازم جانبی مدل‌دار", category: "محصولات" },
  "/admin/products/accessoriesmodel/add": { title: "افزودن لوازم جانبی مدل‌دار", category: "محصولات" },
  "/admin/products/orders": { title: "سفارشات خرید فروشگاه", category: "محصولات" },
  "/admin/vpnClients": { title: "کلاینت‌های سرویس VPN", category: "سرویس VPN" },
  "/admin/vpnClients/add": { title: "افزودن کلاینت جدید", category: "سرویس VPN" },
  "/admin/vpn": { title: "پلن‌های اشتراک VPN", category: "سرویس VPN" },
  "/admin/vpn/add": { title: "افزودن پلن جدید VPN", category: "سرویس VPN" },
  "/admin/VPNOrders": { title: "سفارشات اکانت VPN", category: "سرویس VPN" },
  "/admin/VPNOrders/set": { title: "ثبت مشخصات اشتراک VPN", category: "سرویس VPN" },
  "/admin/services": { title: "مدیریت خدمات تعمیرات", category: "خدمات" },
  "/admin/services/add": { title: "افزودن خدمت جدید", category: "خدمات" },
  "/admin/ServiceReservation": { title: "درخواست‌های رزرو تعمیرات", category: "خدمات" },
};

function getRouteInfo(pathname) {
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
  }

  // Handle edit paths with dynamic IDs
  if (pathname.includes("/admin/products/mobile/edit")) {
    return { title: "ویرایش اطلاعات موبایل", category: "محصولات" };
  }
  if (pathname.includes("/admin/products/hardware/edit")) {
    return { title: "ویرایش قطعه سخت‌افزاری", category: "محصولات" };
  }
  if (pathname.includes("/admin/products/accessories/edit")) {
    return { title: "ویرایش لوازم جانبی", category: "محصولات" };
  }
  if (pathname.includes("/admin/products/accessoriesmodel/edit")) {
    return { title: "ویرایش لوازم جانبی مدل‌دار", category: "محصولات" };
  }
  if (pathname.includes("/admin/brands/edit")) {
    return { title: "ویرایش اطلاعات برند", category: "محصولات" };
  }
  if (pathname.includes("/admin/users/edit")) {
    return { title: "ویرایش اطلاعات کاربر", category: "کاربران" };
  }
  if (pathname.includes("/admin/vpn/edit")) {
    return { title: "ویرایش پلن VPN", category: "سرویس VPN" };
  }
  if (pathname.includes("/admin/vpnClients/edit")) {
    return { title: "ویرایش کلاینت VPN", category: "سرویس VPN" };
  }
  if (pathname.includes("/admin/services/edit")) {
    return { title: "ویرایش خدمات", category: "خدمات" };
  }

  return { title: "پنل مدیریت", category: "ادمین" };
}

function AdminLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const routeInfo = getRouteInfo(location.pathname);

  return (
    <div className={styles.layout}>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Admin Area */}
      <div className={styles.mainArea}>
        {/* Topbar */}
        <header className={styles.topbar} dir="rtl">
          <div className={styles.topbarRight}>
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="باز کردن منو"
            >
              <FaBars />
            </button>
            <div className={styles.breadcrumbBox}>
              <span className={styles.category}>{routeInfo.category}</span>
              <span className={styles.separator}>/</span>
              <h1 className={styles.pageTitle}>{routeInfo.title}</h1>
            </div>
          </div>

          <div className={styles.topbarLeft}>
            {/* Live Status Indicator */}
            <div className={styles.statusIndicator} title="وضعیت ارتباط سرور">
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>سیستم برخط</span>
            </div>

            {/* Link to Public Store */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeLink}
              title="مشاهده صفحه اصلی فروشگاه"
            >
              <FaStore className={styles.storeIcon} />
              <span className={styles.storeText}>مشاهده فروشگاه</span>
              <FaExternalLinkAlt className={styles.externalIcon} />
            </Link>
          </div>
        </header>

        {/* Content Body with Error Boundary Protection */}
        <main className={styles.content}>
          <AdminErrorBoundary>
            {children}
          </AdminErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
