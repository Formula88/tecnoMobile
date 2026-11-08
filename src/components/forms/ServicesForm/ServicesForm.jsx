import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ServicesForm.module.scss";
import Inputs from "../../ui/Inputs/Inputs";
import Selects from "../../ui/Selects/Selects";
import Textareas from "../../ui/Textareas/Textareas";
import { Context } from "../../../context/AppContext";
import { createRepairOrder, getUserRepairOrders } from "../../../services/api";
import { successSwal, errorSwal } from "../../../Swals/Swals";
import { FaLock, FaClock, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

function ServicesForm() {
  const { isLogin, isAuthChecking, userNumber } = useContext(Context);
  const navigate = useNavigate();

  const [pendingReservation, setPendingReservation] = useState(null);
  const [checkingPending, setCheckingPending] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      number: userNumber || "",
    },
  });

  // Pre-fill user number if available
  useEffect(() => {
    if (userNumber) {
      reset((prev) => ({ ...prev, number: userNumber }));
    }
  }, [userNumber, reset]);

  // Check if current logged-in user already has a reservation under review
  useEffect(() => {
    if (isLogin) {
      setCheckingPending(true);
      getUserRepairOrders().then((result) => {
        if (result?.success && Array.isArray(result.data)) {
          const underReview = result.data.find(
            (item) => item.status === "under_review" || !item.status,
          );
          setPendingReservation(underReview || null);
        }
        setCheckingPending(false);
      });
    } else {
      setPendingReservation(null);
      setCheckingPending(false);
    }
  }, [isLogin]);

  const onSubmit = async (data) => {
    // 1. Enforce login check
    if (!isLogin) {
      errorSwal(
        "برای ثبت رزرو خدمات، ابتدا باید وارد حساب کاربری خود شوید.",
        "ورود الزامی است",
      );
      navigate("/Auth");
      return;
    }

    // 2. Enforce pending check
    if (pendingReservation) {
      errorSwal(
        "شما در حال حاضر یک درخواست رزرو نوبت درحال بررسی دارید. تا زمانی که درخواست قبلی بررسی نشود، امکان ثبت رزرو جدید وجود ندارد.",
        "درخواست درحال بررسی",
      );
      return;
    }

    setSubmitting(true);
    const result = await createRepairOrder(data);
    setSubmitting(false);

    if (result?.success) {
      reset();
      successSwal(
        "درخواست رزرو خدمات با موفقیت ثبت شد و درحال بررسی توسط کارشناسان است.",
        "رزرو موفق",
      );
      // Immediately lock form to prevent duplicate submission
      setPendingReservation({
        deviceType: data.deviceType,
        serviceType: data.serviceType,
        status: "under_review",
      });
    } else {
      if (result?.hasUnderReview) {
        setPendingReservation({ status: "under_review" });
      }
      errorSwal(result?.message || "مشکلی در ثبت درخواست به وجود آمد", "خطا");
    }
  };

  const isFormBlocked = !isLogin || Boolean(pendingReservation);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="form">
        <h3 className={styles.title}>رزرو نوبت خدمات</h3>
        <p className={styles.subTitle}>
          مشخصات و نوع خدمات درخواستی خود را وارد کنید تا کارشناسان ما در
          سریع‌ترین زمان با شما تماس بگیرند.
        </p>

        {/* Notice 1: User is NOT logged in */}
        {!isAuthChecking && !isLogin && (
          <div className={`${styles.noticeBox} ${styles.loginNotice}`}>
            <div className="d-flex align-items-center gap-2 fw-bold text-info">
              <FaLock />
              <span>برای ثبت رزرو خدمات، ورود به حساب کاربری الزامی است</span>
            </div>
            <div className="small opacity-90">
              برای پیگیری وضعیت درخواست تعمیر و ارتباط با کارشناسان، لطفاً ابتدا وارد حساب خود شوید.
            </div>
            <div className="mt-2">
              <Link
                to="/Auth"
                className="btn btn-sm btn-primary d-inline-flex align-items-center gap-2 px-3"
              >
                <span>ورود به حساب کاربری</span>
                <FaArrowLeft size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* Notice 2: User has a reservation under review */}
        {isLogin && pendingReservation && (
          <div className={`${styles.noticeBox} ${styles.pendingNotice}`}>
            <div className="d-flex align-items-center gap-2 fw-bold text-warning">
              <FaClock />
              <span>درخواست رزرو قبلی شما درحال بررسی است</span>
            </div>
            <div className="small opacity-90">
              شما یک درخواست رزرو نوبت درحال بررسی
              {pendingReservation.deviceType ? ` برای «${pendingReservation.deviceType}»` : ""} ثبت کرده‌اید.
              تا تعیین وضعیت و بررسی این درخواست توسط پشتیبانی، امکان ثبت رزرو جدید وجود ندارد.
            </div>
            <div className="mt-2">
              <Link
                to="/Repairorders"
                className="btn btn-sm btn-outline-warning d-inline-flex align-items-center gap-2 px-3"
              >
                <span>مشاهده وضعیت نوبت‌های من</span>
                <FaArrowLeft size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* Notice 3: Checking status indicator */}
        {checkingPending && (
          <div className="text-secondary small mb-3 text-center">
            درحال استعلام وضعیت رزروهای قبلی...
          </div>
        )}

        <fieldset disabled={isFormBlocked || submitting} style={{ border: "none", padding: 0 }}>
          <div className="row row-cols-sm-2 row-cols-1">
            <div className="col">
              <Inputs
                register={register}
                name={"name"}
                option={{
                  required: "لطفا نام و نام‌خانوادگی خود را وارد کنید",
                }}
                label={"نام و نام‌خانوادگی"}
                error={errors}
                placeholder={"مثلا امیر محمدی"}
              />
            </div>
            <div className="col">
              <Inputs
                register={register}
                name={"number"}
                option={{
                  required: "لطفا شماره تماس خود را وارد کنید",
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "شماره موبایل معتبر نیست",
                  },
                }}
                label={"شماره تماس"}
                error={errors}
                placeholder={"09123456789"}
              />
            </div>
          </div>
          <div className="row row-cols-sm-2 row-cols-1">
            <div className="col">
              <Selects
                register={register}
                name={"deviceType"}
                option={{
                  required: "لطفا دستگاه مورد نظر خود را انتخاب کنید",
                }}
                label={"دستگاه مورد نظر"}
                error={errors}
                items={["گوشی هوشمند", "تبلت", "لپتاپ"]}
              />
            </div>
            <div className="col">
              <Selects
                register={register}
                name={"serviceType"}
                option={{
                  required: "لطفا نوع سرویس را انتخاب کنید",
                }}
                label={"نوع سرویس"}
                error={errors}
                items={["تعمیرات سخت‌افزار", "خدمات نرم‌افزار", "مشاوره فنی"]}
              />
            </div>
          </div>
          <Textareas
            register={register}
            name={"description"}
            option={{}}
            label={"توضیحات مشکل (اختیاری)"}
            error={errors}
            placeholder={"شرح مختصری از مشکل دستگاه..."}
          />
        </fieldset>

        <div className="mt-2">
          {!isLogin ? (
            <button
              type="button"
              onClick={() => navigate("/Auth")}
              className={`btnOutline ${styles.btn} w-100 text-center`}
              style={{ border: "1px solid #3b82f6", color: "#60a5fa" }}
            >
              <FaLock className="ms-2" />
              ورود به حساب کاربری جهت ثبت نوبت
            </button>
          ) : pendingReservation ? (
            <button
              type="button"
              disabled
              className={`btnOutline ${styles.btn} w-100 text-center`}
              title="تا پایان بررسی درخواست قبلی امکان ثبت نوبت جدید وجود ندارد"
            >
              <FaExclamationTriangle className="ms-2 text-warning" />
              درخواست قبلی درحال بررسی است
            </button>
          ) : (
            <input
              type="submit"
              disabled={submitting || checkingPending}
              value={submitting ? "درحال ارسال..." : "ارسال مشخصات و ثبت نوبت"}
              className={`btnOutline ${styles.btn} w-100`}
            />
          )}
        </div>
      </form>
    </>
  );
}

export default ServicesForm;
