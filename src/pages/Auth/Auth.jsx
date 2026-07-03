import styles from "./Auth.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/img/logo.svg";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";
import OTP from "../../components/OTP/OTP";
import { useTimer } from "../../utils/Utils";
import { Link } from "react-router-dom";
import NumberForm from "../../components/NumberForm/NumberForm";

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { time, restartTimer, startTimer, stopTimer } = useTimer(10);

  const [page, setPage] = useState("numberForm");

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

  let btnText;

  useEffect(() => {
    if (page == "OTP") {
      startTimer();
    }
  }, [page]);

  switch (page) {
    case "numberForm":
      btnText = "ارسال کد تایید";
      break;
    case "OTP":
      btnText = "تایید کد";
      break;
    default:
      break;
  }

  return (
    <div className={styles.auth}>
      <img src={logo} alt="tecnomobile" className={styles.logo} />
      <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
        {page === "numberForm" && (
          <NumberForm register={register} error={errors} />
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
