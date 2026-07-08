import { useContext } from "react";
import styles from "./Loading.module.scss";
import { Context } from "../../../context/AppContext";
import logo from "../../../assets/img/logo.svg"

function Loading() {
  const { setScrollEnabled } = useContext(Context);
  setScrollEnabled(false);
  return (
    <>
      <div className={styles.loading}>
        <img src={logo} alt="tecnoMobile" />
        <div className={styles.container}>
          <div className={styles.loader}></div>
          <div className={styles.loader}></div>
          <div className={styles.loader}></div>
        </div>
        <h2 className={styles.title}>لطفا منتظر بمانید ...</h2>
      </div>
    </>
  );
}

export default Loading;
