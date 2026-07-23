import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import { formatPrice, toPersianDigits } from "../../utils/Utils";
import styles from "./OrderDetails.module.scss";

function OrderDetails() {
  return (
    <>
      <HeaderNav />
      <div className={styles.orderDetails} dir="rtl">
        <h1 className={styles.title}>جزئیات سفارش</h1>
        <div>
          <div className="table-responsive">
            <table className="table text-center align-items-center table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>شماره سفارش</th>
                  <th>تاریح پرداخت</th>
                  <th>وضعیت سفارش</th>
                  <th>مبلغ پرداختی</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`#${toPersianDigits(19254)}`}</td>
                  <td>{toPersianDigits("1405/4/01")}</td>
                  <td>ارسال شده</td>
                  <td>{formatPrice(1920000)} تومان</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table className="table text-center align-items-center table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>محصول</th>
                  <th>تعداد</th>
                  <th>قیمت</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>گوشی ایفون 13</td>
                  <td>{toPersianDigits(2)} عدد</td>
                  <td>{formatPrice(85000000)} تومان</td>
                </tr>
                <tr>
                  <td>گوشی ایفون 13</td>
                  <td>{toPersianDigits(2)} عدد</td>
                  <td>{formatPrice(85000000)} تومان</td>
                </tr>
                <tr>
                  <td>گوشی ایفون 13</td>
                  <td>{toPersianDigits(2)} عدد</td>
                  <td>{formatPrice(85000000)} تومان</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table className="table text-center align-items-center table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>نام گیرنده</th>
                  <th>شماره تماس</th>
                  <th>آدرس</th>
                  <th>روش ارسال</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>علی محمدی</td>
                  <td>{toPersianDigits("09123456789")}</td>
                  <td>تهران، خيابان وليعصر، پلاک ١٢٣</td>
                  <td>پست پیشتاز</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/Orders"} className={`btnOutline ${styles.btn}`}>
          بازگشت به سفارشات
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
