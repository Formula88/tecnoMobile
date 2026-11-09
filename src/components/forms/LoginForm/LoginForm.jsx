import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from "./LoginForm.module.scss";
import { Context } from "../../../context/AppContext";
import { loginUser } from "../../../services/api";
import { errorSwal, successSwal } from "../../../Swals/Swals";
import GoogleAuthBtn from "../GoogleAuthBtn/GoogleAuthBtn";

function LoginForm({ onSwitchToRegister, onSwitchToForgot }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserSession } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginUser({
        identifier: data.identifier,
        password: data.password,
      });

      if (res?.success && res.user) {
        loginUserSession(res.user);
        successSwal("خوش آمدید", res.message || "ورود شما با موفقیت انجام شد.");
        navigate("/");
      } else {
        errorSwal("خطا در ورود", res?.message || "نام کاربری/ایمیل یا رمز عبور اشتباه است.");
      }
    } catch (err) {
      console.error("Login error:", err);
      errorSwal("خطای سرور", "خطایی در برقراری ارتباط با سرور رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} noValidate>
      <div className={styles.inputGroup}>
        <label className={styles.label}>نام کاربری یا ایمیل</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="مثال: user123 یا info@example.com"
            className={styles.input}
            {...register("identifier", {
              required: "لطفاً نام کاربری یا ایمیل خود را وارد کنید",
            })}
          />
        </div>
        {errors.identifier && (
          <span className={styles.errorText}>{errors.identifier.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>رمز عبور</label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور خود را وارد کنید"
            className={styles.input}
            {...register("password", {
              required: "لطفاً رمز عبور خود را وارد کنید",
            })}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="نمایش یا پنهان‌سازی رمز"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorText}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.forgotLinkWrapper}>
        <button
          type="button"
          onClick={onSwitchToForgot}
          className={styles.forgotLink}
        >
          رمز عبور خود را فراموش کرده‌اید؟
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={styles.submitBtn}
      >
        {isLoading ? "درحال بررسی..." : "ورود به حساب کاربری"}
      </button>

      <div className={styles.divider}>
        <span>یا ورود از طریق حساب گوگل</span>
      </div>

      <GoogleAuthBtn text="ورود با حساب گوگل" />

      <div className={styles.switchText}>
        <span>حساب کاربری ندارید؟</span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className={styles.switchBtn}
        >
          ثبت‌نام کنید
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
