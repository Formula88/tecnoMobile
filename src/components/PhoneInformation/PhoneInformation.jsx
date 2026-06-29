import { HiCpuChip } from "react-icons/hi2";
import { BiSolidMemoryCard } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { CiBatteryFull } from "react-icons/ci";

import styles from "./PhoneInformation.module.scss";

function PhoneInformation({ extra }) {
  if (!extra) return null
  return (
    <>
      <div className="row row-cols-xl-4 row-cols-2">
        <div className="col">
          <div className={styles.card}>
            <HiCpuChip />
            <h3 className={styles.name}>{extra.cpu}</h3>
            <span className={styles.title}>پردازنده</span>
          </div>
        </div>
        <div className="col">
          <div className={styles.card}>
            <BiSolidMemoryCard />
            <h3 className={styles.name}>{extra.memory}</h3>
            <span className={styles.title}>حافظه</span>
          </div>
        </div>
        <div className="col">
          <div className={styles.card}>
            <FaCamera />
            <h3 className={styles.name}>{extra.camera}</h3>
            <span className={styles.title}>دوربین</span>
          </div>
        </div>
        <div className="col">
          <div className={styles.card}>
            <CiBatteryFull />
            <h3 className={styles.name}>{extra.battery}</h3>
            <span className={styles.title}>باتری</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhoneInformation;
