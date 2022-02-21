import React from "react";
import { FaHandHolding, FaHandHoldingHeart } from "react-icons/fa";
import styles from "@/styles/HandHoldingIcon.module.css";

function HandHoldingIcon({ mode, askFilled, giveFilled }) {
  return (
    <span className={styles.icon}>
      {mode ? (
        <FaHandHolding
          size="1.5em"
          style={{ fill: `${askFilled ? "green" : "black"}` }}
        />
      ) : (
        <FaHandHoldingHeart
          size="1.5em"
          style={{ fill: `${giveFilled ? "green" : "black"}` }}
        />
      )}
    </span>
  );
}

export default HandHoldingIcon;
