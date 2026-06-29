import Inputs from "../Inputs/Inputs";
import styles from "./LoginForm.module.scss";

function LoginForm({ register, error }) {
  return (
    <>
      <Inputs register={register} error={error} option={{}} name={"userName"} label={"نام کاربری"} placeholder={""} type="password"/>
      <Inputs register={register} error={error} option={{}} name={"userName"} label={"نام کاربری"} placeholder={""} type="password"/>
      <div className={styles.box}>
        <div className={styles.right}>
          
        </div>
        <div className={styles.left}></div>
      </div>
    </>
  );
}

export default LoginForm;
