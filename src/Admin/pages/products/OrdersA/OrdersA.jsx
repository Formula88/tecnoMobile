import AdminLayout from "../../../layout/AdminLayout";
import { useEffect, useState, useMemo } from "react";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import StatusSelect from "../../../components/StatusSelect/StatusSelect";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AdminSearchBar from "../../../components/AdminSearchBar/AdminSearchBar";
import { deleteAdminOrder, getAdminOrders, updateAdminOrderStatus } from "../../../../services/api";
import { formatPrice, toPersianDigits, normalizeSearchText } from "../../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../../Swals/Swals";
import { FaSearch } from "react-icons/fa";

const statusMap = {
  NotSent: "درحال ارسال NotSent",
  sent: "ارسال شده sent",
  delivered: "تحویل شده delivered",
  cancelled: "لغو شده cancelled",
};

function OrdersA() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    const result = await getAdminOrders();
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

  const handleStatusChange = async (id, newStatus) => {
    const result = await updateAdminOrderStatus(id, newStatus);
    if (result?.success) {
      setData((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order)),
      );
      successSwal("وضعیت سفارش با موفقیت به‌روزرسانی شد", "تغییر وضعیت");
    } else {
      ServerErrorSwal(result?.message || "خطا در تغییر وضعیت سفارش");
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteAdminOrder(id);
    if (result?.success) {
      setData((prev) => prev.filter((order) => order.id !== id));
      successSwal("سفارش با موفقیت حذف شد", "حذف شد");
    } else {
      ServerErrorSwal(result?.message || "خطا در حذف سفارش");
    }
  };



  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((order) => {
      const id = order.id ? order.id.toString() : "";
      const name = normalizeSearchText(order.fullName);
      const phone = normalizeSearchText(order.phone);
      const address = normalizeSearchText(order.address);
      const codePost = order.codePost ? order.codePost.toString() : "";
      const price = order.totalPrice ? order.totalPrice.toString() : "";
      const statusText = normalizeSearchText(statusMap[order.status] || order.status);

      return (
        id.includes(term) ||
        name.includes(term) ||
        phone.includes(term) ||
        address.includes(term) ||
        codePost.includes(term) ||
        price.includes(term) ||
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
          placeholder="جستجو در شماره سفارش، نام خریدار، شماره تماس، کد پستی..."
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
              <th>#</th>
              <th>شماره سفارش</th>
              <th>تاریخ ثبت</th>
              <th>مبلغ پرداختی</th>
              <th>نام گیرنده</th>
              <th>شماره تماس</th>
              <th>آدرس</th>
              <th>کد پستی</th>
              <th>وضعیت</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="py-4 text-center">درحال بارگذاری سفارشات...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-4 text-center text-secondary">هیچ سفارشی ثبت نشده است.</td>
              </tr>
            ) : filteredData.length === 0 ? (
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
                const dateStr = value.createdAt
                  ? new Date(value.createdAt).toLocaleDateString("fa-IR")
                  : "-";
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="text-nowrap fw-bold">{`#${toPersianDigits(value.id)}`}</td>
                    <td className="text-nowrap">{toPersianDigits(dateStr)}</td>
                    <td className="text-nowrap fw-bold">
                      {formatPrice(value.totalPrice)} تومان
                    </td>
                    <td className="text-nowrap">{value.fullName}</td>
                    <td className="text-nowrap">{toPersianDigits(value.phone)}</td>
                    <td style={{ maxWidth: "220px" }}>
                      <div className="text-truncate" title={value.address}>{value.address}</div>
                    </td>
                    <td>{toPersianDigits(value.codePost)}</td>
                    <td>
                      <StatusSelect
                        onChange={(e) => handleStatusChange(value.id, e.target.value)}
                        items={[
                          { name: "NotSent", value: "درحال ارسال" },
                          { name: "sent", value: "ارسال شده" },
                          { name: "delivered", value: "تحویل شده" },
                          { name: "cancelled", value: "لغو شده" },
                        ]}
                        defaultValue={value.status}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <ShowBtn link={`/OrderDetails?id=${value.id}`} />
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

export default OrdersA;
