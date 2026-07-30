import AdminLayout from "../../../layout/AdminLayout";
import EditBtn from "../../../components/EditBtn/EditBtn";
import DeleteBtn from "../../../components/DeleteBtn/DeleteBtn";
import AddBtn from "../../../components/AddBtn/AddBtn";
import { useEffect, useState } from "react";
import { getDiscountAmount } from "../../../../utils/Utils";
import ShowBtn from "../../../components/ShowBtn/ShowBtn";

function Mobile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        NAME: "iPhone 13 Pro Max",
        description: "گوشی اپل iPhone 13 Pro Max",
        price: "280000000",
        discount: "10",
        brandId: "1",
        productType: "mobile",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/iPhone1.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone2.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone3.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone4.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone5.png",
        ],
        details:
          "گوشی iPhone 13 Pro Max یکی از پرچم‌داران محبوب اپل است که با وجود گذشت چند سال از عرضه آن، همچنان عملکرد بسیار قدرتمندی دارد. این گوشی از تراشه A15 Bionic بهره می‌برد که اجرای روان برنامه‌ها، بازی‌های سنگین و چندوظیفگی را تضمین می‌کند. صفحه‌نمایش 6.7 اینچی Super Retina XDR با فناوری ProMotion 120Hz تجربه‌ای بسیار روان و باکیفیت در کار با گوشی ارائه می‌دهد. همچنین سیستم دوربین سه‌گانه 12 مگاپیکسلی شامل لنزهای واید، اولتراواید و تله‌فوتو، عکس‌ها و ویدیوهای حرفه‌ای با جزئیات بالا ثبت می‌کند. باتری قدرتمند آن نیز از نقاط قوت اصلی دستگاه است و می‌تواند یک روز کامل یا حتی بیشتر دوام بیاورد. بدنه استیل ضدزنگ، مقاومت در برابر آب با استاندارد IP68 و پشتیبانی طولانی‌مدت از به‌روزرسانی‌های iOS باعث شده‌اند iPhone 13 Pro Max هنوز هم گزینه‌ای عالی برای کاربرانی باشد که به دنبال یک گوشی پرچم‌دار قابل اعتماد هستند.",
        extra: {
          status: "نو",
          warranty: "6",
          phoneType: "مناسب عکاسی",
          phoneInformation: {
            cpu: "Hexa-core CPU",
            camera: "12",
            memory: "256",
            battery: "4352",
          },
        },
        dateAdded: "2026-06-13 19:32:56",
        showInHome: "1",
      },
      {
        id: 2,
        NAME: "iPhone 13 Pro Max",
        description: "گوشی اپل iPhone 13 Pro Max",
        price: "280000000",
        discount: "10",
        brandId: "1",
        productType: "mobile",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/iPhone1.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone2.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone3.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone4.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone5.png",
        ],
        details:
          "گوشی iPhone 13 Pro Max یکی از پرچم‌داران محبوب اپل است که با وجود گذشت چند سال از عرضه آن، همچنان عملکرد بسیار قدرتمندی دارد. این گوشی از تراشه A15 Bionic بهره می‌برد که اجرای روان برنامه‌ها، بازی‌های سنگین و چندوظیفگی را تضمین می‌کند. صفحه‌نمایش 6.7 اینچی Super Retina XDR با فناوری ProMotion 120Hz تجربه‌ای بسیار روان و باکیفیت در کار با گوشی ارائه می‌دهد. همچنین سیستم دوربین سه‌گانه 12 مگاپیکسلی شامل لنزهای واید، اولتراواید و تله‌فوتو، عکس‌ها و ویدیوهای حرفه‌ای با جزئیات بالا ثبت می‌کند. باتری قدرتمند آن نیز از نقاط قوت اصلی دستگاه است و می‌تواند یک روز کامل یا حتی بیشتر دوام بیاورد. بدنه استیل ضدزنگ، مقاومت در برابر آب با استاندارد IP68 و پشتیبانی طولانی‌مدت از به‌روزرسانی‌های iOS باعث شده‌اند iPhone 13 Pro Max هنوز هم گزینه‌ای عالی برای کاربرانی باشد که به دنبال یک گوشی پرچم‌دار قابل اعتماد هستند.",
        extra: {
          status: "نو",
          warranty: "6",
          phoneType: "مناسب عکاسی",
          phoneInformation: {
            cpu: "Hexa-core CPU",
            camera: "12",
            memory: "256",
            battery: "4352",
          },
        },
        dateAdded: "2026-06-13 19:32:56",
        showInHome: "1",
      },
      {
        id: 3,
        NAME: "iPhone 13 Pro Max",
        description: "گوشی اپل iPhone 13 Pro Max",
        price: "280000000",
        discount: "10",
        brandId: "1",
        productType: "mobile",
        imgs: [
          "http://localhost/tecnomobile/api/public/upload/iPhone1.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone2.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone3.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone4.png",
          "http://localhost/tecnomobile/api/public/upload/iPhone5.png",
        ],
        details:
          "گوشی iPhone 13 Pro Max یکی از پرچم‌داران محبوب اپل است که با وجود گذشت چند سال از عرضه آن، همچنان عملکرد بسیار قدرتمندی دارد. این گوشی از تراشه A15 Bionic بهره می‌برد که اجرای روان برنامه‌ها، بازی‌های سنگین و چندوظیفگی را تضمین می‌کند. صفحه‌نمایش 6.7 اینچی Super Retina XDR با فناوری ProMotion 120Hz تجربه‌ای بسیار روان و باکیفیت در کار با گوشی ارائه می‌دهد. همچنین سیستم دوربین سه‌گانه 12 مگاپیکسلی شامل لنزهای واید، اولتراواید و تله‌فوتو، عکس‌ها و ویدیوهای حرفه‌ای با جزئیات بالا ثبت می‌کند. باتری قدرتمند آن نیز از نقاط قوت اصلی دستگاه است و می‌تواند یک روز کامل یا حتی بیشتر دوام بیاورد. بدنه استیل ضدزنگ، مقاومت در برابر آب با استاندارد IP68 و پشتیبانی طولانی‌مدت از به‌روزرسانی‌های iOS باعث شده‌اند iPhone 13 Pro Max هنوز هم گزینه‌ای عالی برای کاربرانی باشد که به دنبال یک گوشی پرچم‌دار قابل اعتماد هستند.",
        extra: {
          status: "نو",
          warranty: "6",
          phoneType: "مناسب عکاسی",
          phoneInformation: {
            cpu: "Hexa-core CPU",
            camera: "12",
            memory: "256",
            battery: "4352",
          },
        },
        dateAdded: "2026-06-13 19:32:56",
        showInHome: "1",
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <AddBtn link={"/admin/mobile/add"} />

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
              <th>وضعیت</th>
              <th>گارانتی</th>
              <th>نوع گوشی</th>
              <th>CPU</th>
              <th>دوربین</th>
              <th>حافظه</th>
              <th>باتری</th>
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
                    ).toLocaleString("fa-IR")}
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

                  <td className="text-nowrap">{value.extra.status}</td>

                  {value.extra.warranty > 0 ? (
                    <td className="text-nowrap">{value.extra.warranty} ماه</td>
                  ) : (
                    <td className="text-nowrap">ندارد</td>
                  )}

                  <td className="text-nowrap">{value.extra.phoneType}</td>

                  <td className="text-nowrap" dir="ltr">
                    {value.extra.phoneInformation.cpu}
                  </td>

                  <td className="text-nowrap" dir="ltr">
                    {value.extra.phoneInformation.camera} MP
                  </td>

                  <td className="text-nowrap" dir="ltr">
                    {value.extra.phoneInformation.memory} GB
                  </td>

                  <td className="text-nowrap" dir="ltr">
                    {value.extra.phoneInformation.battery} mAh
                  </td>

                  <td style={{ minWidth: "150px" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <ShowBtn link={`/Product/${value.id}`} />
                      <EditBtn link={`/admin/mobile/edit/${value.id}`} />
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

export default Mobile;
