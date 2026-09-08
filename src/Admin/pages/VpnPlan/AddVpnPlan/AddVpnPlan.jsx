import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import {
  errorSwal,
  ServerErrorSwal,
  successSwal,
} from "../../../../Swals/Swals";
import { useNavigate } from "react-router-dom";
import { addVpnPlan, getVpnClients } from "../../../../services/api";
import Selects from "../../../../components/ui/Selects/Selects";
import { useEffect, useState } from "react";

function AddVpnPlan() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const result = await addVpnPlan(
      data.name,
      data.price,
      data.discount,
      data.duration,
      data.traffic,
      data.userCount,
      data.clientId,
    );

    if (!result?.success) {
      errorSwal("خطا در افرودن پلن", "پلن اضافه نشد");
    } else successSwal("پلن با موفقیت اضافه شد", "پلن اضافه شد");

    navigate("/admin/vpn");
  };

  const getClient = async () => {
    const result = await getVpnClients();
    if (!result?.success) {
      ServerErrorSwal();
      return;
    }

    setClients(
      result.data.map((value) => {
        return {
          value: value.id,
          text: value.name,
        };
      }),
    );
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام پلن را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام پلن"}
          placeholder="مثلا عادی"
        />

        <div className="row row-cols-2">
          <div className="col">
            <Inputs
              register={register}
              option={{ required: "لطفا قیمت را وارد کنید" }}
              error={errors}
              name={"price"}
              label={"قیمت (تومان)"}
              placeholder="مثلا 280000000"
              type="number"
            />
          </div>
          <div className="col">
            <Inputs
              register={register}
              option={{
                required: "لطفا درصد تخفیف را وارد کنید",
                min: {
                  value: 0,
                  message: "درصد نمی‌تواند کمتر از 0 باشد",
                },
                max: {
                  value: 100,
                  message: "درصد نمی‌تواند بیشتر از 100 باشد",
                },
              }}
              error={errors}
              name={"discount"}
              label={"تخفیف (%)"}
              placeholder="مثلا 10"
              type="number"
              value="0"
            />
          </div>
        </div>
        <Inputs
          register={register}
          option={{ required: "لطفا مدت را وارد کنید" }}
          error={errors}
          name={"duration"}
          label={"مدت (ماه)"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا حجم را وارد کنید" }}
          error={errors}
          name={"traffic"}
          label={"حجم (گیگ)"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا تعداد کاربر را وارد کنید" }}
          error={errors}
          name={"userCount"}
          label={"تعداد کاربر"}
          placeholder="مثلا 5 (0 برای نامحدود کردن)"
          type="number"
        />
        <Selects
          register={register}
          option={{ required: "لطفا کلاینت را انتخاب کنید" }}
          error={errors}
          name={"clientId"}
          label={"کلاینت"}
          items={clients}
        />
        <FormBtn text={"افزودن وی پی ان"} />
      </form>
    </FormLayout>
  );
}

export default AddVpnPlan;
