import AdminLayout from "../../../layout/AdminLayout";
import EditBtn from "../../../components/EditBtn/EditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../../components/AddBtn/AddBtn";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import { useEffect, useState } from "react";
import { getDiscountAmount, formatPrice, toPersianDigits, parseProductImages, getImageUrl } from "../../../../utils/Utils";
import { deleteAdminProduct, getAdminProducts } from "../../../../services/api";
import { ServerErrorSwal, successSwal } from "../../../../Swals/Swals";

function Accessories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const result = await getAdminProducts("accessories");
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
      successSwal("لوازم جانبی با موفقیت حذف شد", "حذف شد");
    } else {
      ServerErrorSwal(result?.message || "خطا در حذف آیتم");
    }
  };

  return (
    <AdminLayout>
      <AddBtn link={"/admin/products/accessories/add"} />

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
              <th>گارانتی</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="py-4 text-center">درحال بارگذاری اطلاعات...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-4 text-center text-secondary">هیچ لوازم جانبی ثبت نشده است.</td>
              </tr>
            ) : (
              data.map((value, index) => {
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
                    <td style={{ minWidth: "200px", maxWidth: "300px" }}>
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
                    <td className="text-nowrap">
                      {extra.warranty > 0 ? `${toPersianDigits(extra.warranty)} ماه` : "ندارد"}
                    </td>
                    <td style={{ minWidth: "150px" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <ShowBtn link={`/Product/${value.id}`} />
                        <EditBtn link={`/admin/products/accessories/edit/${value.id}`} />
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

export default Accessories;
