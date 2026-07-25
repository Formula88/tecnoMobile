import styles from "./AdminLayout.module.scss";
import Sidbar from "./Sidbar/Sidbar";

function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidbar />
    </div>
  );
}

export default AdminLayout;
