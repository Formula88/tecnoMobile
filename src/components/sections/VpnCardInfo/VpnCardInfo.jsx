import { FaRegCheckCircle } from "react-icons/fa";
import styles from "./VpnCardInfo.module.scss";

function VpnCardInfo({ text, title }) {
  return (
    <li className={styles.li}>
      <FaRegCheckCircle />
      <span>
        {title} : {text}
      </span>
    </li>
  );
}

export default VpnCardInfo;
