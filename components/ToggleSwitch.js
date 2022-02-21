import React from "react";
import styles from "@/styles/ToggleSwitch.module.css";
import { useModeSwitch } from "@/context/ModeContext";

const ToggleSwitch = ({ label }) => {
  const [mode, setMode] = useModeSwitch();
  const handleChange = (event) => {
    setMode(event.target.checked);
  };
  return (
    <div className={styles.container}>
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={handleChange}
          checked={mode}
          name={label}
          id={label}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
