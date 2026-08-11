import AdminLayout from "../../../layout/AdminLayout";
import { useEffect, useState } from "react";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import StatusSelect from "../../../components/StatusSelect/StatusSelect";
function OrdersA() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1001,
        order_number: "ORD-20260806-001",
        payment_date: "2026-08-06T14:30:00",
        paid_amount: 1250000,
        recipient_name: "علی رضایی",
        phone: "09121234567",
        address: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲",
        postal_code: "1968831171",
        status: "NotSent",
      },
      {
        id: 1002,
        order_number: "ORD-20260805-014",
        payment_date: "2026-08-05T09:15:00",
        paid_amount: 450000,
        recipient_name: "مریم احمدی",
        phone: "09351112233",
        address: "اصفهان، خیابان چهارباغ، پلاک ۸",
        postal_code: "8173845671",
        status: "sent",
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>شماره سفارش</th>
              <th>تاریح پرداخت</th>
              <th>مبلغ پرداختی</th>
              <th>نام گیرنده</th>
              <th>شماره تماس</th>
              <th>آدرس</th>
              <th>کد پست</th>
              <th>وضعیت</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={value.id}>
                  <td>{index + 1}</td>
                  <td className="text-nowrap">{value.order_number}</td>
                  <td className="text-nowrap">{value.payment_date}</td>
                  <td className="text-nowrap fw-bold">
                    {Number(value.paid_amount).toLocaleString("fa-IR")} تومان
                  </td>
                  <td className="text-nowrap">{value.recipient_name}</td>
                  <td>{value.phone}</td>
                  <td>{value.address}</td>
                  <td>{value.postal_code}</td>
                  <td>
                    <StatusSelect
                      onChange={{}}
                      items={[
                        { name: "NotSent", value: "درحال ارسال" },
                        { name: "sent", value: "ارسال شده" },
                      ]}
                      defaultValue={value.status}
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <ShowBtn link={``} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default OrdersA;
