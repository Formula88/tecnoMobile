import { useForm } from "react-hook-form";
import FormLayout from "../../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../../components/FormBtn/FormBtn";
import Inputs from "../../../../../components/ui/Inputs/Inputs";
import InputFile from "../../../../../components/ui/InputFile/InputFile";
import Selects from "../../../../../components/ui/Selects/Selects";
import Textareas from "../../../../../components/ui/Textareas/Textareas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAdminProduct, getBrands } from "../../../../../services/api";
import { errorSwal, successSwal } from "../../../../../Swals/Swals";

function AddAccessoriesmodel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands().then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setBrands(res.data.map((b) => ({ value: b.id, text: b.name })));
      }
    });
  }, []);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.NAME);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discount", data.discount || 0);
    formData.append("brandId", data.brandId);
    formData.append("productType", "accessoriesmodel");
    formData.append("details", data.details);

    const modelsArr = (data.models || "")
      .split(/[,،]/)
      .map((m) => m.trim())
      .filter(Boolean);

    const extra = {
      warranty: parseInt(data.warranty, 10) || 0,
      models: modelsArr,
    };
    formData.append("extra", JSON.stringify(extra));

    if (data.imgs && data.imgs.length > 0) {
      for (let i = 0; i < data.imgs.length; i++) {
        formData.append("imgs[]", data.imgs[i]);
      }
    }

    const result = await addAdminProduct(formData);
    if (result?.success) {
      await successSwal("کالای مدل‌دار با موفقیت اضافه شد", "عملیات موفق");
      navigate("/admin/products/accessoriesmodel");
    } else {
      errorSwal(result?.message || "خطا در افزودن کالا", "خطا");
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
          placeholder="مثلا قاب سیلیکونی ایفون"
        />

        <Inputs
          register={register}
          option={{ required: "لطفا توضیحات را وارد کنید" }}
          error={errors}
          name={"description"}
          label={"توضیحات کوتاه"}
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
              defaultValue="0"
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
          items={brands.length > 0 ? brands : ["سامسونگ", "اپل", "شیائومی"]}
        />

        <Inputs
          register={register}
          option={{ required: "لطفا مدل‌های سازگار را وارد کنید" }}
          error={errors}
          name={"models"}
          label={"مدل‌های سازگار (با کاما جدا کنید)"}
          placeholder="iPhone 13, iPhone 14, iPhone 15"
        />

        <Inputs
          register={register}
          option={{ required: "لطفا مدت گارانتی را وارد کنید" }}
          error={errors}
          name={"warranty"}
          label={"گارانتی (ماه)"}
          placeholder="مثلا 6 (اگر ندارد 0 وارد کنید)"
          type="number"
        />

        <Textareas
          register={register}
          option={{ required: "لطفا جزئیات کامل را وارد کنید" }}
          error={errors}
          name={"details"}
          label={"جزئیات کامل محصول"}
        />

        <FormBtn text={"افزودن کالای مدل‌دار"} />
      </form>
    </FormLayout>
  );
}

export default AddAccessoriesmodel;
