import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import { deleteVpnClient, getVpnClients } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";

function VpnClients() {
  const [data, setData] = useState([]);

  const getHandle = async () => {
    const result = await getVpnClients();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData(result.data);
  };

  const deleteHandle = async (id) => {
    const result = await deleteVpnClient(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((user) => user.id !== id));
    successSwal("کلاینت با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);
  return (
    <AdminLayout>
      <AddBtn link={"/admin/vpnClients/add"} />
      <table
        className="table table-bordered table-hover table-striped text-center align-middle"
        dir="rtl"
      >
        <thead>
          <tr className="table-dark">
            <th>ردیف</th>
            <th>نام کلاینت</th>
            <th>پروتکل</th>
            <th>لینک دانلود</th>
            <th>تنطیمات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={value.id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.protocol}</td>
                <td>
                  <a href={value.downloadUrl} target="_blank">
                    {value.downloadUrl}
                  </a>
                </td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={`/admin/vpnClients/edit/${value.id}`} />
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

export default VpnClients;
