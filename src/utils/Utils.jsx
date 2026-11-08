export const formatPrice = (num) => {
  if (num === null || num === undefined || isNaN(Number(num))) return "۰";
  return new Intl.NumberFormat("fa-IR").format(Number(num));
};

export const getDiscountAmount = (price, discountPercent) => {
  const p = Number(price) || 0;
  const d = Number(discountPercent) || 0;
  return p - (p * d) / 100;
};

export const toPersianDigits = (value) => {
  if (value === null || value === undefined) return "";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return value.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};

export const parseProductImages = (imgs) => {
  if (!imgs) return [];
  if (Array.isArray(imgs)) return imgs;
  if (typeof imgs === "object") return [imgs];
  if (typeof imgs === "string") {
    try {
      const parsed = JSON.parse(imgs);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "object" && parsed !== null) return [parsed];
      if (typeof parsed === "string") return [parsed];
    } catch {
      return [imgs];
    }
  }
  return [];
};

export const getImageUrl = (img) => {
  if (!img) return "";
  let path = img;
  if (typeof img === "object" && img !== null) {
    path = img.medium || img.original || img.small || "";
  }
  if (typeof path !== "string" || !path.trim()) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost/apiTecnomobile/api/public/")
    .replace(/index\.php\/?$/, "")
    .replace(/\/+$/, "");
  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
};
