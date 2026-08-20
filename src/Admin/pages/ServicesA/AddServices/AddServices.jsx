import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { errorSwal, successSwal } from "../../../../Swals/Swals";
import { useNavigate } from "react-router-dom";
import { addServicesA } from "../../../../services/api";

function AddServices() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();


  const handleFormSubmit = async (data) => {
    const result = await addServicesA(data.name,data.description,data.priceIn,data.priceOut,data.warranty);

    if (!result?.success) {
      errorSwal("خطا در افرودن سرویس", "سرویس اضافه نشد");
    } else successSwal("سرویس با موفقیت اضافه شد", "سرویس اضافه شد");

    navigate("/admin/services");
  };

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
        <FormBtn text={"افزودن سرویس"} />
      </form>
    </FormLayout>
  );
}

export default AddServices;
