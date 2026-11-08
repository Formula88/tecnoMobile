import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { deleteBrand, getBrands } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { toPersianDigits } from "../../../utils/Utils";

function Brands() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const categoryTitle = {
    mobile: "موبایل",
    hardware: "سخت‌افزار",
    accessory: "لوازم جانبی",
  };

  return (
    <AdminLayout>
      <AddBtn link={"/admin/brands/add"} text="افزودن برند جدید" />

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
            ) : (
              data.map((value, index) => {
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
