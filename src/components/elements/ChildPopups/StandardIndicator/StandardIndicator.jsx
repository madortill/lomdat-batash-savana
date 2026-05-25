import React from "react";
import styles from "./StandardIndicator.module.css";

const StandardIndicator = ({ icon, title, text, confirmText = "הבנתי!", onClose }) => {
    return (
        <div className={styles.container}>
            {icon && (
                <img src={icon} alt="" aria-hidden="true" className={styles.icon} />
            )}
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <button className={styles.confirmBtn} onClick={onClose}>
                {confirmText}
            </button>

        </div>
    );
}

export default StandardIndicator;