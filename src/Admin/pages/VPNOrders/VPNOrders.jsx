import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import VPNBtn from "../../components/VPNBtn/VPNBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import {
  getAdminVpnOrders,
  updateAdminVpnOrderStatus,
  deleteAdminVpnOrder,
} from "../../../services/api";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal, errorSwal } from "../../../Swals/Swals";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";

const statusMap = {
  pending: "در انتظار کانفیگ pending",
  active: "فعال active",
  expired: "منقضی شده expired",
  cancelled: "لغو شده cancelled",
};

function VPNOrders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const result = await getAdminVpnOrders();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const result = await updateAdminVpnOrderStatus(id, newStatus);
    if (!result?.success) {
      errorSwal(result?.message || "خطا در تغییر وضعیت سفارش", "خطا");
      return;
    }
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
    successSwal("وضعیت سفارش VPN با موفقیت تغییر کرد", "تغییر وضعیت");
  };

  const handleDelete = async (id) => {
    const result = await deleteAdminVpnOrder(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }
    setData((prev) => prev.filter((item) => item.id !== id));
    successSwal("سفارش VPN با موفقیت حذف شد", "حذف شد");
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      const phone = normalizeSearchText(item.phone || "");
      const name = normalizeSearchText(item.planName || "");
      const client = normalizeSearchText(item.clientName || "");
      const proto = normalizeSearchText(item.clientProtocol || "");
      const statusText = normalizeSearchText(statusMap[item.status] || item.status || "");

      return (
        phone.includes(term) ||
        name.includes(term) ||
        client.includes(term) ||
        proto.includes(term) ||
        statusText.includes(term)
      );
    });
  }, [data, searchTerm]);

  const renderConfigStatus = (order) => {
    const types = (order.configTypes || "link,qr")
      .split(",")
      .map((t) => t.trim().toLowerCase());

    const hasLink = Boolean(order.configLink);
    const hasQr = Boolean(order.configQr);
    const hasFile = Boolean(order.configFile);

    const isFullyUploaded =
      (!types.includes("link") || hasLink) &&
      (!types.includes("qr") || hasQr) &&
      (!types.includes("file") || hasFile);

    const hasAnyUploaded = hasLink || hasQr || hasFile;

    return (
      <div className="d-flex flex-column align-items-center gap-1 small">
        <div className="d-flex gap-2">
          {types.includes("link") && (
            <span
              className={`badge d-inline-flex align-items-center gap-1 ${
                hasLink ? "bg-primary" : "bg-secondary bg-opacity-25 text-secondary"
              }`}
              title={hasLink ? "لینک کانفیگ آپلود شده" : "لینک کانفیگ تنظیم نشده"}
            >
              لینک {hasLink ? <FaCheck size={9} /> : <FaTimes size={9} />}
            </span>
          )}
          {types.includes("qr") && (
            <span
              className={`badge d-inline-flex align-items-center gap-1 ${
                hasQr ? "bg-info" : "bg-secondary bg-opacity-25 text-secondary"
              }`}
              title={hasQr ? "QR کد آپلود شده" : "QR کد آپلود نشده"}
            >
              QR {hasQr ? <FaCheck size={9} /> : <FaTimes size={9} />}
            </span>
          )}
          {types.includes("file") && (
            <span
              className={`badge d-inline-flex align-items-center gap-1 ${
                hasFile ? "bg-success" : "bg-secondary bg-opacity-25 text-secondary"
              }`}
              title={hasFile ? "فایل کانفیگ آپلود شده" : "فایل کانفیگ آپلود نشده"}
            >
              فایل {hasFile ? <FaCheck size={9} /> : <FaTimes size={9} />}
            </span>
          )}
        </div>
        <div>
          {!hasAnyUploaded ? (
            <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-25">
              کانفیگ ثبت نشده
            </span>
          ) : isFullyUploaded ? (
            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">
              کانفیگ کامل
            </span>
          ) : (
            <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25">
              کانفیگ ناقص
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در شماره کاربر، نام پلن، کلاینت، پروتکل..."
          count={filteredData.length}
          totalCount={data.length}
        />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>شماره کاربر</th>
              <th>نام پلن</th>
              <th>مدت</th>
              <th>حجم</th>
              <th>تعداد کاربر</th>
              <th>کلاینت</th>
              <th>پروتکل</th>
              <th>کانفیگ‌های سفارش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="py-4 text-center">
                  درحال بارگذاری سفارشات VPN...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-4 text-center text-secondary">
                  هیچ سفارش VPN ثبت نشده است.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ سفارشی با عبارت «{searchTerm}» پیدا نشد.</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info mt-1"
                      onClick={() => setSearchTerm("")}
                    >
                      پاک کردن فیلتر
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="text-nowrap fw-bold">{toPersianDigits(value.phone || "-")}</td>
                    <td className="fw-bold text-nowrap">{value.planName || "پلن اختصاصی"}</td>
                    <td>
                      {Number(value.planDuration) > 0 ? (
                        <span className="text-nowrap">{toPersianDigits(value.planDuration)} ماه</span>
                      ) : (
                        <span className="text-nowrap">نامحدود</span>
                      )}
                    </td>
                    <td>
                      {Number(value.planTraffic) > 0 ? (
                        <span className="text-nowrap">{toPersianDigits(value.planTraffic)} گیگ</span>
                      ) : (
                        <span className="text-nowrap">نامحدود</span>
                      )}
                    </td>
                    <td className="text-nowrap">{toPersianDigits(value.planUserCount || 1)} نفر</td>
                    <td className="text-nowrap fw-semibold">{value.clientName || "-"}</td>
                    <td className="text-nowrap">
                      <span className="badge bg-secondary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
                        {value.clientProtocol || "-"}
                      </span>
                    </td>
                    <td>{renderConfigStatus(value)}</td>
                    <td>
                      <StatusSelect
                        items={[
                          { name: "pending", value: "در انتظار کانفیگ" },
                          { name: "active", value: "فعال" },
                          { name: "expired", value: "منقضی شده" },
                          { name: "cancelled", value: "لغو شده" },
                        ]}
                        defaultValue={value.status}
                        onChange={(e) => handleStatusChange(value.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <VPNBtn link={`/admin/VPNOrders/set?id=${value.id}`} text="تنظیم کانفیگ" />
                        <DeleteBtn
                          confirmText="آیا از حذف این سفارش VPN اطمینان دارید؟"
                          btnHandle={() => handleDelete(value.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default VPNOrders;
