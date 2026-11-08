import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useNavigate } from "react-router-dom";
import { successSwal } from "../../../../Swals/Swals";

function SetVPNOrders() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = () => {
    successSwal("کانفیگ اختصاصی با موفقیت ثبت و ارسال شد", "تنظیم موفق");
    navigate("/admin/VPNOrders");
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          name={"config"}
          option={{ required: "لطفا کانفیگ را وارد کنید" }}
          label={"کانفیگ"}
          error={errors}
          placeholder="لینک کانفیگ vless:// یا vmess:// را وارد کنید"
        />
        <FormBtn text={"تنظیم و ارسال کانفیگ"} />
      </form>
    </FormLayout>
  );
}

export default SetVPNOrders;
