import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaTriangleExclamation } from "react-icons/fa6";
import styles from "./ResetPassword.module.scss";
import logo from "../../assets/img/logo.svg";
import { resetPassword, verifyResetToken } from "../../services/api";
import { errorSwal, successSwal } from "../../Swals/Swals";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordVal = watch("password");

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      setIsValid(false);
      setErrorMessage("توکن بازیابی رمز عبور در آدرس صفحه یافت نشد.");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await verifyResetToken(token);
        if (res?.success) {
          setIsValid(true);
          setTargetEmail(res.email || "");
        } else {
          setIsValid(false);
          setErrorMessage(res?.message || "لینک بازیابی نامعتبر یا منقضی شده است.");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        setIsValid(false);
        setErrorMessage("خطا در بررسی اعتبار لینک بازیابی.");
      } finally {
        setIsVerifying(false);
      }
    };

    checkToken();
  }, [token]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (res?.success) {
        successSwal("تغییر رمز عبور", res.message || "رمز عبور با موفقیت بروزرسانی شد.");
        navigate("/Auth");
      } else {
        errorSwal("خطا", res?.message || "مشکلی در تغییر رمز عبور پیش آمد.");
      }
    } catch (err) {
      console.error("Reset password submit error:", err);
      errorSwal("خطای سرور", "خطایی در برقراری ارتباط با سرور رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.resetPasswordPage}>
      <Link to="/">
        <img src={logo} alt="tecnomobile" className={styles.logo} />
      </Link>

      <div className={styles.card}>
        {isVerifying ? (
          <div className={styles.statusBox}>
            <div className={styles.errorMessage}>درحال بررسی اعتبار لینک...</div>
          </div>
        ) : !isValid ? (
          <div className={styles.statusBox}>
            <FaTriangleExclamation className={styles.errorIcon} />
            <div className={styles.errorTitle}>لینک نامعتبر یا منقضی شده</div>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <Link to="/Auth" className={styles.actionBtn}>
              درخواست مجدد لینک بازیابی
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>تعیین رمز عبور جدید</h1>
              <p className={styles.subtitle}>
                رمز عبور جدید خود را برای حساب <strong>{targetEmail}</strong> تعیین فرمایید.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
              <div className={styles.inputGroup}>
                <label className={styles.label}>رمز عبور جدید</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="حداقل ۶ کاراکتر"
                    className={styles.input}
                    {...register("password", {
                      required: "رمز عبور جدید الزامی است",
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
                <label className={styles.label}>تکرار رمز عبور جدید</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور را مجدداً وارد کنید"
                    className={styles.input}
                    {...register("confirmPassword", {
                      required: "تکرار رمز عبور الزامی است",
                      validate: (val) =>
                        val === passwordVal || "تکرار رمز عبور با رمز عبور جدید یکسان نیست",
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
                  <span className={styles.errorText}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? "درحال ذخیره‌سازی..." : "ذخیره رمز عبور جدید"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
