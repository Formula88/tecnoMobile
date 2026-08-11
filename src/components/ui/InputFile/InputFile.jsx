import {useId, useState } from "react";
import styles from "./InputFile.module.scss";
import { FaPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

function InputFile({
  register,
  name,
  option,
  error,
  label = "تصویر",
}) {
  const [images, setImages] = useState([]);

  const inputId = useId();

  const registerProps = register(name, option);


  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages(imageUrls);
  };

  const handleRemoveImage = (index) => {
    setImages((perv) => perv.filter((_, i) => i !== index));
  };
  return (
    <div className={styles.inputBox}>
      <span className={styles.label}>{label}</span>
      <label htmlFor={inputId} className={styles.input}>
        <span>اتخاب فایل</span>
        <FaPlus />
      </label>
      <input
        id={inputId}
        type="file"
        {...registerProps}
        className="d-none"
        accept="image/*"
        multiple
        onChange={(e) => {
          registerProps.onChange(e);
          handleImages(e);
        }}
      />
      <div className={`row row-cols-3 ${styles.imgs}`}>
        {images.map((value, index) => {
          return (
            <div key={index} className="col">
              <div className={styles.img}>
                <img src={value.url} alt={`preview-${index}`} />
                <div
                  className={styles.delete}
                  onClick={() => {
                    handleRemoveImage(index);
                  }}
                >
                  <IoMdCloseCircle />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.error}>{error?.[name]?.message}</p>
    </div>
  );
}

export default InputFile;
