import styles from "./HeaderNav.module.scss";
import pic from "../../../assets/img/logo.svg";
import Checkbox from "../Hamburger/Hamburger";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../../../context/AppContext";
import { toPersianDigits } from "../../../utils/Utils";

function HeaderNav() {
  const { isLogin, setScrollEnabled, productCount } = useContext(Context);

  const Links = {
    home: "/",
    Vpn: "/VPN",
    services: "/Services",
    products: "/products",
    AboutUs: "/AboutUs",
    profile: "/profile",
    shoppingCart: "/ShoppingCart",
  };

  const hamburgerMenuBox = useRef(null);
  const openHamburgerMenu = (input) => {
    hamburgerMenuBox.current.classList.toggle(styles.open);
    if (input.target.checked) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  };
  const closeMenu = () => {
    hamburgerMenuBox.current.classList.remove(styles.open);
    setScrollEnabled(true);
  };

  return (
    <>
      <header className={styles.headerNav}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col d-md-none d-flex align-items-center">
              <Checkbox fun={openHamburgerMenu} />
            </div>
            <div className="col d-flex justify-content-start align-items-center">
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
                  <Link to={Links.products}>محصولات</Link>
                </li>
                <li>
                  <Link to={Links.Vpn}>VPN</Link>
                </li>
                <li>
                  <Link to={Links.services}>خدمات</Link>
                </li>
                <li>
                  <Link to={Links.AboutUs}>درباره‌ما</Link>
                </li>
              </ul>
            </div>
            <div className="col d-md-flex justify-content-end align-items-center gap-2 d-none">
              <Link to={Links.profile}>
                <FaUser className={styles.icon} />
              </Link>
              <Link
                to={Links.shoppingCart}
                className="position-relative"
              >
                <FaCartShopping className={styles.icon} />
                {productCount > 0 && (
                  <span className={styles.productCount}>
                    {toPersianDigits(productCount)}
                  </span>
                )}
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
            <Link to={Links.home} onClick={closeMenu}>
              خانه
            </Link>
          </li>
          <li>
            <Link to={Links.products} onClick={closeMenu}>
              محصولات
            </Link>
          </li>
          <li>
            <Link to={Links.Vpn} onClick={closeMenu}>
              VPN
            </Link>
          </li>
          <li>
            <Link to={Links.services} onClick={closeMenu}>
              خدمات
            </Link>
          </li>
          <li>
            <Link to={Links.AboutUs} onClick={closeMenu}>
              درباره ما
            </Link>
          </li>
        </ul>
        <div className={styles.icons}>
          <Link to={Links.profile}>
            <FaUser className={styles.icon} />
          </Link>
          <Link
            to={Links.shoppingCart}
            onClick={closeMenu}
            className="position-relative"
          >
            <FaCartShopping className={styles.icon} />
            {productCount > 0 && (
              <span className={styles.productCount}>
                {toPersianDigits(productCount)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderNav;
