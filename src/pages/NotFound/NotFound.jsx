import styles from "./NotFound.module.scss";
import img404 from "../../assets/img/404Error.webp";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <HeaderNav />
      <div className={styles.notFound}>
        <div className="container">
          <img src={img404} alt="404 Error" className={styles.icon} />
          <h1 className={styles.title}>خطای ۴۰۴</h1>
          <p className={styles.subTitle}>صفحه مورد نظر یافت نشد</p>
          <Link to={"/"} className={`btnPrimary ${styles.btn}`}>بازگشت به صفحه اصلی</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
