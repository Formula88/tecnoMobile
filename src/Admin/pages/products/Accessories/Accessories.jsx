import AdminLayout from "../../../layout/AdminLayout";
import EditBtn from "../../../components/EditBtn/EditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../../components/AddBtn/AddBtn";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";
import { useEffect, useState } from "react";
import { getDiscountAmount } from "../../../../utils/Utils";

function Accessories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        NAME: "AirPods 4",
        description: "هدفون بلوتوثی AirPods 4",
        price: "28000000",
        discount: "0",
        brandId: "1",
        productType: "accessories",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/airPad.png",
          "http://localhost/tecnomobile/api/public/upload/airPad2.png",
          "http://localhost/tecnomobile/api/public/upload/airPad3.png",
          "http://localhost/tecnomobile/api/public/upload/airPad4.png",
        ],
        details:
          "AirPods 4 جدیدترین نسل هدفون‌های بی‌سیم اپل هستند که با طراحی سبک و ارگونومیک، راحتی زیادی را در استفاده روزمره فراهم می‌کنند. این هدفون‌ها به لطف تراشه H2 کیفیت صدای شفاف‌تر، بیس قوی‌تر و عملکرد بهتر در تماس‌های صوتی را ارائه می‌دهند. AirPods 4 از قابلیت Spatial Audio با ردیابی حرکات سر پشتیبانی می‌کند که تجربه‌ای فراگیر هنگام گوش دادن به موسیقی و تماشای فیلم ایجاد می‌کند. همچنین اتصال سریع و پایدار به دستگاه‌های اپل، عمر باتری مناسب و مقاومت در برابر گردوغبار و پاشش آب با استاندارد IP54 از دیگر ویژگی‌های مهم آن هستند. برخی نسخه‌های AirPods 4 نیز به Active Noise Cancellation (ANC) مجهز شده‌اند که می‌تواند صداهای مزاحم محیط را تا حد زیادی کاهش دهد و تجربه شنیداری بهتری را فراهم کند.",
        extra: {
          warranty: "12",
        },
        dateAdded: "2026-06-13 20:02:21",
        showInHome: "1",
      },
      {
        id: 2,
        NAME: "AirPods 4",
        description: "هدفون بلوتوثی AirPods 4",
        price: "28000000",
        discount: "0",
        brandId: "1",
        productType: "accessories",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/airPad.png",
          "http://localhost/tecnomobile/api/public/upload/airPad2.png",
          "http://localhost/tecnomobile/api/public/upload/airPad3.png",
          "http://localhost/tecnomobile/api/public/upload/airPad4.png",
        ],
        details:
          "AirPods 4 جدیدترین نسل هدفون‌های بی‌سیم اپل هستند که با طراحی سبک و ارگونومیک، راحتی زیادی را در استفاده روزمره فراهم می‌کنند. این هدفون‌ها به لطف تراشه H2 کیفیت صدای شفاف‌تر، بیس قوی‌تر و عملکرد بهتر در تماس‌های صوتی را ارائه می‌دهند. AirPods 4 از قابلیت Spatial Audio با ردیابی حرکات سر پشتیبانی می‌کند که تجربه‌ای فراگیر هنگام گوش دادن به موسیقی و تماشای فیلم ایجاد می‌کند. همچنین اتصال سریع و پایدار به دستگاه‌های اپل، عمر باتری مناسب و مقاومت در برابر گردوغبار و پاشش آب با استاندارد IP54 از دیگر ویژگی‌های مهم آن هستند. برخی نسخه‌های AirPods 4 نیز به Active Noise Cancellation (ANC) مجهز شده‌اند که می‌تواند صداهای مزاحم محیط را تا حد زیادی کاهش دهد و تجربه شنیداری بهتری را فراهم کند.",
        extra: {
          warranty: "12",
        },
        dateAdded: "2026-06-13 20:02:21",
        showInHome: "1",
      },
      {
        id: 3,
        NAME: "AirPods 4",
        description: "هدفون بلوتوثی AirPods 4",
        price: "28000000",
        discount: "0",
        brandId: "1",
        productType: "accessories",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/airPad.png",
          "http://localhost/tecnomobile/api/public/upload/airPad2.png",
          "http://localhost/tecnomobile/api/public/upload/airPad3.png",
          "http://localhost/tecnomobile/api/public/upload/airPad4.png",
        ],
        details:
          "AirPods 4 جدیدترین نسل هدفون‌های بی‌سیم اپل هستند که با طراحی سبک و ارگونومیک، راحتی زیادی را در استفاده روزمره فراهم می‌کنند. این هدفون‌ها به لطف تراشه H2 کیفیت صدای شفاف‌تر، بیس قوی‌تر و عملکرد بهتر در تماس‌های صوتی را ارائه می‌دهند. AirPods 4 از قابلیت Spatial Audio با ردیابی حرکات سر پشتیبانی می‌کند که تجربه‌ای فراگیر هنگام گوش دادن به موسیقی و تماشای فیلم ایجاد می‌کند. همچنین اتصال سریع و پایدار به دستگاه‌های اپل، عمر باتری مناسب و مقاومت در برابر گردوغبار و پاشش آب با استاندارد IP54 از دیگر ویژگی‌های مهم آن هستند. برخی نسخه‌های AirPods 4 نیز به Active Noise Cancellation (ANC) مجهز شده‌اند که می‌تواند صداهای مزاحم محیط را تا حد زیادی کاهش دهد و تجربه شنیداری بهتری را فراهم کند.",
        extra: {
          warranty: "12",
        },
        dateAdded: "2026-06-13 20:02:21",
        showInHome: "1",
      },
    ]);
  }, []);

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
              <th>جزئیات</th>
              <th>گارانتی</th>
              <th>تنظیمات</th>
            </tr>
          </thead>

          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={value.id}>
                  <td>{index + 1}</td>

                  <td className="fw-bold text-nowrap">{value.NAME}</td>

                  <td
                    style={{
                      minWidth: "220px",
                      maxWidth: "300px",
                    }}
                  >
                    <div className="text-truncate">{value.description}</div>
                  </td>

                  <td className="text-nowrap">
                    {Number(value.price).toLocaleString("fa-IR")} تومان
                  </td>

                  <td>
                    <span className="badge bg-danger">{value.discount}%</span>
                  </td>

                  <td className="text-nowrap fw-bold">
                    {Number(
                      getDiscountAmount(value.price, value.discount),
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </td>

                  <td className="text-nowrap">{value.brandId}</td>

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

                  {Number(value.extra.warranty) > 0 ? (
                    <td className="text-nowrap">{value.extra.warranty} ماه</td>
                  ) : (
                    <td className="text-nowrap">ندارد</td>
                  )}
                  <td style={{ minWidth: "150px" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <ShowBtn link={`/Product/${value.id}`} />

                      <EditBtn
                        link={`/admin/Products/accessories/edit/${value.id}`}
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

export default Accessories;
