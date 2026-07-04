import styles from "./Auth.module.scss";
import logo from "../../assets/img/logo.svg";
import OTPForm from "../../components/forms/OTPForm/OTPForm";
import TimerOtp from "../../components/sections/TimerOtp/TimerOtp";
import NumberForm from "../../components/forms/NumberForm/NumberForm";
import { useTimer } from "../../hooks/hooks";
import { Context } from "../../context/Provider";
import { getOPT, login, postOTP, sendNumber } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { errorSwal, ServerErrorSwal } from "../../Swals/Swals";
import { Link, useNavigate } from "react-router-dom";

const authPage = {
  NUMBER: "number",
  OTP: "otp",
};

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { time, restartTimer, startTimer, stopTimer } = useTimer(120);

  const [phoneNumber, setPhoneNumber] = useState("");

  const { setIsLogin, setUserType } = useContext(Context);

  const [page, setPage] = useState(authPage.NUMBER);
  const isOTPPage = page === authPage.OTP;

  const handleFormSubmit = (data) => {
    if (isOTPPage) {
      handleOTPSubmit(data.OTP);
    } else {
      handleNumberSubmit(data);
    }
  };

  const handleNumberSubmit = async (data) => {
    const result = await sendNumber(data.phoneNumber);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }
    setPhoneNumber(data.phoneNumber);
    reset();
    setPage(authPage.OTP);
    await getOPT();
  };

  const handleResendOTP = async () => {
    await getOPT();
  };

  const handleOTPSubmit = async (OTP) => {
    const result = await postOTP(OTP);
    if (!result?.success) {
      errorSwal("لطفا دوباره تلاش کنید", "کد وارد شده صحیح نمیباشد");
      return;
    }
    const status = await login();
    if (status?.success === true) {
      setIsLogin(true);
      setUserType(status.userType);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!isOTPPage) return;

    startTimer();

    return () => stopTimer();
  }, [isOTPPage]);

  const btnText = isOTPPage ? "تایید کد" : "ارسال کد تایید";

  return (
    <div className={styles.auth}>
      <img src={logo} alt="tecnomobile" className={styles.logo} />
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        {page === authPage.NUMBER && (
          <NumberForm register={register} error={errors} />
        )}
        {page === authPage.OTP && (
          <OTPForm control={control} error={errors} number={phoneNumber} />
        )}
        <input
          type="submit"
          value={btnText}
          className={`btnPrimary ${styles.btn}`}
        />
        <div className={styles.box}>
          <div className={styles.right}>
            {isOTPPage && (
              <TimerOtp
                time={time}
                restartTimer={restartTimer}
                reSendOTP={handleResendOTP}
              />
            )}
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
