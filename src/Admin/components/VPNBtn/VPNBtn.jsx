import { Link } from "react-router-dom";
import styles from "./VPNBtn.module.scss";
import { MdVpnKey } from "react-icons/md";

function VPNBtn({ link, text = "تنظیم کانفیگ" }) {
  return (
    <Link to={link} className={styles.btn} title={text}>
      <MdVpnKey className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </Link>
  );
}

export default VPNBtn;
