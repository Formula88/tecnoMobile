import styles from "./DetailsList.module.scss";
import { IoIosCheckmarkCircle } from "react-icons/io";

function DetailsList({title , text}) {
  return (
    <>
      <div className={styles.detailsList}>
        <IoIosCheckmarkCircle />
        <span>{title} : {text}</span>
      </div>
    </>
  );
}

export default DetailsList;
