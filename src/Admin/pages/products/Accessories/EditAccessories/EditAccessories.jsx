import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import { useEffect } from "react";
import InputFile from "../../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";

function EditAccessories() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    const hardwareData = {
      NAME: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount,
      brandId: data.brandId,
      productType: "hardware",

      imgs: data.imgs,

      details: data.details,

      extra: {
        warranty: data.warranty,
      },
    };

    console.log(hardwareData);
  };

  useEffect(() => {
    const data = {
      id: 1,
      NAME: "airpad pro",
      description: "airpad pro iphone",
      price: 210000000,
      discount: 0,
      brandId: "ASUS",
      productType: "hardware",

      imgs: ["http://localhost/tecnomobile/api/public/upload/Ultra%20900.png"],

      details:
        "کارت گرافیک Ultra 900 با بهره‌گیری از فناوری‌های پیشرفته پردازش تصویر و معماری بهینه، عملکردی روان و قدرتمند را در اجرای بازی‌ها، طراحی سه‌بعدی و پردازش‌های گرافیکی ارائه می‌دهد.",

      extra: {
        warranty: "10",
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

      warranty: data.extra.warranty,
    });
  }, [reset]);

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{
            required: "لطفا نام محصول را وارد کنید",
          }}
          error={errors}
          name={"NAME"}
          label={"نام محصول"}
          placeholder="مثلا GPU Ultra 900"
        />

        <Inputs
          register={register}
          option={{
            required: "لطفا توضیحات را وارد کنید",
          }}
          error={errors}
          name={"description"}
          label={"توضیحات"}
          placeholder="توضیحات کوتاه محصول"
        />

        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{
                required: "لطفا قیمت را وارد کنید",
              }}
              error={errors}
              name={"price"}
              label={"قیمت (تومان)"}
              placeholder="مثلا 210000000"
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
          option={{
            required: "لطفا برند را انتخاب کنید",
          }}
          error={errors}
          name={"brandId"}
          label={"برند"}
          items={["ASUS", "MSI", "Gigabyte", "Intel", "AMD", "NVIDIA"]}
        />

        <Inputs
          register={register}
          option={{
            required: "لطفا مدت گارانتی را وارد کنید",
            min: {
              value: 0,
              message: "گارانتی نمی‌تواند کمتر از 0 باشد",
            },
          }}
          error={errors}
          name={"warranty"}
          label={"گارانتی (ماه)"}
          placeholder="مثلا 12 (اگر گارانتی ندارد 0 وارد کنید)"
          type="number"
        />

        <Textareas
          register={register}
          option={{
            required: "لطفا جزئیات محصول را وارد کنید",
          }}
          error={errors}
          name={"details"}
          label={"جزئیات محصول"}
          placeholder="توضیحات کامل محصول"
        />

        <FormBtn text={"ویرایش سخت افزار"} />
      </form>
    </FormLayout>
  );
}

export default EditAccessories;
