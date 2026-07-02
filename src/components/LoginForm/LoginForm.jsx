import Inputs from "../Inputs/Inputs";
import styles from "./LoginForm.module.scss";

function LoginForm({ register, error }) {
  return (
    <>
      <Inputs register={register} error={error} option={{required: "لطفا نام کاربری خود را وارد کنید"}} name={"userName"} label={"نام کاربری"} placeholder={"نام کاربری خود را وارد کنید"} type="text"/>
      <Inputs register={register} error={error} option={{required: "لطفا رمز عبور خود را وارد کنید"}} name={"userPassword"} label={"رمز عبور"} placeholder={"رمز عبور خود را وارد کنید"} type="password"/>
      
    </>
  );
}

export default LoginForm;
