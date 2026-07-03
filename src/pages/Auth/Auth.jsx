import styles from "./Auth.module.scss";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/img/logo.svg";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";
import OTP from "../../components/OTP/OTP";
import { useTimer } from "../../utils/Utils";
import { Link, useNavigate } from "react-router-dom";
import NumberForm from "../../components/NumberForm/NumberForm";
import { getOPT, login, postOTP, sendNumber } from "../../services/api";
import { Context } from "../../context/Provider";

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { time, restartTimer, startTimer, stopTimer } = useTimer(120);

  const [page, setPage] = useState("numberForm");

  const [phoneNumber, setPhoneNumber] = useState("");

  const { setIsLogin, setUserType } = useContext(Context);

  const navigate = useNavigate()
  const onsubmit = (data) => {
    switch (page) {
      case "numberForm":
        numberForm(data);
        break;
      case "OTP":
        sendOTP(data.OTP);
        break;
      default:
        break;
    }
  };

  const numberForm = async (data) => {
    const result = await sendNumber(data.phoneNumber);
    if (result?.success === true) {
      setPhoneNumber(data.phoneNumber);
      reset();
      setPage("OTP");
      await getOPT();
    } else {
      ServerErrorSwal();
    }
  };

  const reSendOTP = async () => {
    await getOPT();
  };

  const sendOTP = async (OTP) => {
    const result = await postOTP(OTP);
    if (result?.success === true) {
      const stutus = await login();
      if (stutus?.success === true) {
        {
          setIsLogin(true);
          setUserType(stutus.userType)
          navigate("/")
        }
      }
    } else {
      errorSwal("لطفا دوباره تلاش کنید", "کد وارد شده صحیح نمیباشد");
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
            reSendOTP();
          }}
        >
          ارسال مجدد کد
        </span>
      );
    }
  };

  useEffect(() => {
    if (page == "OTP") {
      startTimer();
    }
  }, [page]);

  let btnText;
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
