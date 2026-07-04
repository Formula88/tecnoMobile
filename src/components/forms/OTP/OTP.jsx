import React from "react";
import styles from "./OTP.module.scss";
import { Controller } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toPersianDigits } from "../../utils/Utils";

function OTP({ control, error , number}) {
  return (
    <div className={styles.box}>
        <h3 className={styles.title}>
            کد تایید به شماره {toPersianDigits(number)} ارسال شد
        </h3>
      <Controller
        name="OTP"
        control={control}
        defaultValue={""}
        rules={{
          required: "کد تایید را وارد کنید",
          minLength: {
            value: 5,
            message: "کد تایید را وارد کنید",
          },
        }}
        render={({ field }) => {
          return (
            <OTPInput
              value={field.value}
              onChange={field.onChange}
              numInputs={5}
              inputType="tel"
              shouldAutoFocus
              containerStyle={styles.inputsBox}
              inputStyle={styles.input}
              renderInput={(props) => <input {...props} />}
            />
          );
        }}
      />
      <span className={styles.error}>{error?.["OTP"]?.message}</span>
    </div>
  );
}

export default OTP;
