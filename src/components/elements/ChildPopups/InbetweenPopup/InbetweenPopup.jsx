import React from "react";
import styles from "./InbetweenPopup.module.css";
import gal from "../../../../assets/img/gal/HappyGal.svg";

const InbetweenPopup = ({ text, confirmText = "הבנתי!", onClose }) => {
    return (
        <div className={styles.container} dir="rtl">
            <div className={styles.speechBubble}>
                <p className={styles.bubbleText} dangerouslySetInnerHTML={{ __html: text }} />
            </div>

            <img src={gal} alt="" aria-hidden="true" className={styles.gal} draggable={false} />

            <div type="button" className={styles.confirmBtn} onClick={onClose}>
                {confirmText}
            </div>
        </div>
    );
};

export default InbetweenPopup;