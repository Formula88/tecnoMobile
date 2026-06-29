import styles from "./IntroServices.module.scss";
import introImg from "../../assets/img/introServices.png";
import { GoTools } from "react-icons/go";
import { MdOutlineTerminal } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function IntroServices() {
  const Navigate = useNavigate();
  return (
    <>
      <div className={styles.introServices}>
        <div className="container">
          <div className={styles.titleIntro}>
            <h1 className={styles.title}>مرکز تخصصی خدمات هوشمند</h1>
            <p>
              ارائه راهکارهای نوین تعمیراتی و ارتقای سیستم با بالاترین
              استانداردهای جهانی در تکنوموبایل.
            </p>
          </div>
          <div className={styles.cardsIntro}>
            <div className="row">
              <div className=" col-xl-8 col-lg-6 col-12">
                <div
                  className={styles.bigBox}
                  style={{ backgroundImage: `url(${introImg})` }}
                >
                  <div className={styles.card}>
                    <div className={styles.subTitle}>
                      <GoTools />
                      <span>Premium Service</span>
                    </div>
                    <h3 className={styles.title}>
                      تعمیرات سخت‌افزاری موبایل و لپ‌تاپ
                    </h3>
                    <ul>
                      <li>
                        <FaRegCheckCircle />
                        <span>تعویض تخصصی نمایشگر و باتری</span>
                      </li>
                      <li>
                        <FaRegCheckCircle />
                        <span>عیب‌یابی و تعمیر بردهای اصلی (Logic Board)</span>
                      </li>
                      <li>
                        <FaRegCheckCircle />
                        <span>بازیابی دستگاه‌های آب‌خورده</span>
                      </li>
                    </ul>
                    <button
                      className={`btnPrimary ${styles.btn}`}
                      onClick={() => {
                        Navigate("/services#form");
                      }}
                    >
                      ثبت درخواست تعمیر
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-12">
                <div className={styles.smallBox}>
                  <MdOutlineTerminal />
                  <h3>خدمات نرم‌افزاری</h3>
                  <p>
                    نصب اپلیکیشن‌های تخصصی، رفع خطاهای سیستمی و به‌روزرسانی
                    سیستم‌عامل.
                  </p>
                  <div className={styles.op}>
                    <span>iOS / Android</span>
                    <span>Windows / MacOS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroServices;
