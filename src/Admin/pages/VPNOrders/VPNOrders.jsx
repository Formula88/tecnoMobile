import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getDiscountAmount } from "../../../utils/Utils";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import VPNBtn from "../../components/VPNBtn/VPNBtn";

function VPNOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        Number: "09129072416",
        name: "پلن عادی",
        duration: "0",
        traffic: "100",
        userCount: "3",
        protocol: "VLESS/VMESS",
        clientName: "V2RayN",
        status: "pending",
      },
    ]);
  }, []);
  return (
    <AdminLayout>
      <table
        className="table table-bordered table-hover table-striped text-center align-middle"
        dir="rtl"
      >
        <thead>
          <tr className="table-dark">
            <th>ردیف</th>
            <th>شماره کاربر</th>
            <th>نام پلن</th>
            <th>مدت</th>
            <th>حجم</th>
            <th>تعداد کاربر</th>
            <th>کلاینت</th>
            <th>پروتکل</th>
            <th>وضعیت</th>
            <th>تنطیمات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td className="text-nowrap">{value.Number}</td>
                <td className="fw-bold text-nowrap">{value.name}</td>
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
                <td>{value.protocol}</td>
                <td>
                  {value.status == "pending" && (
                    <span className="text-nowrap">هنوز آماده نشده</span>
                  )}
                  {value.status == "ready" && (
                    <span className="text-nowrap">آماده</span>
                  )}
                </td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <VPNBtn link={"/admin/VPNOrders/set"} />
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

export default VPNOrders;
