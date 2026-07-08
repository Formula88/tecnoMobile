import styles from "./Products.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import Pagination from "../../components/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
import SearchBox from "../../components/ui/SearchBox/SearchBox";
import ProductsCard from "../../components/cards/ProductsCard/ProductsCard";
import { GetProducts } from "../../services/api";
import { ServerErrorSwal } from "../../Swals/Swals";
import FillterProducts from "../../components/sections/FillterProducts/FillterProducts";

function Products() {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("newest");
  const [productType, setProductType] = useState("all");
  const [products, setProducts] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(1);
      return;
    }
    GetProducts(currentPage, searchValue, productType, sort).then((result) => {
      if (!result?.success) {
        ServerErrorSwal();
        return;
      }

      setProducts(result.data);
      setPageCount(result.countPage);
    });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    GetProducts(currentPage, searchValue, productType, sort).then((result) => {
      if (!result?.success) {
        ServerErrorSwal();
        return;
      }

      setProducts(result.data);
      setPageCount(result.countPage);
    });
  }, [currentPage,productType,sort]);

  return (
    <>
      <HeaderNav />
      <div className={styles.products}>
        <div className={styles.SearchBox}>
          <SearchBox
            placeholder={"جستجوی بین محصولات..."}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            value={searchValue}
          />
        </div>
        <div className={styles.fillters}>
          <FillterProducts ProductType={setProductType} Sort={setSort} />
        </div>
        <div className="container">
          <div
            className={`row row-cols-lg-4 row-cols-sm-2 row-cols-1 ${styles.productsCards}`}
          >
            {products.length !== 0 ? (
              products.map((value) => {
                return (
                  <div className={`col ${styles.col}`} key={value.id}>
                    <ProductsCard
                      id={value.id}
                      title={value.NAME}
                      description={value.description}
                      imgs={value.imgs}
                      price={value.price}
                      discount={value.discount}
                    />
                  </div>
                );
              })
            ) : (
              <span className={styles.notFound}>محصولی یافت نشد</span>
            )}
          </div>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </>
  );
}

export default Products;
