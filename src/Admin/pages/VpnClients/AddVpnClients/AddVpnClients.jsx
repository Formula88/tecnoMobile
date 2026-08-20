import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { addVpnClients } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { errorSwal, successSwal } from "../../../../Swals/Swals";

function AddVpnClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const result = await addVpnClients(
      data.name,
      data.protocol,
      data.downloadUrl,
    );

    if (!result?.success) {
      errorSwal("خطا در افرودن کلاینت", "کلاینت اضافه نشد");
    } else successSwal("کلاینت با موفقیت اضافه شد", "کلاینت اضافه شد");

    navigate("/admin/vpnClients");
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
