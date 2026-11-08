import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import { deleteUser, getUsers } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { toPersianDigits } from "../../../utils/Utils";
import { FaUserShield, FaUser } from "react-icons/fa";

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHandle = async () => {
    setLoading(true);
    const result = await getUsers();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
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
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>شماره تماس</th>
              <th>سطح دسترسی</th>
              <th>تاریخ عضویت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  درحال بارگذاری اطلاعات کاربران...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-secondary">
                  هیچ کاربری یافت نشد.
                </td>
              </tr>
            ) : (
              data.map((value, index) => {
                const isAdmin = Number(value.admin) === 1;
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold">{toPersianDigits(value.phone)}</td>
                    <td>
                      {isAdmin ? (
                        <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 d-inline-flex align-items-center gap-1 px-2 py-1">
                          <FaUserShield />
                          <span>مدیر سیستم</span>
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-25 text-light border border-secondary border-opacity-25 d-inline-flex align-items-center gap-1 px-2 py-1">
                          <FaUser />
                          <span>کاربر عادی</span>
                        </span>
                      )}
                    </td>
                    <td>
                      {value.createdAt
                        ? toPersianDigits(new Date(value.createdAt).toLocaleDateString("fa-IR"))
                        : "-"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/users/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این کاربر اطمینان دارید؟"
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

export default Users;
