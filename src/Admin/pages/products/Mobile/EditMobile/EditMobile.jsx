import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";
import { useNavigate, useParams } from "react-router-dom";
import { editAdminProduct, getAdminProduct, getBrands } from "../../../../../services/api";
import { errorSwal, ServerErrorSwal, successSwal } from "../../../../../Swals/Swals";

function EditMobile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands().then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setBrands(res.data.map((b) => ({ value: b.id, text: b.name })));
      }
    });

    if (id) {
      getAdminProduct(id).then((res) => {
        if (res?.success && res.data) {
          const p = res.data;
          let extra = {};
          try {
            extra = typeof p.extra === "string" ? JSON.parse(p.extra) : (p.extra || {});
          } catch {
            extra = {};
          }
          const info = extra.phoneInformation || {};

          reset({
            NAME: p.name,
            description: p.description,
            price: p.price,
            discount: p.discount,
            brandId: p.brandId,
            status: extra.status || "نو",
            phoneType: extra.phoneType || "پرچمدار",
            cpu: info.cpu || "",
            camera: info.camera || "",
            memory: info.memory || "",
            battery: info.battery || "",
            warranty: extra.warranty || "0",
            details: p.details || "",
          });
        } else {
          ServerErrorSwal("محصول مورد نظر یافت نشد");
        }
      });
    }
  }, [id, reset]);

  const handleFormSubmit = async (data) => {
    const extra = {
      status: data.status,
      warranty: parseInt(data.warranty, 10) || 0,
      phoneType: data.phoneType,
      phoneInformation: {
        cpu: data.cpu,
        camera: data.camera,
        memory: data.memory,
        battery: data.battery,
      },
    };

    const payload = {
      name: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount || 0,
      brandId: data.brandId,
      productType: "mobile",
      details: data.details,
      extra: extra,
    };

    const result = await editAdminProduct(id, payload);
    if (result?.success) {
      await successSwal("اطلاعات گوشی با موفقیت ویرایش شد", "عملیات موفق");
      navigate("/admin/products/mobile");
    } else {
      errorSwal(result?.message || "خطا در ویرایش اطلاعات", "خطا");
    }
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
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{
                required: "لطفا درصد تخفیف را وارد کنید",
                min: { value: 0, message: "درصد نمی‌تواند کمتر از 0 باشد" },
                max: { value: 100, message: "درصد نمی‌تواند بیشتر از 100 باشد" },
              }}
              error={errors}
              name={"discount"}
              label={"تخفیف (%)"}
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
          items={brands.length > 0 ? brands : ["سامسونگ", "اپل", "شیائومی"]}
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
                "پرچمدار",
                "میان رده",
                "پایین رده",
                "گیمینگ",
                "مناسب روزمره",
                "مناسب عکاسی",
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
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا مقدار دوربین را وارد کنید" }}
              error={errors}
              name={"camera"}
              label={"دوربین (MP)"}
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
          type="number"
        />

        <Textareas
          register={register}
          option={{ required: "لطفا جزئیات محصول را وارد کنید" }}
          error={errors}
          name={"details"}
          label={"جزئیات محصول"}
        />
        <FormBtn text={"ذخیره تغییرات"} />
      </form>
    </FormLayout>
  );
}

export default EditMobile;
