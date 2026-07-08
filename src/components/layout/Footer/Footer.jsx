import FooterCard from "../../cards/FooterCard/FooterCard";
import styles from "./Footer.module.scss";
import logo from "../../../assets/img/logo.svg";
import { RiTelegram2Fill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={`row flex-row-reverse ${styles.up}`}>
            <div className="col-lg-6 col-12">
              <div className={styles.information}>
                <img src={logo} alt="tecoMobile" className={styles.logo} />
                <p>
                  مرکز تخصصی فروش هوشمند و خدمات نوین تکنولوژی. همراه شما در
                  دنیای دیجیتال.
                </p>
              </div>
            </div>

            <div className={`col-lg-3 col-sm-6 col-12 ${styles.card}`}>
              <FooterCard
                title="صفحات"
                item={[
                  { title: "خانه", link: "/" },
                  { title: "محصولات", link: "/products" },
                  { title: "VPN", link: "/VPN" },
                  { title: "خدمات", link: "/Services" },
                  { title: "درباره‌ما", link: "/AboutUs" },
                ]}
              />
            </div>
            <div className={`col-lg-3 col-sm-6 col-12$ ${styles.card}`}>
              <FooterCard
                title="لینک های مفید"
                item={[
                  { title: "تماس با ما", link: "tel:+989925605247" },
                  {
                    title: "آدرس ما",
                    link: "https://www.google.com/maps?q=35.63014581819684,51.402783896298594",
                  },
                  { title: "ثبت درخواست تعمیر", link: "/Services#form" },
                ]}
              />
            </div>
          </div>
          <div className={styles.down}>
            <p>© 2026 TecnoMobile | All Rights Reserved</p>
            <div className={styles.link}>
              <Link to="#">
                <RiTelegram2Fill />
              </Link>
              <Link
                to="https://www.instagram.com/tecnomobile.1?igsh=djA3dm05MzNnbjc0"
                target="_blank"
              >
                <AiFillInstagram />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
