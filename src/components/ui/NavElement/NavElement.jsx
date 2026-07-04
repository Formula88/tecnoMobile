import { Link } from "react-router-dom";
import styles from "./NavElement.module.scss";
import { BiSolidLeftArrow } from "react-icons/bi";

function NavElement(props) {
  return (
    <>
      <div className={styles.NavElement}>
        <h2>{props.title}</h2>
        <Link to={props.link}>
          <span>مشاهده همه</span>
          <BiSolidLeftArrow />
        </Link>
      </div>
    </>
  );
}

export default NavElement;
