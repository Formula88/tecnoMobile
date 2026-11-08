import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { deleteVpnClient, getVpnClients } from "../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";

function VpnClients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getHandle = async () => {
    setLoading(true);
    const result = await getVpnClients();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  const deleteHandle = async (id) => {
    const result = await deleteVpnClient(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    successSwal("کلاینت با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      const name = normalizeSearchText(item.name);
      const proto = normalizeSearchText(item.protocol);
      const url = normalizeSearchText(item.downloadUrl);

      return name.includes(term) || proto.includes(term) || url.includes(term);
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در نام کلاینت، پروتکل..."
          count={filteredData.length}
          totalCount={data.length}
        />
        <AddBtn link={"/admin/vpnClients/add"} text="افزودن کلاینت جدید" />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام کلاینت</th>
              <th>پروتکل</th>
              <th>لینک دانلود</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  درحال بارگذاری کلاینت‌ها...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-secondary">
                  هیچ کلاینتی ثبت نشده است.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ کلاینتی با عبارت «{searchTerm}» پیدا نشد.</span>
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
                        {value.protocol}
                      </span>
                    </td>
                    <td style={{ maxWidth: "250px" }}>
                      {value.downloadUrl ? (
                        <a
                          href={value.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-inline-flex align-items-center gap-1 text-info text-decoration-none text-truncate"
                          style={{ maxWidth: "220px" }}
                        >
                          <span className="text-truncate">{value.downloadUrl}</span>
                          <FaExternalLinkAlt style={{ fontSize: "0.7rem", flexShrink: 0 }} />
                        </a>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/vpnClients/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این کلاینت اطمینان دارید؟"
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

export default VpnClients;
