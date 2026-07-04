import styles from "./TimerOtp.module.scss";

function TimerOtp({ time, restartTimer, reSendOTP }) {
  if (time > 0) {
    return <span className={styles.timer}>{time} ثانیه تا ارسال مجدد کد</span>;
  } else {
    return (
      <span
        className={`btn btn-link ${styles.restartTimer}`}
        onClick={() => {
          restartTimer();
          reSendOTP();
        }}
      >
        ارسال مجدد کد
      </span>
    );
  }
}

export default TimerOtp;
