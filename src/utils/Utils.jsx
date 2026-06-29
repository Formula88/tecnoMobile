import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const formatPrice = (num) => {
  return new Intl.NumberFormat("fa-IR").format(num);
};

export const getDiscountAmount = (price, discountPercent) => {
  return price - (price * discountPercent) / 100;
};

export const toPersianDigits = (value) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return value.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};

export const useScrollTo = (to) => {
  const Location = useLocation();
  useEffect(() => {
    if (location.hash === `#${to}`) {
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [Location]);
};
