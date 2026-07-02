import styles from "./Auth.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [page, setPage] = useState("login");

  const pageToSignUp = () => {
    setPage("signUp");
  };
  const pageToLogin = () => {
    setPage("login");
  };

  const onsubmit = (data) => {
    console.log(data);
  };

  let btnText, labelLink, linkText, funLink;

  switch (page) {
    case "login":
      btnText = "ورود";
      labelLink = "آیا حساب کاربری ندارید؟";
      linkText = "ساخت حساب";
      funLink = pageToSignUp;
      break;

    case "signUp":
      btnText = "ثبت نام";
      labelLink = "آیا حساب کاربری دارید؟";
      linkText = "ورود به حساب";
      funLink = pageToLogin;
      break;

    default:
      break;
  }

  return (
    <div className={styles.auth}>
      <img src={logo} alt="tecnomobile" className={styles.logo} />
      <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
        {page === "login" && <LoginForm register={register} error={errors} />}
        <input
          type="submit"
          value={btnText}
          className={`btnPrimary ${styles.btn}`}
        />
        <div className={styles.box}>
          <div className={styles.right}>
            <span className={styles.label}>{labelLink}</span>
            <span className={`btn btn-link ${styles.link}`} onClick={funLink}>
              {linkText}
            </span>
          </div>
          <div className={styles.left}>
            <Link to="/" className="btn btn-link">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
