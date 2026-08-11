import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";
import InputFile from "../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../components/ui/Selects/Selects";
import Textareas from "../../../../components/ui/Textareas/Textareas";

function EditServices() {
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
      id: 50,
      name: "تعمیر کامل گوشی",
      description: "بررسی و تعمیر کامل دستگاه",
      priceIn: 1000000,
      priceOut: 2500000,
      warranty: "0",
    };

    reset(data)
  }, []);

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام سرویس را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام سرویس"}
          placeholder="مثلا تعمیرات"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا توضیحات سرویس را وارد کنید" }}
          error={errors}
          name={"description"}
          label={"توضیحات سرویس"}
          placeholder="مثلا تعمیر دوربین"
        />

        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"priceOut"}
              label={"پایان قیمت (تومان)"}
              placeholder="مثلا 1500000"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"priceIn"}
              label={"شروع قیمت (تومان)"}
              placeholder="مثلا 500000"
              type="number"
            />
          </div>
        </div>
        <Inputs
          register={register}
          option={{ required: "لطفا گارانتی را وارد کنید" }}
          error={errors}
          name={"warranty"}
          label={"گارانتی (ماه)"}
          placeholder="مثلا 6 (اگر گارانتی ندارد 0 وارد کنید)"
          type="number"
        />
        <FormBtn text={"ویرایش سرویس"} />
      </form>
    </FormLayout>
  );
}

export default EditServices;
