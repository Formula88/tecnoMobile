import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Selects from "../../../../components/ui/Selects/Selects";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { addBrand } from "../../../../services/api";
import { errorSwal, successSwal } from "../../../../Swals/Swals";
import { useNavigate } from "react-router-dom";

function AddBrands() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const result = await addBrand(data.name, data.category);

    if (!result?.success) {
      errorSwal("خطا در افرودن برند", "برند اضافه نشد");
    } else successSwal("برند با موفقیت اضافه شد", "برند اضافه شد");

    navigate("/admin/brands");
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام برند را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام برند"}
          placeholder="سامسونگ"
        />
        <Selects
          register={register}
          option={{ required: "لطفا کتگوری برند را انتخاب کنید" }}
          error={errors}
          name={"category"}
          label={"کتگوری"}
          items={[
            { value: "mobile", text: "موبایل" },
            { value: "hardware", text: "سخت افزار" },
            { value: "accessory", text: "لوازم جانبی" },
          ]}
        />
        <FormBtn text={"افزودن برند"} />
      </form>
    </FormLayout>
  );
}

export default AddBrands;
