import AdminLayout from "../../../layout/AdminLayout";
import EditBtn from "../../../components/EditBtn/EditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../../components/AddBtn/AddBtn";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import AdminSearchBar from "../../../components/AdminSearchBar/AdminSearchBar";
import { useEffect, useState, useMemo } from "react";
import {
  getDiscountAmount,
  formatPrice,
  toPersianDigits,
  parseProductImages,
  getImageUrl,
  normalizeSearchText,
} from "../../../../utils/Utils";
import { deleteAdminProduct, getAdminProducts } from "../../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../../Swals/Swals";
import { FaSearch } from "react-icons/fa";

function Accessoriesmodel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    const result = await getAdminProducts("accessoriesmodel");
    if (result?.success && Array.isArray(result.data)) {
      setData(result.data);
    } else {
      ServerErrorSwal();
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteAdminProduct(id);
    if (result?.success) {
      setData((prev) => prev.filter((item) => item.id !== id));
      successSwal("کالای مدل‌دار با موفقیت حذف شد", "حذف شد");
    } else {
      ServerErrorSwal(result?.message || "خطا در حذف آیتم");
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = normalizeSearchText(searchTerm);
    return data.filter((item) => {
      let extra = {};
      try {
        extra = typeof item.extra === "string" ? JSON.parse(item.extra) : (item.extra || {});
      } catch {
        extra = {};
      }
      const name = normalizeSearchText(item.name || item.NAME);
      const desc = normalizeSearchText(item.description);
      const brand = normalizeSearchText(item.brand || item.brandName);
      const price = item.price ? item.price.toString() : "";
      const model = normalizeSearchText(extra.model);
      const color = normalizeSearchText(extra.color);

      return (
        name.includes(term) ||
        desc.includes(term) ||
        brand.includes(term) ||
        price.includes(term) ||
        model.includes(term) ||
        color.includes(term)
      );
    });
  }, [data, searchTerm]);

  return (
    <AdminLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3" dir="rtl">
        <AdminSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در کالای مدل‌دار، مدل دستگاه، رنگ، قیمت..."
          count={filteredData.length}
          totalCount={data.length}
        />
        <AddBtn link={"/admin/products/accessoriesmodel/add"} text="افزودن لوازم مدل‌دار" />
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover text-center align-middle mb-0"
          dir="rtl"
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>نام</th>
              <th>توضیحات</th>
              <th>قیمت</th>
              <th>تخفیف</th>
              <th>قیمت نهایی</th>
              <th>برند</th>
              <th>تصویر</th>
              <th>مدل سازگار</th>
              <th>رنگ</th>
              <th>گارانتی</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="py-4 text-center">درحال بارگذاری اطلاعات...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="12" className="py-4 text-center text-secondary">هیچ کالایی ثبت نشده است.</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="12" className="py-5 text-center">
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <FaSearch style={{ fontSize: "1.8rem", color: "#64748b" }} />
                    <span className="text-secondary">هیچ کالایی منطبق با «{searchTerm}» پیدا نشد.</span>
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
                let extra = {};
                try {
                  extra = typeof value.extra === "string" ? JSON.parse(value.extra) : (value.extra || {});
                } catch {
                  extra = {};
                }

                const imgs = parseProductImages(value.imgs);
                const firstImg = getImageUrl(imgs[0]);
                const finalPrice = getDiscountAmount(value.price, value.discount);

                return (
                  <tr key={value.id}>
                    <td>{toPersianDigits(index + 1)}</td>
                    <td className="fw-bold text-nowrap">{value.name || value.NAME}</td>
                    <td style={{ minWidth: "180px", maxWidth: "250px" }}>
                      <div className="text-truncate">{value.description}</div>
                    </td>
                    <td className="text-nowrap">{formatPrice(value.price)} تومان</td>
                    <td>
                      {value.discount > 0 ? (
                        <span className="badge bg-danger">{toPersianDigits(value.discount)}%</span>
                      ) : (
                        <span className="badge bg-secondary">۰%</span>
                      )}
                    </td>
                    <td className="text-nowrap fw-bold">{formatPrice(finalPrice)} تومان</td>
                    <td className="text-nowrap">{value.brand || value.brandId}</td>
                    <td>
                      {firstImg ? (
                        <img
                          src={firstImg}
                          alt={value.name}
                          width="60"
                          height="60"
                          style={{ objectFit: "contain", borderRadius: "8px" }}
                        />
                      ) : (
                        <span className="text-muted">بدون عکس</span>
                      )}
                    </td>
                    <td className="text-nowrap">{extra.model || "-"}</td>
                    <td className="text-nowrap">{extra.color || "-"}</td>
                    <td className="text-nowrap">
                      {extra.warranty > 0 ? `${toPersianDigits(extra.warranty)} ماه` : "ندارد"}
                    </td>
                    <td style={{ minWidth: "150px" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <ShowBtn link={`/Product/${value.id}`} />
                        <EditBtn link={`/admin/products/accessoriesmodel/edit/${value.id}`} />
                        <DeleteBtn btnHandle={() => handleDelete(value.id)} />
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

export default Accessoriesmodel;
