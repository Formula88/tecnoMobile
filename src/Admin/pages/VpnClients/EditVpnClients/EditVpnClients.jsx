import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";

function EditVpnClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const handleFormSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const data = ({
      name: "V2RayN",
      protocol: "VLESS/VMESS",
      downloadUrl:
        "https://github.com/2dust/v2rayNG/releases/download/2.2.6/v2rayNG_2.2.6-fdroid_arm64-v8a.apk",
    });
    reset(data);
  }, []);
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام کلاینت را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام کلاینت"}
          placeholder=""
        />
        <Inputs
          register={register}
          option={{ required: "لطفا پروتکل کلاینت را وارد کنید" }}
          error={errors}
          name={"protocol"}
          label={"پروتکل کلاینت"}
          placeholder=""
        />
        <Inputs
          register={register}
          option={{ required: "لطفا لینک دانلود را وارد کنید" }}
          error={errors}
          name={"downloadUrl"}
          label={"لینک دانلود"}
          placeholder=""
        />
        <FormBtn text={"ویرایش کلاینت"} />
      </form>
    </FormLayout>
  );
}

export default EditVpnClients;
