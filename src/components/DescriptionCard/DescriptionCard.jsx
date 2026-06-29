import { Link } from "react-router-dom";
import styles from "./DescriptionCard.module.scss";

function DescriptionCard(props) {
  const Icon = props.icon;

  return (
    <>
      <div className={styles.DescriptionCard}>
        <div className={styles.icon}>
          <Icon />
        </div>
        <div className={styles.text}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="row row-cols-sm-2 row-cols-1">
          <div className="col">
            <div className={styles.card}>
              <h4>{props.cardTitle1}</h4>
              <span>{props.cardDes1}</span>
            </div>
          </div>
          <div className="col">
            <div className={styles.card}>
              <h4>{props.cardTitle2}</h4>
              <span>{props.cardDes2}</span>
            </div>
          </div>
        </div>
        <Link to={props.btnLink} className="btnOutline">
          {props.btnText}
        </Link>
      </div>
    </>
  );
}

export default DescriptionCard;
