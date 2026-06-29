import styles from "./HeaderNav.module.scss";
import pic from "../../assets/img/logo.svg";
import Checkbox from "../Hamburger/Hamburger";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

function HeaderNav() {
  const Links = {
    home: "/",
    Vpn: "/VPN",
    services: "/Services",
    auth: "/Auth"
  };

  let scrollbarRef = useRef(null);

  const hamburgerMenuBox = useRef(null);
  const openHamburgerMenu = (input) => {
    hamburgerMenuBox.current.classList.toggle(styles.open);
    if (input.target.checked) {
      scrollbarRef.current?.options({
        overflow: {
          x: "hidden",
          y: "hidden",
        },
      });
    } else {
      scrollbarRef.current?.options({
        overflow: {
          x: "scroll",
          y: "scroll",
        },
      });
    }
  };

  useEffect(() => {
    scrollbarRef.current = OverlayScrollbars(document.body, {
      scrollbars: {
        autoHide: "move",
        autoHideDelay: 100,
      },
    });

    return () => {
      scrollbarRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <header className={styles.headerNav}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col d-md-none d-flex align-items-center">
              <Checkbox fun={openHamburgerMenu} />
            </div>
            <div className="col d-md-block d-flex justify-content-end align-items-center">
              <img
                src={pic}
                alt="tecno Mobile"
                className={`noDrag ${styles.logo}`}
              />
            </div>
            <div className={`col-5 ${styles.colM}`}>
              <ul className={styles.menu}>
                <li>
                  <Link to={Links.home}>خانه</Link>
                </li>
                <li>
                  <Link to={Links.Vpn}>VPN</Link>
                </li>
                <li>
                  <Link to={Links.services}>خدمات</Link>
                </li>
                <li>
                  <Link to="">محصولات</Link>
                </li>
                <li>
                  <Link to="">درباره‌ما</Link>
                </li>
              </ul>
            </div>
            <div className="col d-md-flex justify-content-end align-items-center gap-2 d-none">
              <Link to={Links.auth}>
                <FaUser className={styles.icon} />
              </Link>
              <Link to="">
                <FaCartShopping className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`d-md-none d-block ${styles.hamburgerBox}`}
        id="hamburgerBox"
        ref={hamburgerMenuBox}
      >
        <img src={pic} alt="" />
        <ul className={styles.menu}>
          <li>
            <Link to={Links.home}>خانه</Link>
          </li>
          <li>
            <Link to={Links.Vpn}>VPN</Link>
          </li>
          <li>
            <Link to={Links.services}>خدمات</Link>
          </li>
          <li>
            <Link to="">محصولات</Link>
          </li>
          <li>
            <Link to="">درباره ما</Link>
          </li>
        </ul>
        <div className={styles.icon}>
          <Link to="">
            <FaUser className={styles.icon} />
          </Link>
          <Link to="">
            <FaCartShopping className={styles.icon} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderNav;
