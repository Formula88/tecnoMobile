import styles from "./Auth.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { signUpDB } from "../../services/api";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";
import OTP from "../../components/OTP/OTP";
import { Timer } from "../../utils/Utils";

function Auth() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    resetField,
    control,
  } = useForm();

  const [page, setPage] = useState("OTP");
  const [phoneNumber, setPhoneNumber] = useState("09129072416");
  const [time, setTime] = useState(10);
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
        setPhoneNumber(data.phoneNumber);
        break;

      case "OTP":
        console.log(data);

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
          errorSwal(
            "نام کاربری دیگری امتحان کنید",
            "نام کاربری از قبل انتخاب شده است",
          );
          resetField("userName");
          break;

        case "OTP":
          setPage("OTP");
          break;

        default:
          break;
      }
    } else {
      ServerErrorSwal();
    }
  };

  const timers = (time) => {
    if (time > 0) {
      return (
        <span className={styles.timer}>{time} ثانیه تا ارسال مجدد کد</span>
      );
    } else {
      return (
        <span className="btn btn-link" onClick={reTimer}>
          ارسال مجدد کد
        </span>
      );
    }
  };

  const reTimer = () => {
    setTime(10);
    Timer(time, setTime);
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
      btnText = "دریافت کد تایید";
      labelLink = "آیا حساب کاربری دارید؟";
      linkText = "ورود به حساب";
      funLink = pageToLogin;
      break;

    case "OTP":
      btnText = "تایید کد";
      Timer(time, setTime);
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
        {page === "OTP" && (
          <OTP control={control} error={errors} number={phoneNumber} />
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
            {page === "OTP" && timers(time)}
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
