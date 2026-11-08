import Swal from "sweetalert2";

export const ServerErrorSwal = (message) => {
  Swal.fire({
    icon: "error",
    title: "ارور",
    text: message || "سرور دچار مشکل شده است",
    confirmButtonText: "باشه",
    theme: "dark",
  });
};

export const successSwal = (text, title) => {
  return Swal.fire({
    title: title || "عملیات موفق",
    text: text,
    icon: "success",
    confirmButtonText: "باشه",
    theme: "dark",
  });
};

export const errorSwal = (text, title) => {
  return Swal.fire({
    title: title || "خطا",
    text: text,
    icon: "error",
    confirmButtonText: "باشه",
    theme: "dark",
  });
};

export const confirmSwal = async (text, title = "آیا مطمئن هستید؟", confirmButtonText = "بله، حذف شود") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1499e6",
    confirmButtonText: confirmButtonText,
    cancelButtonText: "انصراف",
    theme: "dark",
  });
  return result.isConfirmed;
};
