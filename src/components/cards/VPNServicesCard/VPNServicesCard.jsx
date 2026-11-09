import { useState } from "react";
import styles from "./VPNServicesCard.module.scss";
import { FaDatabase, FaClock, FaFileDownload, FaShieldAlt } from "react-icons/fa";
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
        {/* Card Header: Plan name, order ID, and status badge */}
        <div className={styles.cardHeader}>
          <div className={styles.headerTitleWrap}>
            <h2 className={styles.planTitle}>{planName}</h2>
            {order.id && (
              <span className={styles.orderBadge}>
                سفارش #{toPersianDigits(order.id)}
              </span>
            )}
          </div>

          <div className={styles.statusBadgeWrap}>
            {isConfigReady ? (
              <span className={styles.statusActive}>
                <span className={styles.dotActive} />
                <span>فعال (کانفیگ آماده)</span>
              </span>
            ) : status === "expired" ? (
              <span className={styles.statusExpired}>
                <span className={styles.dotExpired} />
                <span>منقضی شده</span>
              </span>
            ) : status === "cancelled" ? (
              <span className={styles.statusCancelled}>
                <span>لغو شده</span>
              </span>
            ) : (
              <span className={styles.statusPending}>
                <span className={styles.dotPending} />
                <span>در انتظار آماده‌سازی کانفیگ</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Body: Specs on one side, Actions/Waiting on the other */}
        <div className={styles.cardBody}>
          {/* Specifications */}
          <div className={styles.specsSection}>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <FaDatabase />
              </div>
              <span className={styles.specLabel}>حجم ترافیک :</span>
              <span className={styles.specValue}>
                {Number(planTraffic) > 0
                  ? `${toPersianDigits(planTraffic)} گیگابایت`
                  : "نامحدود"}
              </span>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <FaRegCalendar />
              </div>
              <span className={styles.specLabel}>مدت اعتبار :</span>
              <span className={styles.specValue}>
                {Number(planDuration) > 0
                  ? `${toPersianDigits(planDuration)} ماه`
                  : "نامحدود"}
              </span>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <FiUsers />
              </div>
              <span className={styles.specLabel}>تعداد کاربر :</span>
              <span className={styles.specValue}>
                {toPersianDigits(planUserCount)} کاربر
              </span>
            </div>

            <div className={styles.specItem}>
              <div className={styles.specIcon}>
                <FaShieldAlt />
              </div>
              <span className={styles.specLabel}>نرم‌افزار کلاینت :</span>
              <span className={styles.specValue}>
                {order.clientName || "-"}
                {order.clientProtocol ? ` (${order.clientProtocol})` : ""}
              </span>
            </div>
          </div>

          {/* Action / Delivery / Waiting Section */}
          <div className={styles.actionSection}>
            {!isConfigReady ? (
              /* Beautiful In-Waiting State */
              <div className={styles.waitingBox}>
                <div className={styles.waitingHeader}>
                  <div className={styles.pulseIconWrapper}>
                    <FaClock className={styles.pulseIcon} />
                  </div>
                  <div className={styles.waitingTitles}>
                    <div className={styles.waitingMainTitle}>در انتظار آماده‌سازی کانفیگ</div>
                    <div className={styles.waitingSubTitle}>سفارش شما در صف آماده‌سازی است</div>
                  </div>
                </div>

                <p className={styles.waitingDesc}>
                  کانفیگ اختصاصی شما توسط پشتیبانی فنی درحال تنظیم است و به زودی دکمه‌های دریافت در همین بخش فعال می‌شوند.
                </p>

                {order.clientDownloadUrl && (
                  <a
                    href={order.clientDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.clientAppBtn}
                    title={`دانلود نرم‌افزار ${order.clientName}`}
                  >
                    <HiOutlineDownload className={styles.btnIcon} />
                    <span>دانلود کلاینت {order.clientName}</span>
                  </a>
                )}
              </div>
            ) : (
              /* Ready State: Config Download/Copy Buttons */
              <div className={styles.activeActions}>
                {canShowLink && (
                  <button
                    type="button"
                    className={styles.actionBtnLink}
                    onClick={handleCopyLink}
                  >
                    <BiLink className={styles.btnIcon} />
                    <span>کپی لینک کانفیگ</span>
                  </button>
                )}

                {canShowQr && (
                  <button
                    type="button"
                    className={styles.actionBtnQr}
                    onClick={() => setShowQrModal(true)}
                  >
                    <IoQrCode className={styles.btnIcon} />
                    <span>مشاهده بارکد QR</span>
                  </button>
                )}

                {canShowFile && (
                  <a
                    href={configDownloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtnFile}
                  >
                    <FaFileDownload className={styles.btnIcon} />
                    <span>دانلود فایل کانفیگ</span>
                  </a>
                )}

                {order.clientDownloadUrl && (
                  <a
                    href={order.clientDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtnClient}
                  >
                    <HiOutlineDownload className={styles.btnIcon} />
                    <span>دانلود نرم‌افزار {order.clientName}</span>
                  </a>
                )}
              </div>
            )}
          </div>
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
