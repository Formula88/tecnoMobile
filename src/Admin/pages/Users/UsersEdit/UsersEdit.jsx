import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import Selects from "../../../../components/ui/Selects/Selects";
import FormBtn from "../../../components/FormBtn/FormBtn";
import styles from "./UsersEdit.module.scss"

function UsersEdit() {
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
      <h1 className={styles.title}>09129072416</h1>
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
