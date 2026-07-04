import styles from "./WhyUsCard.module.scss";


function WhyUsCard(props) {

    const Icon = props.icon

  return (
    <>
      <div className={styles.WhyUsCard}>
        <Icon />
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </>
  );
}

export default WhyUsCard;
