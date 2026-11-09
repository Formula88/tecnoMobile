import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { deleteUser, getUsers } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { FaUserShield, FaUser, FaSearch } from "react-icons/fa";

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((user) => {
      const username = normalizeSearchText(user.username || "");
      const email = normalizeSearchText(user.email || "");
      const phone = normalizeSearchText(user.phone || "");
      const id = user.id ? user.id.toString() : "";
      const isAdmin = Number(user.admin) === 1;
      const roleStr = isAdmin ? "مدیر ادمین admin" : "عادی کاربر user";

      return (
        username.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        id.includes(term) ||
        roleStr.includes(term)
      );
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در نام کاربری، ایمیل، شماره تماس، شناسه..."
          count={filteredData.length}
          totalCount={data.length}
        />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>سطح دسترسی</th>
              <th>تاریخ عضویت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  درحال بارگذاری اطلاعات کاربران...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-secondary">
                  هیچ کاربری یافت نشد.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ کاربری با عبارت «{searchTerm}» پیدا نشد.</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info mt-1"
                      onClick={() => setSearchTerm("")}
                    >
                      پاک کردن فیلتر
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((value, index) => {
                const isAdmin = Number(value.admin) === 1;
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold text-info">{value.username || "—"}</td>
                    <td className="text-light" style={{ direction: "ltr" }}>{value.email || "—"}</td>
                    <td className="fw-bold">{value.phone ? toPersianDigits(value.phone) : "—"}</td>
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
