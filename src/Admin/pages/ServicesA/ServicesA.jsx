import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { deleteServicesA, getServiceA } from "../../../services/api";

function ServicesA() {
  const [data, setData] = useState([]);

  const getHandle = async () => {
    const result = await getServiceA();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData(result.data);
  };

  const deleteHandle = async (id) => {
    const result = await deleteServicesA(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((user) => user.id !== id));
    successSwal("سرویس با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
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
                    <span className="text-nowrap">{value.warranty} ماه</span>
                  ) : (
                    <span className="text-nowrap">ندارد</span>
                  )}
                </td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={`/admin/services/edit/${value.id}`} />
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

export default ServicesA;
