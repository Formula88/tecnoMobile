import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Auth.module.scss";
import logo from "../../assets/img/logo.svg";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm/ForgotPasswordForm";

const MODES = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT: "forgot",
};

function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(MODES.LOGIN);

  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "register") {
      setMode(MODES.REGISTER);
    } else if (qMode === "forgot") {
      setMode(MODES.FORGOT);
    } else {
      setMode(MODES.LOGIN);
    }
  }, [searchParams]);

  const handleTabChange = (newMode) => {
    setMode(newMode);
    setSearchParams(newMode === MODES.LOGIN ? {} : { mode: newMode });
  };

  return (
    <div className={styles.auth}>
      <Link to="/" className={styles.logoWrapper}>
        <img src={logo} alt="tecnomobile" className={styles.logo} />
      </Link>

      <div className={styles.card}>
        {mode !== MODES.FORGOT ? (
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                mode === MODES.LOGIN ? styles.active : ""
              }`}
              onClick={() => handleTabChange(MODES.LOGIN)}
            >
              ورود به حساب
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                mode === MODES.REGISTER ? styles.active : ""
              }`}
              onClick={() => handleTabChange(MODES.REGISTER)}
            >
              ثبت‌نام جدید
            </button>
          </div>
        ) : (
          <div className={styles.forgotHeader}>
            <h2 className={styles.forgotTitle}>بازیابی رمز عبور</h2>
          </div>
        )}

        {mode === MODES.LOGIN && (
          <LoginForm
            onSwitchToRegister={() => handleTabChange(MODES.REGISTER)}
            onSwitchToForgot={() => handleTabChange(MODES.FORGOT)}
          />
        )}

        {mode === MODES.REGISTER && (
          <RegisterForm
            onSwitchToLogin={() => handleTabChange(MODES.LOGIN)}
          />
        )}

        {mode === MODES.FORGOT && (
          <ForgotPasswordForm
            onBackToLogin={() => handleTabChange(MODES.LOGIN)}
          />
        )}
      </div>

      <div className={styles.bottomBack}>
        <Link to="/" className={styles.backLink}>
          ← بازگشت به صفحه اصلی سایت
        </Link>
      </div>
    </div>
  );
}

export default Auth;
