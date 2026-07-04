import Inputs from "../Inputs/Inputs";

function NumberForm({ register, error }) {
  return (
    <Inputs
      register={register}
      name={"phoneNumber"}
      label={"شماره موبایل"}
      option={{required:"لطفا شماره موبایل خود را وارد کنید",pattern:{
        value:/^09\d{9}$/,
        message:"شماره تلفن صحیح نمیباشد"
      }}}
      error={error}
      placeholder={"09123456789"}
    />
  );
}

export default NumberForm;
