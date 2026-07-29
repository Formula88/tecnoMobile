import { useNavigate } from "react-router-dom";
import styles from "./FormLayout.module.scss";
import { FaChevronLeft } from "react-icons/fa";

function FormLayout({ children }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.formLayout}>
      <div className={styles.box}>
        {children}
        <div className={styles.back} onClick={handleBack}>
          <span>بازگشت به صفحه قبلی</span>
          <FaChevronLeft />
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
