import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAdminProduct, getAdminProduct, getBrands } from "../../../../../services/api";
import { errorSwal, ServerErrorSwal, successSwal } from "../../../../../Swals/Swals";

function EditAccessoriesmodel() {
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

          const modelsStr = Array.isArray(extra.models) ? extra.models.join(", ") : "";

          reset({
            NAME: p.name,
            description: p.description,
            price: p.price,
            discount: p.discount,
            brandId: p.brandId,
            models: modelsStr,
            warranty: extra.warranty || "0",
            details: p.details || "",
          });
        } else {
          ServerErrorSwal("کالای مورد نظر یافت نشد");
        }
      });
    }
  }, [id, reset]);

  const handleFormSubmit = async (data) => {
    const modelsArr = (data.models || "")
      .split(/[,،]/)
      .map((m) => m.trim())
      .filter(Boolean);

    const extra = {
      warranty: parseInt(data.warranty, 10) || 0,
      models: modelsArr,
    };

    const payload = {
      name: data.NAME,
      description: data.description,
      price: data.price,
      discount: data.discount || 0,
      brandId: data.brandId,
      productType: "accessoriesmodel",
      details: data.details,
      extra: extra,
    };

    const result = await editAdminProduct(id, payload);
    if (result?.success) {
      await successSwal("کالا با موفقیت ویرایش شد", "عملیات موفق");
      navigate("/admin/products/accessoriesmodel");
    } else {
      errorSwal(result?.message || "خطا در ویرایش کالا", "خطا");
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام محصول را وارد کنید" }}
          error={errors}
          name={"NAME"}
          label={"نام محصول"}
        />

        <Inputs
          register={register}
          option={{ required: "لطفا توضیحات را وارد کنید" }}
          error={errors}
          name={"description"}
          label={"توضیحات کوتاه"}
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

        <Inputs
          register={register}
          option={{ required: "لطفا مدل‌های سازگار را وارد کنید" }}
          error={errors}
          name={"models"}
          label={"مدل‌های سازگار (با کاما جدا کنید)"}
        />

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
          option={{ required: "لطفا جزئیات کامل را وارد کنید" }}
          error={errors}
          name={"details"}
          label={"جزئیات کامل محصول"}
        />

        <FormBtn text={"ذخیره تغییرات"} />
      </form>
    </FormLayout>
  );
}

export default EditAccessoriesmodel;
