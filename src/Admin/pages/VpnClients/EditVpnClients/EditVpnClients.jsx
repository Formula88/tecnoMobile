import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editVpnClients, getVpnClient } from "../../../../services/api";
import { errorSwal, ServerErrorSwal, successSwal } from "../../../../Swals/Swals";

function EditVpnClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const param = useParams();

  const handleFormSubmit = async (data) => {
    const result = await editVpnClients(
      param.id,
      data.name,
      data.protocol,
      data.downloadUrl,
    );

    if (!result?.success) {
      errorSwal("خط در ویرایش کلاینت", "کلاینت ویرایش نشد");
    } else successSwal("کلاینت با موفقیت ویرایش شد", "کلاینت ویرایش شد");

    navigate("/admin/vpnClients");
  };

  const getHandle = async (id) => {
    const result = await getVpnClient(id);
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
        <FormBtn text={"ویرایش کلاینت"} />
      </form>
    </FormLayout>
  );
}

export default EditVpnClients;
