import styles from "./Auth.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { signUpDB } from "../../services/api";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";

function Auth() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    resetField,
  } = useForm();

  const [page, setPage] = useState("login");

  const pageToSignUp = () => {
    setPage("signUp");
  };
  const pageToLogin = () => {
    setPage("login");
  };

  const onsubmit = (data) => {
    switch (page) {
      case "login":
        break;

      case "signUp":
        signUp(data);
        break;

      default:
        break;
    }
  };

  const signUp = async (data) => {
    const result = await signUpDB(data);
    if (result?.success === true) {
      switch (result.action) {
        case "phoneNumber":
          errorSwal("شماره‌ی دیگری وارد کنید", "شماره از قبل وارد شده");
          resetField("phoneNumber");
          break;

        case "userName":
          errorSwal("نام کاربری دیگری امتحان کنید","نام کاربری از قبل انتخاب شده است")
          resetField("userName")
          break;
          
        default:
          break;
      }
    } else {
      ServerErrorSwal();
    }
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
        {page === "signUp" && (
          <SignUpForm
            register={register}
            error={errors}
            getValues={getValues}
          />
        )}
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
