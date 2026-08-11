import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";

function Brands() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: "1",
        name: "Apple",
        category: "mobile",
      },
      {
        id: "2",
        name: "Microsoft",
        category: "hardware",
      },
      {
        id: "3",
        name: "JBL",
        category: "accessory",
      },
    ]);
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
                    <EditBtn link={"/admin/brands/edit"} />
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

export default Brands;
