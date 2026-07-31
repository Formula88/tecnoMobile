import AdminLayout from "../../../layout/AdminLayout";
import EditBtn from "../../../components/EditBtn/EditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../../components/AddBtn/AddBtn";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import { useEffect, useState } from "react";
import { getDiscountAmount } from "../../../../utils/Utils";

function Hardware() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        NAME: "GPU Ultra 900",
        description: "کارت گرافیک اولترا 900",
        price: "210000000",
        discount: "9",
        brandId: "17",
        productType: "hardware",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/Ultra%20900.png",
        ],
        details:
          "کارت گرافیک Ultra 900 با بهره‌گیری از فناوری‌های پیشرفته پردازش تصویر و معماری بهینه، عملکردی روان و قدرتمند را در اجرای بازی‌ها، طراحی سه‌بعدی و پردازش‌های گرافیکی ارائه می‌دهد. این محصول با مصرف انرژی مناسب و پشتیبانی از رزولوشن‌های بالا، گزینه‌ای ایده‌آل برای کاربران حرفه‌ای و علاقه‌مندان به دنیای گرافیک محسوب می‌شود.",
        extra: {
          warranty: "0",
        },
        dateAdded: "2026-06-14 12:17:26",
        showInHome: "1",
      },
      {
        id: 2,
        NAME: "GPU Ultra 900",
        description: "کارت گرافیک اولترا 900",
        price: "210000000",
        discount: "9",
        brandId: "17",
        productType: "hardware",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/Ultra%20900.png",
        ],
        details:
          "کارت گرافیک Ultra 900 با بهره‌گیری از فناوری‌های پیشرفته پردازش تصویر و معماری بهینه، عملکردی روان و قدرتمند را در اجرای بازی‌ها، طراحی سه‌بعدی و پردازش‌های گرافیکی ارائه می‌دهد. این محصول با مصرف انرژی مناسب و پشتیبانی از رزولوشن‌های بالا، گزینه‌ای ایده‌آل برای کاربران حرفه‌ای و علاقه‌مندان به دنیای گرافیک محسوب می‌شود.",
        extra: {
          warranty: "10",
        },
        dateAdded: "2026-06-14 12:17:26",
        showInHome: "1",
      },
      {
        id: 3,
        NAME: "GPU Ultra 900",
        description: "کارت گرافیک اولترا 900",
        price: "210000000",
        discount: "0",
        brandId: "17",
        productType: "hardware",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/Ultra%20900.png",
        ],
        details:
          "کارت گرافیک Ultra 900 با بهره‌گیری از فناوری‌های پیشرفته پردازش تصویر و معماری بهینه، عملکردی روان و قدرتمند را در اجرای بازی‌ها، طراحی سه‌بعدی و پردازش‌های گرافیکی ارائه می‌دهد. این محصول با مصرف انرژی مناسب و پشتیبانی از رزولوشن‌های بالا، گزینه‌ای ایده‌آل برای کاربران حرفه‌ای و علاقه‌مندان به دنیای گرافیک محسوب می‌شود.",
        extra: {
          warranty: "0",
        },
        dateAdded: "2026-06-14 12:17:26",
        showInHome: "1",
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <AddBtn link={"/admin/products/hardware/add"} />

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
              <th>جزئیات</th>
              <th>گارانتی</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={value.id}>
                  {/* شماره */}
                  <td>{index + 1}</td>

                  {/* نام */}
                  <td className="fw-bold text-nowrap">{value.NAME}</td>

                  {/* توضیحات */}
                  <td
                    style={{
                      minWidth: "220px",
                      maxWidth: "300px",
                    }}
                  >
                    <div className="text-truncate">{value.description}</div>
                  </td>

                  {/* قیمت */}
                  <td className="text-nowrap">
                    {Number(value.price).toLocaleString("fa-IR")} تومان
                  </td>

                  {/* تخفیف */}
                  <td>
                    <span className="badge bg-danger">{value.discount}%</span>
                  </td>

                  {/* قیمت نهایی */}
                  <td className="text-nowrap fw-bold">
                    {Number(
                      getDiscountAmount(value.price, value.discount),
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </td>

                  {/* برند */}
                  <td className="text-nowrap">{value.brandId}</td>

                  {/* تصویر */}
                  <td>
                    <img
                      src={value.imgs[0]}
                      alt={value.NAME}
                      width="70"
                      height="70"
                      style={{
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  {/* جزئیات */}
                  <td
                    style={{
                      minWidth: "300px",
                      maxWidth: "400px",
                    }}
                  >
                    <div className="text-truncate" title={value.details}>
                      {value.details}
                    </div>
                  </td>

                  {/* گارانتی */}
                  {Number(value.extra.warranty) > 0 ? (
                    <td className="text-nowrap">{value.extra.warranty} ماه</td>
                  ) : (
                    <td className="text-nowrap">ندارد</td>
                  )}

                  {/* تنظیمات */}
                  <td style={{ minWidth: "150px" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <ShowBtn link={`/Product/${value.id}`} />

                      <EditBtn
                        link={`/admin/Products/hardware/edit/${value.id}`}
                      />

                      <DeleteBtn />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Hardware;
