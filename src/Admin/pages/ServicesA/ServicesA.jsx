import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { getDiscountAmount } from "../../../utils/Utils";

function ServicesA() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 50,
        name: "تعمیر کامل گوشی",
        description: "بررسی و تعمیر کامل دستگاه",
        priceIn: 1000000,
        priceOut: 2500000,
        warranty: "0",
      },
      {
        id: 49,
        name: "نصب رام اختصاصی",
        description: "نصب ROM سفارشی",
        priceIn: 200000,
        priceOut: 450000,
        warranty: "0",
      },
      {
        id: 48,
        name: "تعمیر فلش مموری",
        description: "رفع مشکل حافظه داخلی",
        priceIn: 400000,
        priceOut: 800000,
        warranty: "0",
      },
    ]);
  }, []);
  return (
    <AdminLayout>
      <AddBtn link={"/admin/services/add"} />
      <table
        className="table table-bordered table-hover table-striped text-center align-middle"
        dir="rtl"
      >
        <thead>
          <tr className="table-dark">
            <th>ردیف</th>
            <th>نام سرویس</th>
            <th>توضیحات</th>
            <th>شروع قیمت</th>
            <th>پایان قیمت</th>
            <th>گارانتی</th>
            <th>تنطیمات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td className="fw-bold text-nowrap">{value.name}</td>
                <td className="text-nowrap">{value.description}</td>
                <td>{Number(value.priceIn).toLocaleString("fa-IR")} تومان</td>
                <td>{Number(value.priceOut).toLocaleString("fa-IR")} تومان</td>
                <td>
                  {value.warranty > 0 ? (
                    <span className="text-nowrap">{value.userCount} ماه</span>
                  ) : (
                    <span className="text-nowrap">ندارد</span>
                  )}
                </td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={"/admin/services/edit"} />
                    <DeleteBtn />
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

export default ServicesA;
