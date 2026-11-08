import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { deleteBrand, getBrands } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { FaSearch } from "react-icons/fa";

const categoryTitle = {
  mobile: "موبایل",
  hardware: "سخت‌افزار",
  accessory: "لوازم جانبی",
};

function Brands() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getHandle = async () => {
    setLoading(true);
    const result = await getBrands();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  const deleteHandle = async (id) => {
    const result = await deleteBrand(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    successSwal("برند با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);



  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      const name = normalizeSearchText(item.name);
      const catKey = normalizeSearchText(item.category);
      const catPersian = normalizeSearchText(categoryTitle[item.category]);

      return name.includes(term) || catKey.includes(term) || catPersian.includes(term);
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در نام برند، دسته‌بندی..."
          count={filteredData.length}
          totalCount={data.length}
        />
        <AddBtn link={"/admin/brands/add"} text="افزودن برند جدید" />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام برند</th>
              <th>دسته‌بندی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  درحال بارگذاری برندها...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-secondary">
                  هیچ برندی ثبت نشده است.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ برندی منطبق با «{searchTerm}» پیدا نشد.</span>
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
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold">{value.name}</td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
                        {categoryTitle[value.category] || value.category}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/brands/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این برند اطمینان دارید؟"
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

export default Brands;
