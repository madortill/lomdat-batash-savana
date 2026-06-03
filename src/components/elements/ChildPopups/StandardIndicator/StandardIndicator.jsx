import React from "react";
import styles from "./StandardIndicator.module.css";

const StandardIndicator = ({
    icon,
    title,
    text,
    confirmText = "הבנתי!",
    onClose,
    color,
    largeIcon = false
}) => {
    return (
        <div className={styles.container}>
            {icon && (
                <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.icon} ${largeIcon ? styles.largeIcon : ""}`}
                />
            )}

            <h2 className={styles.title} style={{ color }}>
                {title}
            </h2>

            <p className={styles.text}>
                {text}
            </p>

            <button className={styles.confirmBtn} onClick={onClose}>
                {confirmText}
            </button>
        </div>
    );
};

export default StandardIndicator;