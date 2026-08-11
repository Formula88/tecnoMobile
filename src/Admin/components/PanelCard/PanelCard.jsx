import styles from "./PanelCard.module.scss";

function PanelCard({ title, text }) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>
        {title}
        {" : "}
        {text}
      </span>
    </div>
  );
}

export default PanelCard;
