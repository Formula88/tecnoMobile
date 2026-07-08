import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import { FaHistory } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { RiCpuFill } from "react-icons/ri";
import styles from "./AboutUs.module.scss";
import img1 from "../../assets/img/AboutUs1.png";
import img2 from "../../assets/img/AboutUs2.png";
import AboutUsInfoCard from "../../components/cards/AboutUsInfoCard/AboutUsInfoCard";
function AboutUs() {
  return (
    <>
      <HeaderNav />
      <section className={styles.AboutUs}>
        <div className="container">
          <h1 className={styles.title}>
            <span className={styles.brand}>تکنوموبایل</span> پیشرو در فناوری و
            خدمات
          </h1>
          <p className={styles.description}>
            ترکیبی از هنر مهندسی و تعهد به کیفیت. ما در تکنوموبایل، آینده‌ی
            ارتباطات را به دستان شما می‌آوریم.
          </p>
          <div className={styles.intro}>
            <div className="row ">
              <div className="col-lg-7 col-12">
                <div className={styles.story}>
                  <div className={styles.titleBox}>
                    <FaHistory />
                    <h2 className={styles.titleB}>داستان ما</h2>
                  </div>
                  <p>
                    سفر تکنوموبایل از یک کارگاه کوچک تعمیرات تخصصی آغاز شد. جایی
                    که عشق به سخت‌افزار با نیاز بازار به خدمات حرفه‌ای گره خورد.
                    در طول یک دهه، ما با تمرکز بر شفافیت و استفاده از
                    تکنولوژی‌های روز دنیا، توانستیم اعتماد هزاران کاربر را جلب
                    کرده و به بزرگترین مرجع تأمین و نگهداری دستگاه‌های هوشمند
                    تبدیل شویم.
                  </p>
                  <img src={img1} />
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div className={`${styles.Info} ${styles.upInfo}`}>
                    <div className={styles.titleBox}>
                      <IoIosRocket />
                      <h2 className={styles.titleB}>ماموریت ما</h2>
                    </div>
                    <p>
                      رساندن پیشرفته‌ترین تکنولوژی‌های ارتباطی به دست مشتریان با
                      کمترین واسطه و بیشترین ضمانت. ما می‌خواهیم هر کاربر،
                      تجربه‌ای بی‌نقص از دنیای دیجیتال داشته باشد.
                    </p>
                  </div>
                  <div className={`${styles.Info} ${styles.downInfo}`}>
                    <div className={styles.titleBox}>
                      <RiCpuFill />
                      <h2 className={styles.titleB}>شفافیت فنی</h2>
                    </div>
                    <p>
                      اعتقاد ما بر این است که مشتری باید دقیقاً بداند در قلب
                      دستگاهش چه می‌گذرد. شفافیت و صداقت را اصل کار خود قرار
                      داده‌ایم تا هر کاربر با آگاهی و اطمینان، بهترین انتخاب را
                      داشته باشد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.info}>
              <span className={styles.subTitle}>تخصص فنی و مهندسی</span>
              <h2 className={styles.titleB}>فراتر از یک تعمیر ساده</h2>
              <ul className={styles.infoCards}>
                <AboutUsInfoCard
                  title={"جراحی مادربورد"}
                  text={"تعمیرات سطح ۳ و میکروسکوپیک با دقت نانومتر."}
                />
                <AboutUsInfoCard
                  title={"زنجیره تأمین قطعات اصلی"}
                  text={
                    "دسترسی مستقیم به قطعات اورجینال از تولیدکنندگان جهانی."
                  }
                />
                <AboutUsInfoCard
                  title={"امنیت داده‌ها"}
                  text={"تضمین ۱۰۰ درصدی حفظ حریم خصوصی در حین فرآیند خدمات."}
                />
              </ul>
            </div>
            <img src={img2} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AboutUs;
