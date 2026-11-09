import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from "./RegisterForm.module.scss";
import { Context } from "../../../context/AppContext";
import { registerUser } from "../../../services/api";
import { errorSwal, successSwal } from "../../../Swals/Swals";
import GoogleAuthBtn from "../GoogleAuthBtn/GoogleAuthBtn";

function RegisterForm({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserSession } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordVal = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber || "",
      });

      if (res?.success && res.user) {
        loginUserSession(res.user);
        successSwal("ثبت‌نام موفق", res.message || "حساب کاربری شما با موفقیت ایجاد شد.");
        navigate("/");
      } else {
        errorSwal("خطا در ثبت‌نام", res?.message || "مشکلی در ایجاد حساب رخ داد.");
      }
    } catch (err) {
      console.error("Register error:", err);
      errorSwal("خطای سرور", "خطایی در برقراری ارتباط با سرور رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm} noValidate>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          نام کاربری <span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="حداقل ۳ کاراکتر انگلیسی (مثال: ali_reza)"
            className={styles.input}
            {...register("username", {
              required: "نام کاربری الزامی است",
              minLength: {
                value: 3,
                message: "نام کاربری باید حداقل ۳ کاراکتر باشد",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.-]+$/,
                message: "نام کاربری فقط می‌تواند شامل حروف، اعداد، زیرخط و خط تیره باشد",
              },
            })}
          />
        </div>
        {errors.username && (
          <span className={styles.errorText}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          ایمیل <span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="مثال: example@gmail.com"
            className={styles.input}
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "فرمت ایمیل نامعتبر است",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className={styles.errorText}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          شماره موبایل <span className={styles.optional}>(اختیاری جهت پیگیری سفارشات)</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type="tel"
            placeholder="مثال: 09123456789"
            className={styles.input}
            {...register("phoneNumber", {
              pattern: {
                value: /^09[0-9]{9}$/,
                message: "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد",
              },
            })}
          />
        </div>
        {errors.phoneNumber && (
          <span className={styles.errorText}>{errors.phoneNumber.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          رمز عبور <span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="حداقل ۶ کاراکتر"
            className={styles.input}
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
              },
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

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          تکرار رمز عبور <span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="رمز عبور را مجدداً وارد کنید"
            className={styles.input}
            {...register("confirmPassword", {
              required: "تکرار رمز عبور الزامی است",
              validate: (val) =>
                val === passwordVal || "تکرار رمز عبور با رمز عبور اصلی مطابقت ندارد",
            })}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label="نمایش یا پنهان‌سازی تکرار رمز"
          >
            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={styles.errorText}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={styles.submitBtn}
      >
        {isLoading ? "درحال ثبت اطلاعات..." : "ایجاد حساب کاربری"}
      </button>

      <div className={styles.divider}>
        <span>یا ثبت‌نام سریع با حساب گوگل</span>
      </div>

      <GoogleAuthBtn text="ثبت‌نام سریع با حساب گوگل" />

      <div className={styles.switchText}>
        <span>قبلاً حساب کاربری داشته‌اید؟</span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className={styles.switchBtn}
        >
          وارد شوید
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
