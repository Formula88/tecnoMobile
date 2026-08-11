import { Link } from "react-router-dom";
import styles from "./VPNBtn.module.scss";
import { MdVpnKey } from "react-icons/md";
function VPNBtn({ link }) {
  return (
    <Link to={link} className={`btnPrimary ${styles.btn}`}>
      <span className={styles.text}>تنظیم کانفیگ</span>
      <MdVpnKey />
    </Link>
  );
}

export default VPNBtn;
