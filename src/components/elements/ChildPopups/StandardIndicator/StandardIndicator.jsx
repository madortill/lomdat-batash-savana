import React from "react";
import styles from "./StandardIndicator.module.css";

/**
 * InfoCardPopup — Type 2
 *
 * The simple medium popup used for most indicator lights.
 * Has: icon image, title, text, one confirm button.
 * No internal state — purely driven by props from JSON data.
 *
 * Used inside <Popups>:
 *   <Popups onClose={close} showClose={false}>
 *     <InfoCardPopup data={lightData} onClose={close} />
 *   </Popups>
 *
 * Expected data shape (one entry from indicatorLights array):
 * {
 *   "id": "battery",
 *   "image": "battery",          ← key into imageMap in ContentIndicatorLights
 *   "popupType": "infoCard",
 *   "pages": [{
 *     "title": "נורת אזהרה למערכת הטעינה",
 *     "text": "כאשר נורה זו דולקת...",
 *     "confirmText": "הבנתי!"    ← optional, defaults to "הבנתי!"
 *   }]
 * }
 *
 * Props:
 *   icon      — the imported SVG/image for this light (passed from ContentIndicatorLights)
 *   title     — string
 *   text      — string
 *   confirmText — button label, default "הבנתי!"
 *   onClose   — called when user clicks confirm
 */
function StandardIndicator({ icon, title, text, confirmText = "הבנתי!", onClose }) {
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