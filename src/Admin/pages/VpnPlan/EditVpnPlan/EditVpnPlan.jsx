import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";
import InputFile from "../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../components/ui/Selects/Selects";
import Textareas from "../../../../components/ui/Textareas/Textareas";

function EditVpnPlan() {
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
    const data = {
      id: 1,
      name: "پلن عادی",
      price: 290000,
      discount: 0,
      duration: "0",
      traffic: "100",
      userCount: "3",
      protocol: "VLESS/VMESS",
      clientId: "V2RayN",
    };

    reset(data);
  }, []);

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام پلن را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام پلن"}
          placeholder="مثلا عادی"
        />

        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"price"}
              label={"قیمت (تومان)"}
              placeholder="مثلا 280000000"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{
                required: "لطفا درصد تخفیف را وارد کنید",
                min: {
                  value: 0,
                  message: "درصد نمی‌تواند کمتر از 0 باشد",
                },
                max: {
                  value: 100,
                  message: "درصد نمی‌تواند بیشتر از 100 باشد",
                },
              }}
              error={errors}
              name={"discount"}
              label={"تخفیف (%)"}
              placeholder="مثلا 10"
              type="number"
              value="0"
            />
          </div>
        </div>
        <Inputs
          register={register}
          option={{ required: "لطفا مدت را وارد کنید" }}
          error={errors}
          name={"duration"}
          label={"مدت (ماه)"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا حجم را وارد کنید" }}
          error={errors}
          name={"traffic"}
          label={"حجم (گیگ)"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا تعداد کاربر را وارد کنید" }}
          error={errors}
          name={"userCount"}
          label={"تعداد کاربر"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Selects
          register={register}
          option={{ required: "لطفا کلاینت را انتخاب کنید" }}
          error={errors}
          name={"clientId"}
          label={"کلاینت"}
          items={["V2RayN", "open vpn", "Npv Tunnel"]}
        />
        <FormBtn text={"افزودن وی پی ان"} />
      </form>
    </FormLayout>
  );
}

export default EditVpnPlan;
