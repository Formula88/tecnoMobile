import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ForgotPasswordForm.module.scss";
import { forgotPassword } from "../../../services/api";
import { errorSwal, successSwal } from "../../../Swals/Swals";

function ForgotPasswordForm({ onBackToLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
      if (res?.success) {
        setIsSent(true);
        successSwal(
          "ایمیل ارسال شد",
          res.message || "لینک بازیابی رمز عبور به ایمیل شما ارسال شد."
        );
      } else {
        errorSwal("خطا", res?.message || "ارسال ایمیل با خطا مواجه شد.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      errorSwal("خطای سرور", "خطایی در برقراری ارتباط با سرور رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.forgotForm} noValidate>
      <div className={styles.infoBox}>
        <p>
          ایمیل ثبت‌شده در حساب کاربری خود را وارد کنید تا لینک یک‌بارمصرف و مدت‌دار (معتبر برای ۳۰ دقیقه) جهت تعیین رمز جدید برای شما ارسال شود.
        </p>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>آدرس ایمیل</label>
        <input
          type="email"
          placeholder="مثال: user@example.com"
          className={styles.input}
          disabled={isSent}
          {...register("email", {
            required: "لطفاً آدرس ایمیل خود را وارد کنید",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "فرمت ایمیل وارد شده معتبر نیست",
            },
          })}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || isSent}
        className={styles.submitBtn}
      >
        {isLoading
          ? "درحال ارسال ایمیل..."
          : isSent
          ? "لینک بازیابی ارسال شد"
          : "ارسال لینک بازیابی رمز"}
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className={styles.backBtn}
      >
        بازگشت به صفحه ورود
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
