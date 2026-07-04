import Tilt from "react-parallax-tilt";
import styles from "./IntroHome.module.scss";
import intro from "../../../assets/img/intro.png";
import { Link } from "react-router-dom";
function IntroHome() {
  return (
    <>
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.right}>
              <div className={styles.text}>
                <span className={`alertText ${styles.alert}`}>
                  NEXT-GEN TECHNOLOGY
                </span>
                <h1 className={styles.title}>
                  Tecno<span>Mobile</span>
                </h1>
                <h2 className={styles.titleP}>
                  آینده تکنولوژی در<span> دستان شما</span>
                </h2>
                <p className={styles.subTitle}>
                  تجربه‌ای بی‌نظیر از قدرت و ظرافت. با جدیدترین پرچمداران دنیای
                  موبایل و خدمات ابری اختصاصی، همیشه یک قدم جلوتر باشید.
                </p>
              </div>
              <div className={styles.btns}>
                <Link to="" className="btnPrimary">
                  مشاهده محصولات
                </Link>
                <Link to="" className="btnOutline">
                  دریافت کانفیگ
                </Link>
              </div>
            </div>
            <div className={styles.left}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.5}
                glareColor="#1499E6"
                glarePosition="all"
                glareBorderRadius="20px"
                trackOnWindow={true}
              >
                <img src={intro} alt="tecnomobile" className="noDrag" />
              </Tilt>
            </div>
            <div className={styles.shadow}></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntroHome;
