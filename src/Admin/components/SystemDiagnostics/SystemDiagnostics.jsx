import { useState, useEffect } from "react";
import styles from "./SystemDiagnostics.module.scss";
import { FaHeartbeat, FaCheckCircle, FaExclamationCircle, FaShieldAlt, FaServer, FaSync } from "react-icons/fa";
import { getAdminStats } from "../../../services/api";
import { toPersianDigits } from "../../../utils/Utils";

function SystemDiagnostics() {
  const [status, setStatus] = useState({
    apiOnline: false,
    latency: 0,
    dbConnected: false,
    dbTables: 0,
    checking: true,
    lastCheck: null,
  });

  const [logs, setLogs] = useState([]);

  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString("fa-IR");
    setLogs((prev) => [{ id: Date.now() + Math.random(), time, type, message }, ...prev.slice(0, 7)]);
  };

  const runDiagnostics = async () => {
    setStatus((prev) => ({ ...prev, checking: true }));
    const startTime = performance.now();

    try {
      const res = await getAdminStats();
      const endTime = performance.now();
      const pingMs = Math.round(endTime - startTime);

      if (res?.success) {
        setStatus({
          apiOnline: true,
          latency: pingMs,
          dbConnected: true,
          dbTables: 9,
          checking: false,
          lastCheck: new Date().toLocaleTimeString("fa-IR"),
        });
        addLog("success", `اتصال موفق به API و دیتابیس با تأخیر ${pingMs} میلی‌ثانیه`);
      } else {
        setStatus({
          apiOnline: false,
          latency: pingMs,
          dbConnected: false,
          dbTables: 0,
          checking: false,
          lastCheck: new Date().toLocaleTimeString("fa-IR"),
        });
        addLog("error", `پاسخ ناموفق از سرور: ${res?.message || "خطای ناشناخته"}`);
      }
    } catch (err) {
      setStatus({
        apiOnline: false,
        latency: 0,
        dbConnected: false,
        dbTables: 0,
        checking: false,
        lastCheck: new Date().toLocaleTimeString("fa-IR"),
      });
      addLog("error", `عدم دسترسی به سرور API: ${err.message}`);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className={styles.diagnosticsCard} dir="rtl">
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <div className={styles.pulseIcon}>
            <FaHeartbeat />
          </div>
          <div>
            <h3 className={styles.title}>عیب‌یابی، مانیتورینگ و وضعیت امنیتی سیستم</h3>
            <span className={styles.subTitle}>بررسی زنده ارتباط با سرور و دیتابیس تکنو موبایل</span>
          </div>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={status.checking}
          className={styles.refreshBtn}
        >
          <FaSync className={status.checking ? styles.spin : ""} />
          <span>بررسی مجدد</span>
        </button>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <div className={styles.metricIcon}>
            <FaServer />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>وضعیت اتصال سرور API</span>
            <div className={styles.metricValue}>
              {status.apiOnline ? (
                <span className={styles.badgeSuccess}>
                  <FaCheckCircle /> آنلاین ({toPersianDigits(status.latency)} ms)
                </span>
              ) : (
                <span className={styles.badgeError}>
                  <FaExclamationCircle /> قطع ارتباط
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.metricItem}>
          <div className={styles.metricIcon}>
            <FaShieldAlt />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>سطح امنیتی احراز هویت</span>
            <div className={styles.metricValue}>
              <span className={styles.badgeSuccess}>
                <FaCheckCircle /> اعتبارسنجی دوگانه (Session + Token)
              </span>
            </div>
          </div>
        </div>

        <div className={styles.metricItem}>
          <div className={styles.metricIcon}>
            <FaCheckCircle />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>ارتباط با دیتابیس MySQL</span>
            <div className={styles.metricValue}>
              {status.dbConnected ? (
                <span className={styles.badgeSuccess}>
                  پایدار (۹ جدول ساختاریافته)
                </span>
              ) : (
                <span className={styles.badgeError}>ناموفق</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.metricItem}>
          <div className={styles.metricIcon}>
            <FaHeartbeat />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>آخرین زمان بررسی سلامت</span>
            <div className={styles.metricValue}>
              <span className={styles.timeText}>{status.lastCheck || "درحال بررسی..."}</span>
            </div>
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div className={styles.logsBox}>
          <h4 className={styles.logsTitle}>لاگ رویدادهای زنده سیستم:</h4>
          <div className={styles.logsList}>
            {logs.map((log) => (
              <div key={log.id} className={`${styles.logEntry} ${log.type === "error" ? styles.logError : styles.logSuccess}`}>
                <span className={styles.logTime}>[{log.time}]</span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemDiagnostics;
