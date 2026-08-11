import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";

function SetVPNOrders() {
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
          name={"config"}
          option={{ required: "لطغا کانفیگ را وارد کنید" }}
          label={"کانفیگ"}
          error={errors}
          placeholder="لینک کانفیگ را وارد کنید"
        />
        <FormBtn text={"تنظیم کانفیگ"} />
      </form>
    </FormLayout>
  );
}

export default SetVPNOrders;
