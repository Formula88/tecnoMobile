import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import { useState } from "react";
import InputFile from "../../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";

function AddMobile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const mobileData = {
      NAME: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount,
      brandId: data.brandId,
      productType: "mobile",

      imgs: data.imgs,

      details: data.details,

      extra: {
        status: data.status,
        warranty: data.warranty,
        phoneType: data.phoneType,

        phoneInformation: {
          cpu: data.cpu,
          camera: data.camera,
          memory: data.memory,
          battery: data.battery,
        },
      },
    };

    console.log(mobileData);
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام گوشی را وارد کنید" }}
          error={errors}
          name={"NAME"}
          label={"نام گوشی"}
          placeholder="مثلا iPhone 13 Pro Max"
        />

        <Inputs
          register={register}
          option={{ required: "لطفا توضیحات را وارد کنید" }}
          error={errors}
          name={"description"}
          label={"توضیحات"}
          placeholder="توضیحات کوتاه محصول"
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
        <InputFile
          register={register}
          option={{ required: "لطفا حداقل یک عکس وارد کنید" }}
          name={"imgs"}
          error={errors}
        />
        <Selects
          register={register}
          option={{ required: "لطفا برند را انتخاب کنید" }}
          error={errors}
          name={"brandId"}
          label={"برند"}
          items={["شیائومی", "سامسونگ", "اپل"]}
        />
        <div className="row row-cols-2">
          <div className="col">
            <Selects
              register={register}
              option={{ required: "لطفا وضعیت گوشی را انتخاب کنید" }}
              error={errors}
              name={"status"}
              label={"وضعیت"}
              items={["نو", "درحد نو", "کارکرده", "نیاز به تعمیر"]}
            />
          </div>
          <div className="col">
            <Selects
              register={register}
              option={{ required: "لطفا نوع گوشی را انتخاب کنید" }}
              error={errors}
              name={"phoneType"}
              label={"نوع گوشی"}
              items={[
                "گیمینگ",
                "مناسب روزمره",
                "مناسب عکاسی",
                "پرچمدار",
                "میان رده",
                "پایین رده",
              ]}
            />
          </div>
        </div>
        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا CPU را وارد کنید" }}
              error={errors}
              name={"cpu"}
              label={"CPU"}
              placeholder="مثلا Hexa-core CPU"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا مقدار دوربین را وارد کنید" }}
              error={errors}
              name={"camera"}
              label={"دوربین (MP)"}
              placeholder="مثلا 12"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا مقدار حافظه را وارد کنید" }}
              error={errors}
              name={"memory"}
              label={"حافظه (GB)"}
              placeholder="مثلا 256"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا ظرفیت باتری را وارد کنید" }}
              error={errors}
              name={"battery"}
              label={"باتری (mAh)"}
              placeholder="مثلا 4352"
              type="number"
            />
          </div>
        </div>

        <Inputs
          register={register}
          option={{ required: "لطفا مدت گارانتی را وارد کنید" }}
          error={errors}
          name={"warranty"}
          label={"گارانتی (ماه)"}
          placeholder="مثلا 6 (اگر گارانتی ندارد 0 وارد کنید)"
          type="number"
        />

        <Textareas
          register={register}
          option={{ required: "لطفا جزئیات محصول را وارد کنید" }}
          error={errors}
          name={"details"}
          label={"جزئیات محصول"}
          placeholder="توضیحات کامل محصول"
        />
        <FormBtn text={"افزودن گوشی"} />
      </form>
    </FormLayout>
  );
}

export default AddMobile;
