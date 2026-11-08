import { Link, useNavigate } from "react-router-dom";
import Inputs from "../../components/ui/Inputs/Inputs";
import Toman from "../../icon/Toman";
import { formatPrice } from "../../utils/Utils";
import styles from "./ReceiverInfo.module.scss";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../context/AppContext";
import { createOrder } from "../../services/api";
import { errorSwal, successSwal } from "../../Swals/Swals";

function ReceiverInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { cardItem, totalPriceProduct, clearCart } = useContext(Context);

  const shippingCost = 150000;
  const grandTotal = totalPriceProduct + shippingCost;

  const handleReceiverInfo = async (data) => {
    if (!cardItem || cardItem.length === 0) {
      errorSwal("سبد خرید شما خالی است", "خطا");
      navigate("/ShoppingCart");
      return;
    }

    const orderPayload = {
      fullName: data.name,
      phone: data.number,
      codePost: data.postalCode,
      address: data.address,
      items: cardItem,
      totalPrice: grandTotal,
    };

    const result = await createOrder(orderPayload);
    if (result?.success) {
      clearCart();
      await successSwal("سفارش شما با موفقیت ثبت شد", "ثبت سفارش موفق");
      navigate("/Orders");
    } else {
      errorSwal(result?.message || "مشکلی در ثبت سفارش پیش آمد", "خطا در ثبت سفارش");
    }
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
              required: "لطفا شماره تماس خود را وارد کنید",
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
                <span>{formatPrice(shippingCost)}</span>
                <Toman />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.totalPrice}>
              <span>هزینه کل :</span>
              <div className={styles.price}>
                <span>{formatPrice(grandTotal)}</span>
                <Toman />
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="پرداخت و ثبت نهایی"
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
