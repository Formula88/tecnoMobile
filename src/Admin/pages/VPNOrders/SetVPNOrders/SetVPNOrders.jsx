import { useEffect, useState, useId } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import { getAdminVpnOrder, setAdminVpnOrderConfig } from "../../../../services/api";
import { errorSwal, ServerErrorSwal, successSwal } from "../../../../Swals/Swals";
import { getImageUrl, toPersianDigits } from "../../../../utils/Utils";
import { FaLink, FaQrcode, FaFileAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { Skeleton } from "../../../../components/ui/Skeleton/Skeleton";

function SetVPNOrders() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Dynamic form state
  const [configLink, setConfigLink] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [qrPreviewUrl, setQrPreviewUrl] = useState(null);
  const [configFile, setConfigFile] = useState(null);

  const qrInputId = useId();
  const fileInputId = useId();

  const fetchOrder = async (id) => {
    setLoading(true);
    const result = await getAdminVpnOrder(id);
    if (!result?.success || !result?.data) {
      ServerErrorSwal();
      navigate("/admin/VPNOrders");
      return;
    }

    const o = result.data;
    setOrder(o);
    setConfigLink(o.configLink || "");
    setLoading(false);
  };

  useEffect(() => {
    if (!orderId) {
      errorSwal("شناسه سفارش نامعتبر است", "خطا");
      navigate("/admin/VPNOrders");
      return;
    }
    fetchOrder(orderId);
  }, [orderId]);

  const handleQrChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrFile(file);
      setQrPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfigFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setConfigFile(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!order) return;

    const types = (order.configTypes || "link,qr")
      .split(",")
      .map((t) => t.trim().toLowerCase());

    const supportsLink = types.includes("link");
    const supportsQr = types.includes("qr");
    const supportsFile = types.includes("file");

    // Validation: make sure at least one config method is provided or already exists
    const hasLink = supportsLink && configLink.trim().length > 0;
    const hasQr = supportsQr && (qrFile !== null || Boolean(order.configQr));
    const hasFile = supportsFile && (configFile !== null || Boolean(order.configFile));

    if (!hasLink && !hasQr && !hasFile) {
      errorSwal("لطفاً حداقل یکی از روش‌های کانفیگ مورد نیاز این کلاینت را ثبت یا آپلود کنید", "کانفیگ الزامی است");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("id", order.id);
    formData.append("status", "active");

    if (supportsLink) {
      formData.append("configLink", configLink.trim());
    }
    if (supportsQr && qrFile) {
      formData.append("configQr", qrFile);
    }
    if (supportsFile && configFile) {
      formData.append("configFile", configFile);
    }

    const result = await setAdminVpnOrderConfig(formData);
    setSaving(false);

    if (!result?.success) {
      errorSwal(result?.message || "خطا در ذخیره کانفیگ", "خطا");
      return;
    }

    successSwal("کانفیگ‌های اختصاصی با موفقیت ثبت و سفارش فعال شد", "ثبت موفق");
    navigate("/admin/VPNOrders");
  };

  if (loading) {
    return (
      <FormLayout>
        <div className="card bg-dark bg-opacity-50 border-secondary border-opacity-50 p-4 mb-4 rounded-3 text-white" dir="rtl">
          <Skeleton width="180px" height="24px" className="mb-3" />
          <div className="row g-3">
            <div className="col-12 col-md-6"><Skeleton width="70%" height="20px" /></div>
            <div className="col-12 col-md-6"><Skeleton width="80%" height="20px" /></div>
            <div className="col-12 col-md-6"><Skeleton width="60%" height="20px" /></div>
            <div className="col-12 col-md-6"><Skeleton width="75%" height="20px" /></div>
          </div>
          <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex flex-column gap-3">
            <Skeleton width="40%" height="20px" />
            <Skeleton width="100%" height="80px" borderRadius="8px" />
            <Skeleton width="100%" height="45px" borderRadius="8px" className="mt-2" />
          </div>
        </div>
      </FormLayout>
    );
  }

  if (!order) {
    return null;
  }

  const supportedTypes = (order.configTypes || "link,qr")
    .split(",")
    .map((t) => t.trim().toLowerCase());

  const supportsLink = supportedTypes.includes("link");
  const supportsQr = supportedTypes.includes("qr");
  const supportsFile = supportedTypes.includes("file");

  const existingQrUrl = order.configQr ? getImageUrl(order.configQr) : null;
  const existingFileUrl = order.configFile ? getImageUrl(order.configFile) : null;

  return (
    <FormLayout>
      <div className="card bg-dark bg-opacity-50 border-secondary border-opacity-50 p-3 mb-4 rounded-3 text-white" dir="rtl">
        <h5 className="border-bottom border-secondary border-opacity-50 pb-2 mb-3 text-info fw-bold">
          مشخصات سفارش VPN #{toPersianDigits(order.id)}
        </h5>
        <div className="row g-2 small">
          <div className="col-12 col-md-6">
            <span className="text-secondary">شماره کاربر: </span>
            <span className="fw-bold">{toPersianDigits(order.phone)}</span>
          </div>
          <div className="col-12 col-md-6">
            <span className="text-secondary">پلن: </span>
            <span className="fw-bold">{order.planName}</span>
          </div>
          <div className="col-12 col-md-6">
            <span className="text-secondary">کلاینت: </span>
            <span className="badge bg-secondary bg-opacity-50 text-white px-2 py-1 ms-1">
              {order.clientName} ({order.clientProtocol})
            </span>
          </div>
          <div className="col-12 col-md-6">
            <span className="text-secondary">روش‌های مجاز کانفیگ: </span>
            <span className="d-inline-flex gap-1">
              {supportsLink && <span className="badge bg-primary">لینک</span>}
              {supportsQr && <span className="badge bg-info">QR کد</span>}
              {supportsFile && <span className="badge bg-success">فایل کانفیگ</span>}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} dir="rtl">
        {/* Dynamic Section: Config Link */}
        {supportsLink && (
          <div className="mb-4">
            <label className="form-label text-white fw-bold d-flex align-items-center gap-2 mb-2">
              <FaLink className="text-primary" />
              لینک مستقیم کانفیگ (VLESS, VMess, Trojan, Reality)
            </label>
            <textarea
              className="form-control bg-dark text-white border-secondary"
              rows={4}
              value={configLink}
              onChange={(e) => setConfigLink(e.target.value)}
              placeholder="vless://... یا vmess://..."
              dir="ltr"
              style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
            />
            <div className="form-text text-secondary mt-1">
              متن کامل کانفیگ اتصال را وارد کنید (کاربر با یک کلیک آن را در نرم‌افزار کپی می‌کند).
            </div>
          </div>
        )}

        {/* Dynamic Section: Config QR Code */}
        {supportsQr && (
          <div className="mb-4 p-3 rounded-3 border border-secondary border-opacity-50 bg-dark bg-opacity-25">
            <label className="form-label text-white fw-bold d-flex align-items-center gap-2 mb-2">
              <FaQrcode className="text-info" />
              تصویر بارکد QR کانفیگ
            </label>

            {/* Existing QR preview */}
            {existingQrUrl && !qrPreviewUrl && (
              <div className="d-flex align-items-center gap-3 mb-3 p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-30">
                <img
                  src={existingQrUrl}
                  alt="Existing QR"
                  style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius: "8px", background: "#fff" }}
                />
                <div>
                  <div className="text-success small fw-bold d-flex align-items-center gap-1">
                    <FaCheckCircle /> تصویر QR کد قبلاً آپلود شده است
                  </div>
                  <a
                    href={existingQrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-info mt-1 d-inline-flex align-items-center gap-1"
                  >
                    مشاهده اندازه کامل
                  </a>
                </div>
              </div>
            )}

            {/* Newly selected QR preview */}
            {qrPreviewUrl && (
              <div className="d-flex align-items-center gap-3 mb-3 p-2 rounded bg-black bg-opacity-40 border border-info">
                <img
                  src={qrPreviewUrl}
                  alt="New QR Preview"
                  style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius: "8px", background: "#fff" }}
                />
                <div>
                  <div className="text-info small fw-bold">تصویر جدید انتخاب شده:</div>
                  <div className="text-white small">{qrFile?.name}</div>
                </div>
              </div>
            )}

            <div className="d-flex align-items-center gap-2">
              <label
                htmlFor={qrInputId}
                className="btn btn-outline-info d-inline-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >
                <FaQrcode />
                <span>{existingQrUrl ? "آپلود تصویر جدید QR" : "انتخاب و آپلود تصویر QR"}</span>
              </label>
              <input
                id={qrInputId}
                type="file"
                accept="image/*"
                onChange={handleQrChange}
                className="d-none"
              />
            </div>
            <div className="form-text text-secondary mt-1">
              فرمت‌های مجاز: PNG, JPG, WebP, SVG (حجم کمتر از ۵ مگابایت).
            </div>
          </div>
        )}

        {/* Dynamic Section: Config File */}
        {supportsFile && (
          <div className="mb-4 p-3 rounded-3 border border-secondary border-opacity-50 bg-dark bg-opacity-25">
            <label className="form-label text-white fw-bold d-flex align-items-center gap-2 mb-2">
              <FaFileAlt className="text-success" />
              فایل اختصاصی کانفیگ (.conf, .json, .ovpn, ...)
            </label>

            {/* Existing File indicator */}
            {order.configFile && !configFile && (
              <div className="d-flex align-items-center justify-content-between mb-3 p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-30">
                <div className="d-flex align-items-center gap-2 text-white small">
                  <FaCheckCircle className="text-success" />
                  <span>فایل فعلی: </span>
                  <code className="text-info">{order.configFile.split("/").pop()}</code>
                </div>
                {existingFileUrl && (
                  <a
                    href={existingFileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-success d-inline-flex align-items-center gap-1"
                  >
                    <HiOutlineDownload /> دانلود فایل فعلی
                  </a>
                )}
              </div>
            )}

            {/* Newly selected File indicator */}
            {configFile && (
              <div className="d-flex align-items-center gap-2 mb-3 p-2 rounded bg-black bg-opacity-40 border border-success">
                <FaCheckCircle className="text-success" />
                <span className="text-white small">فایل جدید انتخاب شده: </span>
                <span className="text-info fw-bold small">{configFile.name}</span>
                <span className="badge bg-secondary ms-auto">
                  {(configFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            )}

            <div className="d-flex align-items-center gap-2">
              <label
                htmlFor={fileInputId}
                className="btn btn-outline-success d-inline-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >
                <FaFileAlt />
                <span>{order.configFile ? "تعویض فایل کانفیگ" : "انتخاب و آپلود فایل کانفیگ"}</span>
              </label>
              <input
                id={fileInputId}
                type="file"
                accept=".conf,.json,.txt,.yaml,.yml,.ovpn,.zip,.cfg"
                onChange={handleConfigFileChange}
                className="d-none"
              />
            </div>
            <div className="form-text text-secondary mt-1">
              فرمت‌های مجاز: .conf, .json, .txt, .yaml, .ovpn, .zip (مناسب برای WireGuard, Sing-box, OpenVPN).
            </div>
          </div>
        )}

        {/* If no config options matched */}
        {!supportsLink && !supportsQr && !supportsFile && (
          <div className="alert alert-warning d-flex align-items-center gap-2 mb-4">
            <FaExclamationTriangle />
            <span>هیچ روش کانفیگی برای این کلاینت تعیین نشده است. لطفاً ابتدا از بخش کلاینت‌ها روش‌های ارائه کانفیگ را مشخص کنید.</span>
          </div>
        )}

        <div className="mt-4 pt-2">
          <FormBtn
            text={saving ? "درحال ذخیره‌سازی و ارسال..." : "ثبت و فعال‌سازی کانفیگ"}
            disabled={saving}
          />
        </div>
      </form>
    </FormLayout>
  );
}

export default SetVPNOrders;
