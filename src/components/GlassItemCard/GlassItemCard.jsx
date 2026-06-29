import { Link } from "react-router-dom";
import styles from "./GlassItemCard.module.scss";
import Tilt from "react-parallax-tilt";

function GlassItemCard(props) {

  const img = JSON.parse(props.img)[0]
  
  return (
    <>
      <Link to={`/Product/${props.id??1}`} className="w-100 d-flex justify-content-center">
        <Tilt
          className={styles.glassCard}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor={"#1499E6"}
          glarePosition={"all"}
          glareBorderRadius={"20px"}
          style={{ backgroundImage: `url("${img}")` }}
        >
          <div className={styles.text}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
          </div>
        </Tilt>
      </Link>
    </>
  );
}

export default GlassItemCard;
