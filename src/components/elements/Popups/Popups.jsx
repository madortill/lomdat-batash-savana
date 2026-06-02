import React from "react";
import styles from "./Popups.module.css";

const Popups = ({ children, onClose, showClose = true, closeOnBackdrop = true, isTransparent = false, className = "" }) => {
  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const boxClass = `${styles.box} ${isTransparent ? styles.transparentBox : ""} ${className}`;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={boxClass}>
        {showClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="סגור">✕</button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Popups;