import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import Selects from "../../../../components/ui/Selects/Selects";
import FormBtn from "../../../components/FormBtn/FormBtn";
import { toPersianDigits } from "../../../../utils/Utils";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../../../services/api";
import { errorSwal, successSwal } from "../../../../Swals/Swals";

function UsersEdit() {
  const params = useParams();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    let admin;
    if (data.userType === "ادمین") {
      admin = 1;
    } else if (data.userType === "کاربر عادی") {
      admin = 0;
    }

    const result = await updateUser(params.id, admin);

    if (!result?.success) {
      errorSwal("وضعیت کاربر تغیر نکرد", "کاربر ویرایش نشد");
    } else {
      successSwal(
        "وضعیت کاربر با موفقیت تغیر پیدا کرد",
        "ویرایش موفقیت امیز بود",
      );
    }

    navigate("/admin/users");
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Selects
          register={register}
          option={{ required: "لطفا وضعیت کاربر را انتخاب کنید." }}
          error={errors}
          name={"userType"}
          label={"وضعیت کاربر"}
          items={["کاربر عادی", "ادمین"]}
        />
        <FormBtn text={"تغییر وضعیت کاربر"} />
      </form>
    </FormLayout>
  );
}

export default UsersEdit;
