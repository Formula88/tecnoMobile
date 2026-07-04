import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ pageCount, onPageChange, currentPage }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={currentPage}
      previousLabel=""
      nextLabel=""
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      activeClassName={styles.active}
      previousClassName={styles.arrow}
      nextClassName={styles.arrow}
      breakClassName={styles.page}
    />
  );
}

export default Pagination;
