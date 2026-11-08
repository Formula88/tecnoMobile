import styles from "./AdminSearchBar.module.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import { toPersianDigits } from "../../../utils/Utils";

function AdminSearchBar({
  value = "",
  onChange = () => {},
  placeholder = "جستجو...",
  count,
  totalCount,
}) {
  const handleClear = () => {
    onChange("");
  };

  const isFiltered = value.trim().length > 0;

  return (
    <div className={styles.searchContainer} dir="rtl">
      <div className={styles.inputWrapper}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearBtn}
            title="پاک کردن جستجو"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {totalCount !== undefined && (
        <div className={styles.countBadge}>
          {isFiltered ? (
            <span>
              نمایش <strong className={styles.highlight}>{toPersianDigits(count)}</strong> از {toPersianDigits(totalCount)} مورد
            </span>
          ) : (
            <span>مجموع: {toPersianDigits(totalCount)} مورد</span>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminSearchBar;
