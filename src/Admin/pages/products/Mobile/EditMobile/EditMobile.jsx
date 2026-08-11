import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import { useEffect } from "react";
import InputFile from "../../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";

function EditMobile() {
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
      NAME: "iPhone 13 Pro Max",
      description: "گوشی اپل iPhone 13 Pro Max",
      price: 280000000,
      discount: 10,
      brandId: 1,
      productType: "mobile",

      imgs: [
        "http://localhost/tecnomobile/api/public/upload/iPhone1.png",
        "http://localhost/tecnomobile/api/public/upload/iPhone2.png",
        "http://localhost/tecnomobile/api/public/upload/iPhone3.png",
        "http://localhost/tecnomobile/api/public/upload/iPhone4.png",
        "http://localhost/tecnomobile/api/public/upload/iPhone5.png",
      ],

      details: "گوشی iPhone 13 Pro Max یکی از پرچم‌داران محبوب اپل است.",

      extra: {
        status: "نو",
        warranty: "6",
        phoneType: "پرچمدار",

        phoneInformation: {
          cpu: "Hexa-core CPU",
          camera: 12,
          memory: 256,
          battery: 4352,
        },
      },
    };

    reset({
      NAME: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount,
      brandId: data.brandId,

      imgs: data.imgs,

      details: data.details,

      status: data.extra.status,
      warranty: data.extra.warranty,
      phoneType: data.extra.phoneType,

      cpu: data.extra.phoneInformation.cpu,
      camera: data.extra.phoneInformation.camera,
      memory: data.extra.phoneInformation.memory,
      battery: data.extra.phoneInformation.battery,
    });

  }, [reset]);

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
            />
          </div>
        </div>


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

        <FormBtn text={"ویرایش گوشی"} />
      </form>
    </FormLayout>
  );
}

export default EditMobile;
