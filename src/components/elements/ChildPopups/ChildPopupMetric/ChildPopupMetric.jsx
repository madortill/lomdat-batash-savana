import React, { useEffect, useState } from "react";
import styles from "./ChildPopupMetric.module.css";

import wheelLeft from "../../../../assets/img/wheelLeft.svg";
import wheelRight from "../../../../assets/img/wheelRight.svg";

const ChildPopupMetric = ({
    title,
    text,
    confirmText = "הבנתי!",
    onClose
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.scene} ${open ? styles.sceneOpen : ""}`}>
            <div className={styles.animationLayer}>
                <img src={wheelLeft} alt="" className={`${styles.wheelPart} ${styles.left}`} />
                <img src={wheelRight} alt="" className={`${styles.wheelPart} ${styles.right}`} />
            </div>

            <div className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
                <div className={styles.confirmBtn} onClick={onClose}>
                    {confirmText}
                </div>
            </div>
        </div>
    );
};

export default ChildPopupMetric;