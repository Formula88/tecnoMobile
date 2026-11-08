import { useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../layout/FormLayout/FormLayout";
import FormBtn from "../../../components/FormBtn/FormBtn";
import Inputs from "../../../../components/ui/Inputs/Inputs";
import { addVpnClients } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { errorSwal, successSwal } from "../../../../Swals/Swals";

function AddVpnClients() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [configOptions, setConfigOptions] = useState({
    link: true,
    qr: true,
    file: false,
  });

  const hasSelectedOption = Object.values(configOptions).some(Boolean);

  const handleFormSubmit = async (data) => {
    const selectedTypes = Object.keys(configOptions).filter((k) => configOptions[k]);
    if (selectedTypes.length === 0) {
      errorSwal("لطفاً حداقل یک روش برای ارائه کانفیگ انتخاب کنید", "انتخاب روش الزامی است");
      return;
    }

    const result = await addVpnClients(
      data.name,
      data.protocol,
      data.downloadUrl,
      selectedTypes.join(","),
    );

    if (!result?.success) {
      errorSwal(result?.message || "خطا در افزودن کلاینت", "کلاینت اضافه نشد");
      return;
    }

    successSwal("کلاینت با موفقیت اضافه شد", "کلاینت اضافه شد");
    navigate("/admin/vpnClients");
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Inputs
          register={register}
          option={{ required: "لطفا نام کلاینت را وارد کنید" }}
          error={errors}
          name={"name"}
          label={"نام کلاینت"}
          placeholder="مثال: v2rayNG یا WireGuard"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا پروتکل کلاینت را وارد کنید" }}
          error={errors}
          name={"protocol"}
          label={"پروتکل کلاینت"}
          placeholder="مثال: VLESS / VMess / WireGuard"
        />
        <Inputs
          register={register}
          option={{ required: "لطفا لینک دانلود را وارد کنید" }}
          error={errors}
          name={"downloadUrl"}
          label={"لینک دانلود کلاینت"}
          placeholder="مثال: https://github.com/..."
        />

        <div className="mb-4 text-end" dir="rtl">
          <label className="form-label text-white fw-bold d-block mb-2">
            روش‌های ارائه کانفیگ در این کلاینت:
          </label>
          <div className="d-flex flex-wrap gap-2">
            <label
              className={`d-flex align-items-center gap-2 p-2 px-3 rounded border transition-all ${
                configOptions.link
                  ? "border-primary bg-primary bg-opacity-15 text-white"
                  : "border-secondary border-opacity-50 text-secondary"
              }`}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <input
                type="checkbox"
                checked={configOptions.link}
                onChange={(e) =>
                  setConfigOptions((prev) => ({ ...prev, link: e.target.checked }))
                }
                className="form-check-input mt-0"
              />
              <span>🔗 لینک کانفیگ (Config Link)</span>
            </label>

            <label
              className={`d-flex align-items-center gap-2 p-2 px-3 rounded border transition-all ${
                configOptions.qr
                  ? "border-info bg-info bg-opacity-15 text-white"
                  : "border-secondary border-opacity-50 text-secondary"
              }`}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <input
                type="checkbox"
                checked={configOptions.qr}
                onChange={(e) =>
                  setConfigOptions((prev) => ({ ...prev, qr: e.target.checked }))
                }
                className="form-check-input mt-0"
              />
              <span>📷 بارکد QR (QR Code)</span>
            </label>

            <label
              className={`d-flex align-items-center gap-2 p-2 px-3 rounded border transition-all ${
                configOptions.file
                  ? "border-success bg-success bg-opacity-15 text-white"
                  : "border-secondary border-opacity-50 text-secondary"
              }`}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              <input
                type="checkbox"
                checked={configOptions.file}
                onChange={(e) =>
                  setConfigOptions((prev) => ({ ...prev, file: e.target.checked }))
                }
                className="form-check-input mt-0"
              />
              <span>📁 فایل کانفیگ (Config File)</span>
            </label>
          </div>
          {!hasSelectedOption && (
            <div className="text-danger small mt-2">
              * انتخاب حداقل یکی از روش‌های ارائه کانفیگ (لینک، QR کد یا فایل) الزامی است.
            </div>
          )}
        </div>

        <FormBtn text={"افزودن کلاینت"} />
      </form>
    </FormLayout>
  );
}

export default AddVpnClients;
