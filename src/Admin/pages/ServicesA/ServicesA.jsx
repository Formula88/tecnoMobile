import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { deleteServicesA, getServiceA } from "../../../services/api";
import { formatPrice, toPersianDigits } from "../../../utils/Utils";

function ServicesA() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHandle = async () => {
    setLoading(true);
    const result = await getServiceA();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  const deleteHandle = async (id) => {
    const result = await deleteServicesA(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    successSwal("سرویس با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  return (
    <AdminLayout>
      <AddBtn link={"/admin/services/add"} text="افزودن خدمت جدید" />

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام خدمت</th>
              <th>توضیحات</th>
              <th>شروع قیمت</th>
              <th>پایان قیمت</th>
              <th>گارانتی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  درحال بارگذاری خدمات...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-secondary">
                  هیچ خدمتی ثبت نشده است.
                </td>
              </tr>
            ) : (
              data.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold text-nowrap">{value.name}</td>
                    <td style={{ minWidth: "180px", maxWidth: "260px" }}>
                      <div className="text-truncate" title={value.description}>
                        {value.description}
                      </div>
                    </td>
                    <td className="text-nowrap">{formatPrice(value.priceIn)} تومان</td>
                    <td className="text-nowrap">{formatPrice(value.priceOut)} تومان</td>
                    <td>
                      {value.warranty > 0 ? (
                        <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">
                          {toPersianDigits(value.warranty)} ماه
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-25 text-light">ندارد</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/services/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این خدمت اطمینان دارید؟"
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

export default ServicesA;
