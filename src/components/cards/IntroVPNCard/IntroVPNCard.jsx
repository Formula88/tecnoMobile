import styles from "./IntroVPNCard.module.scss";

import React from "react";

function IntroVPNCard({ icon, text }) {
  return (
    <div className={styles.card}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default IntroVPNCard;
