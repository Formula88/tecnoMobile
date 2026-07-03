import styles from "./Auth.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/img/logo.svg";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";
import OTP from "../../components/OTP/OTP";
import { useTimer } from "../../utils/Utils";
import { Link } from "react-router-dom";

function Auth() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    resetField,
    control,
  } = useForm();

  const { time, restartTimer, startTimer, stopTimer } = useTimer(10);

  const [page, setPage] = useState("OTP");

  const [phoneNumber, setPhoneNumber] = useState("");

  const onsubmit = (data) => {
    switch (page) {
      case "OTP":
        console.log(data);
        break;
      default:
        break;
    }
  };

  const timers = (time) => {
    if (time > 0) {
      return (
        <span className={styles.timer}>{time} ثانیه تا ارسال مجدد کد</span>
      );
    } else {
      return (
        <span
          className={`btn btn-link ${styles.restartTimer}`}
          onClick={() => {
            restartTimer();
          }}
        >
          ارسال مجدد کد
        </span>
      );
    }
  };

  let btnText, labelLink, linkText, funLink;

  useEffect(() => {
    if (page == "OTP") {
      startTimer();
    }
  }, [page]);

  switch (page) {
    case "OTP":
      btnText = "تایید کد";
    default:
      break;
  }

  return (
    <div className={styles.auth}>
      <img src={logo} alt="tecnomobile" className={styles.logo} />
      <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
        {page === "OTP" && (
          <OTP control={control} error={errors} number={phoneNumber} />
        )}
        <input
          type="submit"
          value={btnText}
          className={`btnPrimary ${styles.btn}`}
        />
        <div className={styles.box}>
          <div className={styles.right}>{page === "OTP" && timers(time)}</div>
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
