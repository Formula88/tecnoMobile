import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Selects from "../../../../components/ui/Selects/Selects";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editBrand, getBrand } from "../../../../services/api";
import { errorSwal, successSwal } from "../../../../Swals/Swals";

function EditBrands() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const param = useParams();

  const handleFormSubmit = async (data) => {
    const result = await editBrand(param.id, data.name, data.category);

    if (!result?.success) {
      errorSwal("خط در ویرایش برند", "برند ویرایش نشد");
    } else successSwal("برند با موفقیت ویرایش شد", "برند ویرایش شد");

    navigate("/admin/brands");
  };

  const getHandle = async (id) => {
    const result = await getBrand(id);
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    reset(result.data);
  };

  useEffect(() => {
    getHandle(param.id);
  }, []);
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
        <FormBtn text={"ویرایش برند"} />
      </form>
    </FormLayout>
  );
}

export default EditBrands;
