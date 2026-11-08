import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { deleteAdminRepairOrder, getAdminRepairOrders } from "../../../services/api";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { FaSearch } from "react-icons/fa";

function ServiceReservation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    const result = await getAdminRepairOrders();
    if (result?.success && Array.isArray(result.data)) {
      setData(result.data);
    } else {
      ServerErrorSwal();
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteAdminRepairOrder(id);
    if (result?.success) {
      setData((prev) => prev.filter((item) => item.id !== id));
      successSwal("درخواست رزرو با موفقیت حذف شد", "حذف شد");
    } else {
      ServerErrorSwal(result?.message || "خطا در حذف مورد");
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      const name = normalizeSearchText(item.fullName);
      const phone = normalizeSearchText(item.phoneNumber);
      const device = normalizeSearchText(item.deviceType);
      const service = normalizeSearchText(item.serviceType);
      const desc = normalizeSearchText(item.description);

      return (
        name.includes(term) ||
        phone.includes(term) ||
        device.includes(term) ||
        service.includes(term) ||
        desc.includes(term)
      );
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در نام متقاضی، شماره تماس، نوع دستگاه، سرویس..."
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
              <th>نام و نام‌خانوادگی</th>
              <th>شماره تماس</th>
              <th>نوع دستگاه</th>
              <th>نوع سرویس</th>
              <th>توضیحات مشکل</th>
              <th>تنظیمات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">درحال بارگذاری اطلاعات...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-secondary">هیچ درخواست تعمیری ثبت نشده است.</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ درخواستی با عبارت «{searchTerm}» پیدا نشد.</span>
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
                    <td className="fw-bold text-nowrap">{value.fullName}</td>
                    <td className="text-nowrap">{toPersianDigits(value.phoneNumber)}</td>
                    <td className="text-nowrap">{value.deviceType || "ثبت نشده"}</td>
                    <td className="text-nowrap">{value.serviceType || "ثبت نشده"}</td>
                    <td style={{ minWidth: "220px", maxWidth: "350px" }}>
                      <div className="text-truncate" title={value.description}>{value.description || "بدون توضیح"}</div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <DeleteBtn btnHandle={() => handleDelete(value.id)} />
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

export default ServiceReservation;
