import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { getDiscountAmount } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { deleteVpnPlan, getVpnPlans } from "../../../services/api";

function VpnPlan() {
  const [data, setData] = useState([]);

  const getHandle = async () => {
    const result = await getVpnPlans();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData(result.data);
  };

  const deleteHandle = async (id) => {
    const result = await deleteVpnPlan(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((user) => user.id !== id));
    successSwal("پلن با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  return (
    <AdminLayout>
      <AddBtn link={"/admin/vpn/add"} />
      <table
        className="table table-bordered table-hover table-striped text-center align-middle"
        dir="rtl"
      >
        <thead>
          <tr className="table-dark">
            <th>ردیف</th>
            <th>نام پلن</th>
            <th>قیمت</th>
            <th>تخفیف</th>
            <th>قیمت کل</th>
            <th>مدت</th>
            <th>حجم</th>
            <th>تعداد کاربر</th>
            <th>کلاینت</th>
            <th>پروتکل</th>
            <th>تنطیمات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td className="fw-bold text-nowrap">{value.name}</td>
                <td>{Number(value.price).toLocaleString("fa-IR")} تومان</td>
                <td>
                  <span className="badge bg-danger">{value.discount}%</span>
                </td>
                <td className="text-nowrap fw-bold">
                  {Number(
                    getDiscountAmount(value.price, value.discount),
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </td>
                <td>
                  {value.duration > 0 ? (
                    <span className="text-nowrap">{value.duration} ماه</span>
                  ) : (
                    <span className="text-nowrap">نامحدود</span>
                  )}
                </td>
                <td>
                  {value.traffic > 0 ? (
                    <span className="text-nowrap">{value.traffic} گیگ</span>
                  ) : (
                    <span className="text-nowrap">نامحدود</span>
                  )}
                </td>
                <td>
                  {value.userCount > 0 ? (
                    <span className="text-nowrap">{value.userCount} نفر</span>
                  ) : (
                    <span className="text-nowrap">نامحدود</span>
                  )}
                </td>
                <td>{value.clientName}</td>
                <td>{value.clientProtocol}</td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={`/admin/vpn/edit/${value.id}`} />
                    <DeleteBtn
                      btnHandle={() => {
                        deleteHandle(value.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default VpnPlan;
