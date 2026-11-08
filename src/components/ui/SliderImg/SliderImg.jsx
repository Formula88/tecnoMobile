import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import styles from "./SliderImg.module.scss";
import { parseProductImages, getImageUrl } from "../../../utils/Utils";

function SliderImg({ images = [] }) {
  const safeImgs = parseProductImages(images);

  return (
    <>
      <Swiper
        className={styles.slider}
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        slidesPerView={1}
        loop={safeImgs.length > 1}
      >
        {safeImgs.map((img, index) => {
          const src = getImageUrl(img);
          return (
            <SwiperSlide key={index}>
              <img src={src} alt={`product-${index}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SliderImg;
