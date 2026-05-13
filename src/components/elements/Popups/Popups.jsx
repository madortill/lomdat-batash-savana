import styles from "./Popups.module.css";

const Popup = ({
    isOpen,
    title,
    subtitle,
    icon,
    children,

    size = "medium",
    variant = "default",

    backText = "חזרה",
    nextText = "המשך",
    finishText = "סיום",

    showBackButton = true,
    showNextButton = true,
    showCloseButton = false,

    isLastPage = false,
    nextDisabled = false,

    onBack,
    onNext,
    onClose,

    footerNote,
    footerImage,
}) => {
    if (!isOpen) return null;

    const sizeClass = styles[`popup_${size}`] || styles.popup_medium;
    const variantClass = styles[`variant_${variant}`] || styles.variant_default;

    const handleOverlayClick = () => {
        if (onClose) {
            onClose();
        } else if (onBack) {
            onBack();
        }
    };

    return (
        <div className={styles.popupOverlay} onClick={handleOverlayClick}>
            <div
                className={`${styles.popup} ${sizeClass} ${variantClass}`}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                {showCloseButton && (
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose || onBack}
                        aria-label="סגירה"
                    >
                        ×
                    </button>
                )}

                {(icon || title || subtitle) && (
                    <div className={styles.header}>
                        {icon && (
                            <img
                                src={icon}
                                alt=""
                                className={styles.icon}
                            />
                        )}

                        {title && (
                            <h2 className={styles.title}>
                                {title}
                            </h2>
                        )}

                        {subtitle && (
                            <p className={styles.subtitle}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className={styles.content}>
                    {children}
                </div>

                {(footerNote || footerImage) && (
                    <div className={styles.footerNote}>
                        {footerImage && (
                            <img
                                src={footerImage}
                                alt=""
                                className={styles.footerImage}
                            />
                        )}
                        {footerNote && <p>{footerNote}</p>}
                    </div>
                )}

                {(showBackButton || showNextButton) && (
                    <div className={styles.buttons}>
                        {showBackButton && (
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={onBack}
                            >
                                {backText}
                            </button>
                        )}

                        {showNextButton && (
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={onNext}
                                disabled={nextDisabled}
                            >
                                {isLastPage ? finishText : nextText}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Popup;