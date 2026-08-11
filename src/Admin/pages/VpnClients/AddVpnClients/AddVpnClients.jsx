import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";

function AddVpnClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام کلاینت را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام کلاینت"}
          placeholder=""
        />
        <Inputs
          register={register}
          option={{ required: "لطفا پروتکل کلاینت را وارد کنید" }}
          error={errors}
          name={"protocol"}
          label={"پروتکل کلاینت"}
          placeholder=""
        />
        <Inputs
          register={register}
          option={{ required: "لطفا لینک دانلود را وارد کنید" }}
          error={errors}
          name={"downloadUrl"}
          label={"لینک دانلود"}
          placeholder=""
        />
        <FormBtn text={"افزودن کلاینت"} />
      </form>
    </FormLayout>
  );
}

export default AddVpnClients;
