import styles from "./AdminLayout.module.scss";
import Sidebar from "./Sidebar/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
    </div>
  );
}

export default AdminLayout;
