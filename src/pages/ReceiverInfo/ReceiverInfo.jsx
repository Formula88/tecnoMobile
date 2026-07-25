import { Link } from "react-router-dom";
import Inputs from "../../components/ui/Inputs/Inputs";
import Toman from "../../icon/Toman";
import { formatPrice } from "../../utils/Utils";
import styles from "./ReceiverInfo.module.scss";
import { useForm } from "react-hook-form";

function ReceiverInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleReceiverInfo = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.receiverInfo}>
      <h1 className={styles.title}>مشخصات دریافت‌کننده</h1>
      <form onSubmit={handleSubmit(handleReceiverInfo)} className={styles.form}>
        <div className={styles.inputs}>
          <Inputs
            register={register}
            name={"name"}
            option={{
              required: "لطفا نام و نام‌خانوادگی خود را وارد کنید",
            }}
            label={"نام و نام‌خانوادگی گیرنده"}
            error={errors}
            placeholder={""}
          />
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
            label={"شماره تماس گیرنده"}
            error={errors}
            placeholder={""}
          />
          <Inputs
            register={register}
            name={"postalCode"}
            option={{
              required: "لطفا کد پستی خود را وارد کنید",
              pattern: {
                value: /^[1-9]\d{9}$/,
                message: "کد پستی وارد شده معتبر نمی باشد",
              },
            }}
            label={"کد پستی گیرنده"}
            error={errors}
            placeholder={""}
          />
          <Inputs
            register={register}
            name={"address"}
            option={{
              required: "لطفا آدرس خود را وارد کنید",
            }}
            label={"آدرس گیرنده"}
            error={errors}
            placeholder={""}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.item}>
            <span>روش ارسال : پست پیشتاز</span>
          </div>
          <div className={styles.item}>
            <div className={styles.pricePost}>
              <span>هزینه ارسال :</span>
              <div className={styles.price}>
                <span>{formatPrice(150000)}</span>
                <Toman />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.totalPrice}>
              <span>هزینه کل :</span>
              <div className={styles.price}>
                <span>{formatPrice(1250000)}</span>
                <Toman />
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="پرداخت"
          className={`btnPrimary ${styles.btn}`}
        />
        <Link to={"/ShoppingCart"} className={styles.back}>
          بازگشت به سبد خرید
        </Link>
      </form>
    </div>
  );
}

export default ReceiverInfo;
