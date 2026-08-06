import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import StatusSelect from "../../components/StatusSelect/StatusSelect";

function ServiceReservation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: "علی ناصری",
        number: "09123456789",
        deviceType: "گوشی هوشمند",
        serviceType: "خدمات نرم‌افزار",
        description: "گوشی روی لوگو گیر کرده",
        reviewed: "false",
      },
      {
        name: "علی ناصری",
        number: "09123456789",
        deviceType: "گوشی هوشمند",
        serviceType: "خدمات نرم‌افزار",
        description: "گوشی روی لوگو گیر کرده",
        reviewed: "true",
      },
      {
        name: "علی ناصری",
        number: "09123456789",
        deviceType: "گوشی هوشمند",
        serviceType: "خدمات نرم‌افزار",
        description: "گوشی روی لوگو گیر کرده",
        reviewed: "false",
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
            <th>نام</th>
            <th>شماره تماس</th>
            <th>نوع دستگاه</th>
            <th>نوع سرویس</th>
            <th>توضیحات</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.number}</td>
                <td>{value.deviceType}</td>
                <td>{value.serviceType}</td>
                <td className="w-25">{value.description}</td>
                <td className="d-flex justify-content-center">
                  <StatusSelect
                    onChange={{}}
                    items={[
                      { name: "false", value: "درحال برسی" },
                      { name: "true", value: "برسی شده" },
                    ]}
                    defaultValue={value.reviewed}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default ServiceReservation;
