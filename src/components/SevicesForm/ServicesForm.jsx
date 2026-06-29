import { successSwal } from "../../Swals/Swals";
import Inputs from "../Inputs/Inputs";
import Selects from "../Selects/Selects";
import Textareas from "../Textareas/Textareas";
import styles from "./ServicesForm.module.scss";
import { useForm } from "react-hook-form";

function ServicesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
    successSwal("منتظر بررسی متخصصان ما باشید", "پیام ارسال شد");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="form">
        <h3 className={styles.title}>رزرو نوبت خدمات</h3>
        <p className={styles.subTitle}>
          مشخصات و نوع خدمات درخواستی خود را وارد کنید تا کارشناسان ما در
          سریع‌ترین زمان با شما تماس بگیرند.
        </p>
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
                required: "لظفا شماره تماس خود را کنید",
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
                required: "لطفا دستگاه مورد نظز خود را انتخاب کنید",
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
        <input
          type="submit"
          value="ارسال مشخصات"
          className={`btnOutline ${styles.btn}`}
        />
      </form>
    </>
  );
}

export default ServicesForm;
