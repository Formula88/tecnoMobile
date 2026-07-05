import styles from "./Products.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import Pagination from "../../components/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
import SearchBox from "../../components/ui/SearchBox/SearchBox";
import ProductsCard from "../../components/cards/ProductsCard/ProductsCard";

function Products() {
  const [pageCount, setPageCount] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {}, [currentPage]);

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
        <div className="container">
          <div
            className={`row row-cols-lg-4 row-cols-sm-2 row-cols-1 ${styles.productsCards}`}
          >
            {products.map((value) => {
              return (
                <div className={`col ${styles.col}`}>
                  <ProductsCard
                    id={}
                    title={}
                    description={}
                    img={}
                    price={}
                    discount={}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </>
  );
}

export default Products;
