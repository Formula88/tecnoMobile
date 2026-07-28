import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: "1",
        phone: "09129072416",
        admin: "0",
        createdAt: "2026-07-02 19:32:40",
      },
      {
        id: "2",
        phone: "09129072446",
        admin: "1",
        createdAt: "2026-07-03 19:40:20",
      },
      {
        id: "3",
        phone: "09390719229",
        admin: "0",
        createdAt: "2026-07-28 17:04:12",
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
            <th>شماره تماس</th>
            <th>وضعیت کاربر</th>
            <th>تاریخ ورود</th>
            <th>مدیریت</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td>{value.phone}</td>
                <td>
                  {value.admin == 0 && "کاربر عادی"}
                  {value.admin == 1 && "ادمین"}
                </td>
                <td>{value.createdAt}</td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn />
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

export default Users;
