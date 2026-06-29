import styles from "./Details.module.scss"

function Details({details}) {
  return (
    <div className={styles.details}>
        <h3 className={styles.title}>توضیحات :</h3>
        <p className={styles.text}>
            {details}
        </p>
    </div>
  )
}

export default Details