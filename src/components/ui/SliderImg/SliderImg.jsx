import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import styles from "./SliderImg.module.scss";

function SliderImg({ images = [] }) {
  const safeImgs =
    typeof images === "string"
      ? JSON.parse(images)
      : Array.from(images)
      ? images
      : [];
  return (
    <>
      <Swiper
        className={styles.slider}
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        slidesPerView={1}
        loop={images.length > 1}
      >
        {safeImgs?.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={img} alt={`product-${index}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SliderImg;
