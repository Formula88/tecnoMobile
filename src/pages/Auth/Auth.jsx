import styles from "./Auth.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/img/logo.svg"

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [page, setPage] = useState("login");

  const onsubmit = (data) => {
    console.log(data);
  };

  let btnText

  switch (page) {
    case "login":
      btnText = "ورود"
      break;
  
    default:
      break;
  }

  return (
    <div className={styles.auth}>
      <img src={logo} alt="tecnomobile" className={styles.logo} />
      <form onSubmit={handleSubmit(onsubmit)} className={styles.form}>
        {
          page === "login" && (<LoginForm register={register} error={errors} />) 
        }
        <input type="submit" value={btnText} className={`btnPrimary ${styles.btn}`}/>
      </form>
    </div>
  );
}

export default Auth;
