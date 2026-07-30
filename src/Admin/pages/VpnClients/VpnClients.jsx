import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";

function VpnClients() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: "1",
        name: "V2RayN",
        protocol: "VLESS/VMESS",
        downloadUrl:
          "https://github.com/2dust/v2rayNG/releases/download/2.2.6/v2rayNG_2.2.6-fdroid_arm64-v8a.apk",
      },
      {
        id: "2",
        name: "V2RayN",
        protocol: "VLESS/VMESS",
        downloadUrl:
          "https://github.com/2dust/v2rayNG/releases/download/2.2.6/v2rayNG_2.2.6-fdroid_arm64-v8a.apk",
      },
      {
        id: "3",
        name: "V2RayN",
        protocol: "VLESS/VMESS",
        downloadUrl:
          "https://github.com/2dust/v2rayNG/releases/download/2.2.6/v2rayNG_2.2.6-fdroid_arm64-v8a.apk",
      },
    ]);
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
                <td><a href={value.downloadUrl} target="_blank">{value.downloadUrl}</a></td>
                <td className="w-25">
                  <div className="d-flex justify-content-around">
                    <EditBtn link={"/admin/vpnClients/edit"} />
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

export default VpnClients;
