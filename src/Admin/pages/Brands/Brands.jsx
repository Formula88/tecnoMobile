import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { deleteBrand, getBrands } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";

function Brands() {
  const [data, setData] = useState([]);

  const getHandle = async () => {
    const result = await getBrands();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData(result.data);
  };

  const deleteHandle = async (id) => {
    const result = await deleteBrand(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((user) => user.id !== id));
    successSwal("برند با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  const categoryTitle = {
    mobile: "موبایل",
    hardware: "سخت افزار",
    accessory: "لوازم جانبی",
  };

  return (
    <AdminLayout>
      <AddBtn link={"/admin/brands/add"} />
      <table
        className="table table-bordered table-hover table-striped text-center align-middle"
        dir="rtl"
      >
        <thead>
          <tr className="table-dark">
            <th>ردیف</th>
            <th>نام برند</th>
            <th>کتگوری برند</th>
            <th>تنظیمات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{categoryTitle[value.category]}</td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={`/admin/brands/edit/${value.id}`} />
                    <DeleteBtn btnHandle={() => {
                      deleteHandle(value.id)
                    }}/>
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

export default Brands;
