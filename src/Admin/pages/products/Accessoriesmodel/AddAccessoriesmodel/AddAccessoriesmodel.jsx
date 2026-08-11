import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import InputFile from "../../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";

function AddAccessoriesmodel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const hardwareData = {
      NAME: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount,
      brandId: data.brandId,
      productType: "accessories",

      imgs: data.imgs,

      details: data.details,

      extra: {
        warranty: data.warranty,
        models: data.models.split(","),
      },
    };

    console.log(hardwareData);
  };

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
          placeholder="مثلا airpad pro"
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
              value="0"
            />
          </div>
        </div>

        <InputFile
          register={register}
          option={{
            required: "لطفا حداقل یک عکس وارد کنید",
          }}
          name={"imgs"}
          error={errors}
        />

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

        <Inputs
          register={register}
          option={{
            required: "لطفا مدل های موجود را وارد کنید",
          }}
          error={errors}
          name={"models"}
          label={"مدل ها"}
          placeholder="Poco X5 Pro,A32 5G,A13,Poco X7 Pro"
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

        <FormBtn text={"افزودن سخت افزار"} />
      </form>
    </FormLayout>
  );
}

export default AddAccessoriesmodel;
