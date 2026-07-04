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
                title="لینک های مفید"
                item={[
                  { title: "درباره ما", link: "#" },
                  { title: "تماس با ما", link: "#" },
                  { title: "قوانین و مقررات", link: "#" },
                  { title: "سوالات متداول", link: "#" },
                ]}
              />
            </div>
            <div className={`col-lg-3 col-sm-6 col-12$ ${styles.card}`}>
              <FooterCard
                title="لینک های مفید"
                item={[
                  { title: "درباره ما", link: "#" },
                  { title: "تماس با ما", link: "#" },
                  { title: "قوانین و مقررات", link: "#" },
                  { title: "سوالات متداول", link: "#" },
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
              <Link to="#">
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
