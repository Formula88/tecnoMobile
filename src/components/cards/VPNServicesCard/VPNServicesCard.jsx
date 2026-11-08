import { useState } from "react";
import styles from "./VPNServicesCard.module.scss";
import { FaDatabase, FaClock, FaCheckCircle, FaTimesCircle, FaFileDownload } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";
import { BiLink } from "react-icons/bi";
import { IoQrCode, IoClose } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { successSwal } from "../../../Swals/Swals";
import { toPersianDigits, getImageUrl } from "../../../utils/Utils";

function VPNServicesCard({ order }) {
  const [showQrModal, setShowQrModal] = useState(false);

  if (!order) return null;

  const status = order.status || "pending";
  const hasUploadedConfig = Boolean(order.configLink || order.configFile || order.configQr);
  const isConfigReady = status === "active" && hasUploadedConfig;

  const supportedTypes = (order.configTypes || "link,qr")
    .split(",")
    .map((t) => t.trim().toLowerCase());

  const canShowLink = isConfigReady && supportedTypes.includes("link") && Boolean(order.configLink);
  const canShowQr = isConfigReady && supportedTypes.includes("qr") && Boolean(order.configQr);
  const canShowFile = isConfigReady && supportedTypes.includes("file") && Boolean(order.configFile);

  const qrImageUrl = order.configQr ? getImageUrl(order.configQr) : "";
  const configDownloadUrl = order.configFile ? getImageUrl(order.configFile) : "";

  const handleCopyLink = () => {
    if (!order.configLink) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(order.configLink);
    }
    successSwal("لینک کانفیگ در کلیپ‌بورد کپی شد", "کپی شد");
  };

  return (
    <>
      <div className={styles.VPNServicesCard}>
        <div className={styles.right}>
          <div className={styles.feature}>
            <h2 className={`${styles.title} fw-bold text-info`}>
              {order.planName || "پلن اختصاصی"}
            </h2>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaDatabase />
            </div>
            <span className={styles.title}>
              حجم :{" "}
              {Number(order.planTraffic) > 0
                ? `${toPersianDigits(order.planTraffic)} گیگابایت`
                : "نامحدود"}
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaRegCalendar />
            </div>
            <span className={styles.title}>
              مدت زمان :{" "}
              {Number(order.planDuration) > 0
                ? `${toPersianDigits(order.planDuration)} ماه`
                : "نامحدود"}
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FiUsers />
            </div>
            <span className={styles.title}>
              تعداد کاربر : {toPersianDigits(order.planUserCount || 1)} کاربر
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              {isConfigReady ? (
                <FaCheckCircle className="text-success" />
              ) : status === "expired" ? (
                <FaTimesCircle className="text-danger" />
              ) : (
                <FaClock className="text-warning" />
              )}
            </div>
            <span className={styles.title}>
              وضعیت :{" "}
              {isConfigReady ? (
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">
                  فعال (کانفیگ آماده)
                </span>
              ) : status === "expired" ? (
                <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25">
                  منقضی شده
                </span>
              ) : status === "cancelled" ? (
                <span className="badge bg-secondary">لغو شده</span>
              ) : (
                <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25">
                  در انتظار آماده‌سازی کانفیگ
                </span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.left}>
          <div className={styles.feature}>
            <span className="small text-secondary">
              کلاینت: <strong className="text-white">{order.clientName || "-"}</strong>
              {order.clientProtocol ? ` (${order.clientProtocol})` : ""}
            </span>
          </div>

          {/* If config is NOT ready / pending, DO NOT render config buttons! Render notice instead */}
          {!isConfigReady ? (
            <div className={styles.pendingNotice}>
              <FaClock style={{ fontSize: "1.3rem" }} />
              <span className="fw-bold">کانفیگ درحال آماده‌سازی</span>
              <span className="small opacity-75">
                به محض آپلود کانفیگ توسط پشتیبانی، دکمه‌های دریافت فعال خواهند شد.
              </span>
            </div>
          ) : (
            <>
              {/* Dynamic Button 1: Copy Link */}
              {canShowLink && (
                <button
                  type="button"
                  className={`btnOutline ${styles.btn}`}
                  onClick={handleCopyLink}
                  style={{ cursor: "pointer", border: "1px solid #3b82f6", color: "#60a5fa" }}
                >
                  <BiLink className={styles.icon} />
                  <span>کپی لینک کانفیگ</span>
                </button>
              )}

              {/* Dynamic Button 2: QR Code */}
              {canShowQr && (
                <button
                  type="button"
                  className={`btnOutline ${styles.btn}`}
                  onClick={() => setShowQrModal(true)}
                  style={{ cursor: "pointer", border: "1px solid #06b6d4", color: "#22d3ee" }}
                >
                  <IoQrCode className={styles.icon} />
                  <span>مشاهده QR Code</span>
                </button>
              )}

              {/* Dynamic Button 3: Download Config File */}
              {canShowFile && (
                <a
                  href={configDownloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btnOutline ${styles.btn}`}
                  style={{ border: "1px solid #10b981", color: "#34d399" }}
                >
                  <FaFileDownload className={styles.icon} />
                  <span>دانلود فایل کانفیگ</span>
                </a>
              )}
            </>
          )}

          {/* Client App Download (always visible if client has a download URL) */}
          {order.clientDownloadUrl && (
            <a
              href={order.clientDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btnOutline ${styles.btn}`}
              style={{ border: "1px solid #64748b", color: "#cbd5e1" }}
            >
              <HiOutlineDownload className={styles.icon} />
              <span>دانلود کلاینت {order.clientName}</span>
            </a>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && qrImageUrl && (
        <div className={styles.modalOverlay} onClick={() => setShowQrModal(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="m-0 fw-bold text-info">بارکد QR کانفیگ</h5>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary p-1 border-0 text-white"
                onClick={() => setShowQrModal(false)}
              >
                <IoClose size={22} />
              </button>
            </div>
            <p className="small text-secondary mb-2">
              با اسکن این تصویر در اپلیکیشن {order.clientName}، اتصال شما برقرار می‌شود.
            </p>
            <div className={styles.modalQrWrapper}>
              <img src={qrImageUrl} alt="QR Code Config" />
            </div>
            <div className="d-flex justify-content-center gap-2 mt-2">
              <a
                href={qrImageUrl}
                download={`qr_config_${order.id}.webp`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-info px-3"
              >
                دانلود تصویر QR
              </a>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary px-3"
                onClick={() => setShowQrModal(false)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VPNServicesCard;
