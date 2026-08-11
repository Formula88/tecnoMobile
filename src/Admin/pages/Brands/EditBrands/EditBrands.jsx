import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Selects from "../../../../components/ui/Selects/Selects";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";

function EditBrands() {
  const [name, setName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setName("Apple");
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
          value={name}
        />
        <Selects
          register={register}
          option={{ required: "لطفا کتگوری برند را انتخاب کنید" }}
          error={errors}
          name={"category"}
          label={"کتگوری"}
          items={["موبایل", "سخت افزار", "لوازم جانبی"]}
        />
        <FormBtn text={"ویرایش برند"} />
      </form>
    </FormLayout>
  );
}

export default EditBrands;
