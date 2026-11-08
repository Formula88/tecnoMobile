import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import { deleteAdminRepairOrder, getAdminRepairOrders } from "../../../services/api";
import { toPersianDigits } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";

function ServiceReservation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <AdminLayout>
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
            ) : (
              data.map((value, index) => {
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
