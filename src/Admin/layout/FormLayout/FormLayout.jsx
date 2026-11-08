import { useNavigate } from "react-router-dom";
import styles from "./FormLayout.module.scss";
import { FaArrowRight } from "react-icons/fa";
import AdminLayout from "../AdminLayout";

function FormLayout({ children, title }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AdminLayout>
      <div className={styles.formLayout} dir="rtl">
        <div className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBack}
            title="بازگشت"
          >
            <FaArrowRight className={styles.backIcon} />
            <span>بازگشت به صفحه قبلی</span>
          </button>
          {title && <h2 className={styles.title}>{title}</h2>}
        </div>

        <div className={styles.box}>
          {children}
        </div>
      </div>
    </AdminLayout>
  );
}

export default FormLayout;
