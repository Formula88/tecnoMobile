import Swal from "sweetalert2";

export const ServerErrorSwal = () => {
  Swal.fire({
    icon: "error",
    title: "ارور",
    text: "سرور دچار مشکل شده است",
    cancelButtonText: "باشه",
    theme: "dark",
  });
};

export const successSwal = (text, title) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    cancelButtonText: "باشه",
    theme: "dark",
  });
};

export const errorSwal = (text, title) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    cancelButtonText: "باشه",
    theme: "dark",
  });
};
