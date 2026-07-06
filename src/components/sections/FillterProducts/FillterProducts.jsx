import React from "react";
import VanilaSelect from "../../ui/VanilaSelect/VanilaSelect";

function FillterProducts({ ProductType, Sort }) {
  const handleChangeProductType = (e) => {
    ProductType(e.currentTarget.value);
  };
  const handleChangeSort = (e) => {
    Sort(e.currentTarget.value);
  };
  return (
    <>
      <VanilaSelect
        name={"productType"}
        label={"نوع کالا :"}
        items={[
          { name: "all", value: "همه محصولات" },
          { name: "mobile", value: "موبایل" },
          { name: "accessories", value: "لوازم جنبی" },
          { name: "hardware", value: "سخت افزار" },
        ]}
        onChange={handleChangeProductType}
      />
      <VanilaSelect
        name={"sort"}
        label={"مرتب سازی بر اساس :"}
        items={[
          { name: "newest", value: "جدید ترین" },
          { name: "price_asc", value: "ارزان ترین" },
          { name: "price_desc", value: "گران ترین" },
        ]}
        onChange={handleChangeSort}
      />
    </>
  );
}

export default FillterProducts;
