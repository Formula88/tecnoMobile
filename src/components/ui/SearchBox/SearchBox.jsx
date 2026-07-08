import React from "react";
import styles from "./SearchBox.module.scss";
function SearchBox({ placeholder, value, onSubmit, onChange }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}  dir="rtl">
      <label htmlFor="search">
        <input
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          id="search"
          type="text"
        />
        <button type="submit" className={styles.icon}>
          <svg
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["swap-on"]}
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          <svg
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["swap-off"]}
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}

export default SearchBox;
