import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import { deleteUser, getUsers } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";

function Users() {
  const [data, setData] = useState([]);

  const getHandle = async () => {
    const result = await getUsers();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData(result.data);
  };

  const deleteHandle = async (id) => {
    const result = await deleteUser(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((user) => user.id !== id));
    successSwal("کاربر با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
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
                    <EditBtn link={`/admin/users/edit/${value.id}`}/>
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

export default Users;
