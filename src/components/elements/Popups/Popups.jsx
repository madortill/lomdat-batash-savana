import React from "react";
import styles from "./Popups.module.css";

/**
 * Popups  (the shell / PopupShell)
 *
 * Responsibilities:
 *   ✓ dark backdrop overlay
 *   ✓ centered white box
 *   ✓ optional ✕ close button
 *   ✓ optional click-backdrop-to-close
 *   ✓ renders {children} — that's it
 *
 * It does NOT know about titles, icons, pages, tabs, buttons, or anything
 * content-related. All of that lives in the child component you pass in.
 *
 * Usage — simple (InfoCardPopup as child):
 *   <Popups onClose={close}>
 *     <InfoCardPopup data={data} onClose={close} />
 *   </Popups>
 *
 * Usage — complex (TabsPopup as child, no close button):
 *   <Popups onClose={close} showClose={false} closeOnBackdrop={false}>
 *     <TabsPopup data={data} onClose={close} />
 *   </Popups>
 *
 * Props:
 *   children         — the popup content (required)
 *   onClose          — called when user closes (required)
 *   showClose        — show ✕ button, default true
 *   closeOnBackdrop  — click backdrop to close, default true
 */
function Popups({ children, onClose, showClose = true, closeOnBackdrop = true }) {
  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.box}>

        {showClose && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="סגור"
          >
            ✕
          </button>
        )}

        {children}

      </div>
    </div>
  );
}

export default Popups;