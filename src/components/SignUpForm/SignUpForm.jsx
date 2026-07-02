import Inputs from "../Inputs/Inputs";
import { useForm } from "react-hook-form";

function SignUpForm({ register, error , getValues}) {
  return (
    <>
      <Inputs
        register={register}
        error={error}
        option={{
          required: "لطفا نام کاربری خود را وارد کنید",
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message:
              "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد.",
          },
          minLength: {
            value: 5,
            message: "نام کاربری باید حداقل 5 کاراکتر باشد",
          },
          maxLength: {
            value: 20,
            message: "نام کاربری نمی‌تواند بیشتر از 20 کاراکتر باشد",
          },
        }}
        name={"userName"}
        label={"نام کاربری"}
        placeholder={"نام کاربری خود را وارد کنید"}
        type="text"
      />
      <Inputs
        register={register}
        error={error}
        option={{
          required: "لطفا شماره موبایل خود را وارد کنید",
          pattern: {
            value: /^09\d{9}$/,
            message: "شماره موبایل معتبر نیست",
          },
        }}
        name={"phoneNumber"}
        label={"شماره موبایل"}
        placeholder={"شماره موبایل خود را وارد کنید"}
        type="text"
      />
      <Inputs
        register={register}
        error={error}
        option={{
          required: "لطفا رمز عبور خود را وارد کنید",
          minLength: {
            value: 1,
            message: "رمز عبور باید حداقل 8 کارکتر باشد",
          },
        }}
        name={"userPassword"}
        label={"رمز عبور"}
        placeholder={"رمز عبور خود را وارد کنید"}
        type="password"
      />
      <Inputs
        register={register}
        error={error}
        option={{
          required: "لطفا رمز عبور خود را تکرار کنید",
          validate: (value) =>
            value === getValues("userPassword") || "رمزهای عبور یکسان نیستند",
        }}
        name={"rePassword"}
        label={"تکرار رمز عبور"}
        placeholder={"رمز عبور خود را تکرار کنید"}
        type="password"
      />
    </>
  );
}

export default SignUpForm;
