import { useEffect, useState } from "react";
import Details from "../../components/sections/Details/Details";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import ProductInfo from "../../components/sections/ProductInfo/ProductInfo";
import SliderImg from "../../components/ui/SliderImg/SliderImg";
import styles from "./Product.module.scss";
import { useParams } from "react-router-dom";
import { GetProduct } from "../../services/api";
import { ServerErrorSwal } from "../../Swals/Swals";
import Breadcrumb from "../../components/layout/Breadcrumb/Breadcrumb";

function Product() {
  const params = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    GetProduct(params.id).then((result) => {
      if (result?.success === true) {
        setProduct(result.data);
      } else {
        ServerErrorSwal();
      }
    });
  }, [params.id]);

  return (
    <>
      <HeaderNav />
      <section className={styles.product}>
        <div className="container">
          <Breadcrumb productType={product.productType}/>
          <div className={styles.info}>
            <div className={styles.img}>
              <SliderImg images={product.imgs} />
            </div>
            <ProductInfo
              title={product.name}
              description={product.description}
              productType={product.productType}
              extra={product.extra}
              brand={product.brandName}
              price={product.price}
              discount={product.discount}
            />
          </div>
          <Details details={product.details} />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Product;
