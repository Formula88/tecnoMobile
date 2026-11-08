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

  const planTraffic = order.planTraffic ?? order.traffic ?? 0;
  const planDuration = order.planDuration ?? order.duration ?? 0;
  const planUserCount = order.planUserCount ?? order.userCount ?? 1;
  const planName = order.planName ?? order.name ?? "پلن اختصاصی VPN";

  return (
    <>
      <div className={styles.VPNServicesCard}>
        <div className={styles.right}>
          <div className={styles.feature}>
            <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-2">
              <h2 className={`${styles.title} fw-bold text-info`}>{planName}</h2>
              {order.id && (
                <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-25 small">
                  سفارش #{toPersianDigits(order.id)}
                </span>
              )}
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaDatabase />
            </div>
            <span className={styles.title}>
              حجم :{" "}
              {Number(planTraffic) > 0
                ? `${toPersianDigits(planTraffic)} گیگابایت`
                : "نامحدود"}
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaRegCalendar />
            </div>
            <span className={styles.title}>
              مدت زمان :{" "}
              {Number(planDuration) > 0
                ? `${toPersianDigits(planDuration)} ماه`
                : "نامحدود"}
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FiUsers />
            </div>
            <span className={styles.title}>
              تعداد کاربر : {toPersianDigits(planUserCount)} کاربر
            </span>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              {isConfigReady ? (
                <FaCheckCircle className="text-success" />
              ) : status === "expired" ? (
                <FaTimesCircle className="text-danger" />
              ) : status === "cancelled" ? (
                <FaTimesCircle className="text-secondary" />
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
                  درحال آماده‌سازی
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

          {/* When config is NOT ready / order is in preparation, DO NOT render config action buttons! */}
          {!isConfigReady ? (
            <div className={styles.pendingNotice}>
              <FaClock style={{ fontSize: "1.4rem" }} className="text-warning" />
              <span className="fw-bold fs-6">درحال آماده‌سازی</span>
              <span className="small opacity-80">
                سفارش شما با موفقیت ثبت شد و کانفیگ اختصاصی درحال آماده‌سازی توسط تیم فنی است. پس از آماده‌سازی، دکمه‌های دریافت کانفیگ در همین کادر فعال می‌شوند.
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
              <span>دانلود نرم‌افزار کلاینت</span>
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
