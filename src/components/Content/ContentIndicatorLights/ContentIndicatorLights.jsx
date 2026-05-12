import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIndicatorLights.module.css";
import backButton from "../../../assets/img/backBtn.svg";

const STORAGE_KEY = "indicatorLights_progress";

/**
 * SEQUENCE LOGIC
 * --------------
 * - Only the NEXT unseen light glows (pulses). All previous are done (checkmark). All future are hidden.
 * - User clicks the glowing light → popup opens.
 * - Popup may have 1 or 2 pages. User must reach the last page and press "סיום" to close.
 * - On close: that light gets a checkmark, the next light starts glowing.
 * - onComplete() fires when all lights are done.
 *
 * DATA SHAPE (data.json):
 * "indicatorLights": [
 *   {
 *     "id": "battery",
 *     "image": "battery",          ← key into imageMap
 *     "pages": [
 *       { "title": "...", "text": "...", "image": "batteryInfo1" },   ← optional image key
 *       { "title": "...", "text": "..." }                              ← second page (optional)
 *     ]
 *   },
 *   ...
 * ]
 */

// Import your indicator light icons
import batteryIcon   from "../../../assets/img/indicatorLights/battery.svg";
import engineIcon    from "../../../assets/img/indicatorLights/engine.svg";
import oilIcon       from "../../../assets/img/indicatorLights/oil.svg";
import tempIcon      from "../../../assets/img/indicatorLights/temp.svg";
// add more as needed...

const imageMap = {
    battery: batteryIcon,
    engine:  engineIcon,
    oil:     oilIcon,
    temp:    tempIcon,
};

// Import popup info images if needed (optional per light)
import batteryInfo from "../../../assets/img/indicatorLights/info/batteryInfo.svg";
// import engineInfo  from "...";

const infoImageMap = {
    batteryInfo,
    // engineInfo,
};

const ContentIndicatorLights = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const pageTitle = data.cIndicatorLights[0].text;
    const pageText  = data.cIndicatorLights[1].text;
    const lights    = data.indicatorLights; // array of light objects

    // How many lights the user has fully completed
    const [completedCount, setCompletedCount] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    });

    // Which light's popup is currently open (index), or null
    const [openPopup, setOpenPopup] = useState(null);

    // Which page inside the popup (0 or 1)
    const [popupPage, setPopupPage] = useState(0);

    const allDone = completedCount === lights?.length;

    useEffect(() => {
        if (allDone) onComplete();
    }, [completedCount]);

    const handleLightClick = (index) => {
        // Only the current "active" light (= completedCount index) is clickable
        if (index !== completedCount) return;
        setPopupPage(0);
        setOpenPopup(index);
    };

    const handlePopupNext = () => {
        const light = lights[openPopup];
        const isLastPopupPage = popupPage === light.pages.length - 1;

        if (isLastPopupPage) {
            // User finished this light — close popup, advance
            const newCount = completedCount + 1;
            setCompletedCount(newCount);
            localStorage.setItem(STORAGE_KEY, newCount.toString());
            setOpenPopup(null);
            setPopupPage(0);
        } else {
            setPopupPage(p => p + 1);
        }
    };

    const handlePopupBack = () => {
        if (popupPage === 0) {
            // Close without completing — light stays glowing, no checkmark
            setOpenPopup(null);
        } else {
            setPopupPage(p => p - 1);
        }
    };

    const currentPopupData = openPopup !== null ? lights[openPopup] : null;
    const currentPageData  = currentPopupData?.pages[popupPage];
    const isLastPopupPage  = currentPopupData
        ? popupPage === currentPopupData.pages.length - 1
        : false;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{pageTitle}</h1>
            <p className={`standard-text ${styles.pageText}`}>{pageText}</p>

            {/* ── Lights grid ── */}
            <div className={styles.lightsGrid}>
                {lights && lights.map((light, index) => {
                    const isDone    = index < completedCount;
                    const isGlowing = index === completedCount;
                    const isHidden  = index > completedCount;

                    return (
                        <div
                            key={light.id}
                            className={`
                                ${styles.lightItem}
                                ${isDone    ? styles.done    : ""}
                                ${isGlowing ? styles.glowing : ""}
                                ${isHidden  ? styles.hidden  : ""}
                            `}
                            onClick={() => handleLightClick(index)}
                        >
                            <div className={styles.lightIconWrapper}>
                                <img
                                    src={imageMap[light.image]}
                                    alt={light.id}
                                    className={styles.lightIcon}
                                />
                                {/* Glow ring — CSS animation, only visible when isGlowing */}
                                {isGlowing && <div className={styles.glowRing} />}
                                {/* Checkmark badge */}
                                {isDone && (
                                    <div className={styles.checkmarkWrapper}>
                                        <span className={styles.checkmarkIcon}>✓</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Popup overlay ── */}
            {openPopup !== null && currentPopupData && (
                <div className={styles.popupOverlay} onClick={handlePopupBack}>
                    <div
                        className={styles.popup}
                        onClick={e => e.stopPropagation()} // prevent overlay click closing popup
                    >
                        {/* Popup header */}
                        <div className={styles.popupHeader}>
                            <img
                                src={imageMap[currentPopupData.image]}
                                alt={currentPopupData.id}
                                className={styles.popupLightIcon}
                            />
                            <h2 className={styles.popupTitle}>{currentPageData.title}</h2>
                        </div>

                        {/* Popup content */}
                        <p className={`standard-text ${styles.popupText}`}>
                            {currentPageData.text}
                        </p>

                        {/* Optional info image */}
                        {currentPageData.image && infoImageMap[currentPageData.image] && (
                            <img
                                src={infoImageMap[currentPageData.image]}
                                alt=""
                                className={styles.popupInfoImage}
                            />
                        )}

                        {/* Page dots — only shown for multi-page popups */}
                        {currentPopupData.pages.length > 1 && (
                            <div className={styles.popupDots}>
                                {currentPopupData.pages.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`${styles.dot} ${i === popupPage ? styles.activeDot : ""}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Popup navigation */}
                        <div className={styles.popupButtons}>
                            <div className={styles.popupBackBtn} onClick={handlePopupBack}>
                                <p>{data.general[0].text}</p>
                            </div>
                            <div className="next-btn" onClick={handlePopupNext}>
                                <p className="next-btn-text">
                                    {isLastPopupPage ? "סיום" : data.general[1].text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Page next button ── */}
            <div
                className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={onNext}
            >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentIndicatorLights;