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
