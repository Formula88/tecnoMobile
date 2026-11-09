import { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import EditBtn from "../../components/EditBtn/EditBtn";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../components/AddBtn/AddBtn";
import AdminSearchBar from "../../components/AdminSearchBar/AdminSearchBar";
import { formatPrice, getDiscountAmount, toPersianDigits, normalizeSearchText } from "../../../utils/Utils";
import { ServerErrorSwal, successSwal } from "../../../Swals/Swals";
import { deleteVpnPlan, getVpnPlans } from "../../../services/api";
import { FaSearch } from "react-icons/fa";
import { AdminTableSkeleton } from "../../../components/ui/Skeleton/Skeleton";

function VpnPlan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getHandle = async () => {
    setLoading(true);
    const result = await getVpnPlans();
    if (!result?.success) {
      ServerErrorSwal();
    } else {
      setData(result.data || []);
    }
    setLoading(false);
  };

  const deleteHandle = async (id) => {
    const result = await deleteVpnPlan(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    successSwal("پلن با موفقیت حذف شد", "حذف شد");
  };

  useEffect(() => {
    getHandle();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((plan) => {
      const name = normalizeSearchText(plan.name);
      const client = normalizeSearchText(plan.clientName);
      const proto = normalizeSearchText(plan.clientProtocol);
      const price = plan.price ? plan.price.toString() : "";
      const duration = plan.duration ? plan.duration.toString() : "";
      const traffic = plan.traffic ? plan.traffic.toString() : "";

      return (
        name.includes(term) ||
        client.includes(term) ||
        proto.includes(term) ||
        price.includes(term) ||
        duration.includes(term) ||
        traffic.includes(term)
      );
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در نام پلن، پروتکل، کلاینت، قیمت..."
          count={filteredData.length}
          totalCount={data.length}
        />
        <AddBtn link={"/admin/vpn/add"} text="افزودن پلن جدید VPN" />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>ردیف</th>
              <th>نام پلن</th>
              <th>قیمت پایه</th>
              <th>تخفیف</th>
              <th>قیمت نهایی</th>
              <th>مدت</th>
              <th>حجم</th>
              <th>کاربر</th>
              <th>کلاینت</th>
              <th>پروتکل</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <AdminTableSkeleton rows={5} columns={11} />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-4 text-center text-secondary">
                  هیچ پلن VPN ثبت نشده است.
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ پلنی با عبارت «{searchTerm}» پیدا نشد.</span>
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
                const finalPrice = getDiscountAmount(value.price, value.discount);
                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold text-nowrap">{value.name}</td>
                    <td className="text-nowrap">{formatPrice(value.price)} تومان</td>
                    <td>
                      {value.discount > 0 ? (
                        <span className="badge bg-danger">{toPersianDigits(value.discount)}%</span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-25 text-light">۰%</span>
                      )}
                    </td>
                    <td className="text-nowrap fw-bold">{formatPrice(finalPrice)} تومان</td>
                    <td className="text-nowrap">
                      {value.duration > 0 ? `${toPersianDigits(value.duration)} ماه` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">
                      {value.traffic > 0 ? `${toPersianDigits(value.traffic)} گیگ` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">
                      {value.userCount > 0 ? `${toPersianDigits(value.userCount)} کاربر` : "نامحدود"}
                    </td>
                    <td className="text-nowrap">{value.clientName || "-"}</td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-25 text-info border border-info border-opacity-25 px-2 py-1">
                        {value.clientProtocol || "-"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditBtn link={`/admin/vpn/edit/${value.id}`} />
                        <DeleteBtn
                          confirmText="آیا از حذف این پلن VPN اطمینان دارید؟"
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

export default VpnPlan;
