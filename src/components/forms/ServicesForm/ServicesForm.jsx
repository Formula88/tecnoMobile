import { successSwal, errorSwal } from "../../../Swals/Swals";
import Inputs from "../../ui/Inputs/Inputs";
import Selects from "../../ui/Selects/Selects";
import Textareas from "../../ui/Textareas/Textareas";
import styles from "./ServicesForm.module.scss";
import { useForm } from "react-hook-form";
import { createRepairOrder } from "../../../services/api";

function ServicesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const result = await createRepairOrder(data);
    if (result?.success) {
      reset();
      successSwal("درخواست شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس می‌گیرند.", "رزرو موفق");
    } else {
      errorSwal(result?.message || "مشکلی در ثبت درخواست به وجود آمد", "خطا");
    }
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
