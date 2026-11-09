import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import { formatPrice, toPersianDigits, parseProductImages, getImageUrl } from "../../utils/Utils";
import styles from "./OrderDetails.module.scss";
import { getUserOrderDetails } from "../../services/api";
import { OrderDetailsSkeleton } from "../../components/ui/Skeleton/Skeleton";

function OrderDetails() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getUserOrderDetails(orderId).then((result) => {
        if (result?.success) {
          setOrder(result.data);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const statusTextMap = {
    NotSent: "درحال آماده‌سازی / ارسال",
    sent: "ارسال شده",
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
  };

  return (
    <>
      <HeaderNav />
      <div className={styles.orderDetails} dir="rtl">
        <h1 className={styles.title}>جزئیات سفارش</h1>
        <div className="container">
          {loading ? (
            <OrderDetailsSkeleton />
          ) : !order ? (
            <div className="text-center py-5">
              <p className="text-white mb-3">سفارش مورد نظر یافت نشد.</p>
              <Link to="/Orders" className="btn btn-outline-info">بازگشت به سفارشات</Link>
            </div>
          ) : (
            <div>
              <div className="table-responsive mb-4">
                <table className="table text-center align-middle table-bordered table-dark table-striped">
                  <thead>
                    <tr>
                      <th>شماره سفارش</th>
                      <th>تاریخ ثبت</th>
                      <th>وضعیت سفارش</th>
                      <th>مبلغ کل</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{`#${toPersianDigits(order.id)}`}</td>
                      <td>{toPersianDigits(new Date(order.createdAt).toLocaleDateString("fa-IR"))}</td>
                      <td>
                        <span className="badge bg-primary">
                          {statusTextMap[order.status] || order.status}
                        </span>
                      </td>
                      <td>{formatPrice(order.totalPrice)} تومان</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-white mb-3 fs-5">اقلام سفارش</h3>
              <div className="table-responsive mb-4">
                <table className="table text-center align-middle table-bordered table-dark table-striped">
                  <thead>
                    <tr>
                      <th>تصویر</th>
                      <th>محصول</th>
                      <th>مدل</th>
                      <th>تعداد</th>
                      <th>قیمت واحد</th>
                      <th>قیمت کل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item) => {
                      const imgs = parseProductImages(item.imgs);
                      const img = getImageUrl(imgs[0]);
                      return (
                        <tr key={item.id}>
                          <td>
                            {img && (
                              <img
                                src={img}
                                alt={item.productName || "محصول"}
                                width="50"
                                height="50"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  aspectRatio: "1 / 1",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                  borderRadius: "8px",
                                  border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                              />
                            )}
                          </td>
                          <td className="fw-bold">{item.productName || "کالا"}</td>
                          <td>{item.ItemGroup && item.ItemGroup !== "product" ? item.ItemGroup : "-"}</td>
                          <td>{toPersianDigits(item.quantity)} عدد</td>
                          <td>{formatPrice(item.price)} تومان</td>
                          <td>{formatPrice(item.price * item.quantity)} تومان</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="card bg-dark text-white border-secondary p-3 mb-4">
                <h4 className="fs-6 text-info mb-2">اطلاعات ارسال</h4>
                <p className="mb-1"><strong>گیرنده:</strong> {order.fullName} ({order.phone})</p>
                <p className="mb-1"><strong>کد پستی:</strong> {toPersianDigits(order.codePost)}</p>
                <p className="mb-0"><strong>آدرس:</strong> {order.address}</p>
              </div>

              <div className="text-center mt-3">
                <Link to="/Orders" className="btn btn-outline-info">
                  بازگشت به لیست سفارشات
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
