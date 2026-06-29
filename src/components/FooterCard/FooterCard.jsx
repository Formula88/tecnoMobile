import { Link } from "react-router-dom";
import styles from "./FooterCard.module.scss";

function FooterCard(props) {
  return (
    <>
      <div className={styles.FooterCard}>
        <h4 className={styles.title}>{props.title}</h4>
        <ul>
          {props.item.map((item,index) => {
            return (
              <li key={index}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default FooterCard;
