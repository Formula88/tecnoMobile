import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { formatPrice, getDiscountAmount, toPersianDigits } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { deleteVpnPlan, getVpnPlans } from "../../../services/api";

function VpnPlan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHandle = async () => {
    setLoading(true);
    const result = await getVpnPlans();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  const deleteHandle = async (id) => {
    const result = await deleteVpnPlan(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    successSwal("پلن با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  return (
    <AdminLayout>
      <AddBtn link={"/admin/vpn/add"} text="افزودن پلن جدید VPN" />

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام پلن</th>
              <th>قیمت پایه</th>
              <th>تخفیف</th>
              <th>قیمت نهایی</th>
              <th>مدت</th>
              <th>حجم</th>
              <th>کاربر</th>
              <th>کلاینت</th>
              <th>پروتکل</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="py-4 text-center">
                  درحال بارگذاری پلن‌های VPN...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-4 text-center text-secondary">
                  هیچ پلن VPN ثبت نشده است.
                </td>
              </tr>
            ) : (
              data.map((value, index) => {
                const finalPrice = getDiscountAmount(value.price, value.discount);
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold text-nowrap">{value.name}</td>
                    <td className="text-nowrap">{formatPrice(value.price)} تومان</td>
                    <td>
                      {value.discount > 0 ? (
                        <span className="badge bg-danger">{toPersianDigits(value.discount)}%</span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-25 text-light">۰%</span>
                      )}
                    </td>
                    <td className="text-nowrap fw-bold">{formatPrice(finalPrice)} تومان</td>
                    <td className="text-nowrap">
                      {value.duration > 0 ? `${toPersianDigits(value.duration)} ماه` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">
                      {value.traffic > 0 ? `${toPersianDigits(value.traffic)} گیگ` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">
                      {value.userCount > 0 ? `${toPersianDigits(value.userCount)} کاربر` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">{value.clientName || "-"}</td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
                        {value.clientProtocol || "-"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/vpn/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این پلن VPN اطمینان دارید؟"
                          btnHandle={() => deleteHandle(value.id)}
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

export default VpnPlan;
