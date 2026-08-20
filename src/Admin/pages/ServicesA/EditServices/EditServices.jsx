import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorSwal, successSwal } from "../../../../Swals/Swals";
import { editServicesA, getServiceA } from "../../../../services/api";

function EditServices() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const param = useParams();

  const handleFormSubmit = async (data) => {
    const result = await editServicesA(
      data.name,
      data.description,
      data.priceIn,
      data.priceOut,
      data.warranty,
      param.id,
    );

    if (!result?.success) {
      errorSwal("خط در ویرایش سرویس", "سرویس ویرایش نشد");
    } else successSwal("سرویس با موفقیت ویرایش شد", "سرویس ویرایش شد");

    navigate("/admin/services");
  };

  const getHandle = async (id) => {
    const result = await getServiceA(id);
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
          option={{ required: "لطفا نام سرویس را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام سرویس"}
          placeholder="مثلا تعمیرات"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا توضیحات سرویس را وارد کنید" }}
          error={errors}
          name={"description"}
          label={"توضیحات سرویس"}
          placeholder="مثلا تعمیر دوربین"
        />

        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"priceOut"}
              label={"پایان قیمت (تومان)"}
              placeholder="مثلا 1500000"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"priceIn"}
              label={"شروع قیمت (تومان)"}
              placeholder="مثلا 500000"
              type="number"
            />
          </div>
        </div>
        <Inputs
          register={register}
          option={{ required: "لطفا گارانتی را وارد کنید" }}
          error={errors}
          name={"warranty"}
          label={"گارانتی (ماه)"}
          placeholder="مثلا 6 (اگر گارانتی ندارد 0 وارد کنید)"
          type="number"
        />
        <FormBtn text={"ویرایش سرویس"} />
      </form>
    </FormLayout>
  );
}

export default EditServices;
