import React from "react";
import styles from "./Loader.module.scss";

const Loader = ({ size = 40, color = "#3498db" }) => {
  const spinnerStyle = {
    width: size + "px",
    height: size + "px",
    borderTop: `4px solid ${color}`,
  };

  return <div className={styles.spinner} style={spinnerStyle}></div>;
};

export default Loader;
