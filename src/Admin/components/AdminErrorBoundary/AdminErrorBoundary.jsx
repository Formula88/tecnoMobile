import React from "react";
import styles from "./AdminErrorBoundary.module.scss";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("[Admin Error Boundary Caught]:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBox} dir="rtl">
          <div className={styles.card}>
            <div className={styles.icon}>
              <FaExclamationTriangle />
            </div>
            <h2 className={styles.title}>خطایی در پردازش اطلاعات رخ داده است</h2>
            <p className={styles.desc}>
              یک خطای غیرمنتظره در پنل مدیریت رخ داده است. سیستم از کرش کامل صفحه جلوگیری کرد.
            </p>
            {this.state.error && (
              <pre className={styles.errorText}>
                {this.state.error.toString()}
              </pre>
            )}
            <button onClick={this.handleReset} className={styles.btn}>
              <FaRedo />
              <span>بارگذاری مجدد صفحه</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
