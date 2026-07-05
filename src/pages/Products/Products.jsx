import styles from "./Products.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import Pagination from "../../components/ui/Pagination/Pagination";
import { useEffect, useState } from "react";

function Products() {
  const [pageCount, setPageCount] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {

  }, [currentPage]);

  return (
    <>
      <HeaderNav />
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default Products;
