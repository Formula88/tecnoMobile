import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import VPNBtn from "../../components/VPNBtn/VPNBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { successSwal } from "../../../Swals/Swals";
import { FaSearch } from "react-icons/fa";

const statusMap = {
  pending: "در انتظار کانفیگ pending",
  active: "فعال active",
  expired: "منقضی شده expired",
};

function VPNOrders() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData([
      {
        id: 1,
        Number: "09129072416",
        name: "پلن اختصاصی نامحدود",
        duration: "1",
        traffic: "100",
        userCount: "2",
        protocol: "VLESS / Reality",
        clientName: "v2rayNG / Streisand",
        status: "pending",
      },
      {
        id: 2,
        Number: "09390719229",
        name: "پلن سه‌ماهه اقتصادی",
        duration: "3",
        traffic: "0",
        userCount: "1",
        protocol: "VLESS",
        clientName: "Sing-box",
        status: "active",
      },
    ]);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
    successSwal("وضعیت سفارش VPN با موفقیت تغییر کرد", "تغییر وضعیت");
  };



  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      const phone = normalizeSearchText(item.Number);
      const name = normalizeSearchText(item.name);
      const client = normalizeSearchText(item.clientName);
      const proto = normalizeSearchText(item.protocol);
      const statusText = normalizeSearchText(statusMap[item.status] || item.status);

      return (
        phone.includes(term) ||
        name.includes(term) ||
        client.includes(term) ||
        proto.includes(term) ||
        statusText.includes(term)
      );
    });
  }, [data, searchTerm]);

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
          className="table table-bordered table-hover table-striped text-center align-middle mb-0"
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
              <th>وضعیت</th>
              <th>تنظیمات</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-5 text-center">
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
                    <td className="text-nowrap">{toPersianDigits(value.Number)}</td>
                    <td className="fw-bold text-nowrap">{value.name}</td>
                    <td>
                      {value.duration > 0 ? (
                        <span className="text-nowrap">{toPersianDigits(value.duration)} ماه</span>
                      ) : (
                        <span className="text-nowrap">نامحدود</span>
                      )}
                    </td>
                    <td>
                      {value.traffic > 0 ? (
                        <span className="text-nowrap">{toPersianDigits(value.traffic)} گیگ</span>
                      ) : (
                        <span className="text-nowrap">نامحدود</span>
                      )}
                    </td>
                    <td className="text-nowrap">{toPersianDigits(value.userCount)} نفر</td>
                    <td className="text-nowrap">{value.clientName}</td>
                    <td className="text-nowrap">{value.protocol}</td>
                    <td>
                      <StatusSelect
                        items={[
                          { name: "pending", value: "در انتظار کانفیگ" },
                          { name: "active", value: "فعال" },
                          { name: "expired", value: "منقضی شده" },
                        ]}
                        defaultValue={value.status}
                        onChange={(e) => handleStatusChange(value.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <VPNBtn link={`/admin/VPNOrders/set?id=${value.id}`} />
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
