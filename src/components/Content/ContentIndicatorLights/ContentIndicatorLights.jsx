import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIndicatorLights.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import Popup from "../../elements/Popups/Popups";

const STORAGE_KEY = "indicatorLights_progress";

// Import your indicator light icons
import batteryIcon from "../../../assets/img/indicatorLights/brake.svg";
import engineIcon from "../../../assets/img/indicatorLights/brake.svg";
import oilIcon from "../../../assets/img/indicatorLights/brake.svg";
import tempIcon from "../../../assets/img/indicatorLights/brake.svg";
// add more as needed...

const imageMap = {
  battery: batteryIcon,
  engine: engineIcon,
  oil: oilIcon,
  temp: tempIcon,
};

// Import popup info images if needed (optional per light)

import batteryInfo from "../../../assets/img/indicatorLights/brake.svg";
// import engineInfo  from "...";

// const infoImageMap = {
//     batteryInfo,
//     // engineInfo,
// };

const infoImageMap = {};

const ContentIndicatorLights = ({ onComplete, onNext, onBack, canProceed }) => {
  const { data } = useData();

  const backBtn = data.general[0].text;
  const nextBtn = data.general[1].text;
  const cIndicatorLightsTitle = data.cIndicatorLights[0].text;
  const cIndicatorLightsText = data.cIndicatorLights[1].text;
  const lights = data.indicatorLights;

  if (
    !data ||
    !data.general ||
    !data.cIndicatorLights ||
    !data.indicatorLights
  ) {
    return null;
  }

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
    if (index > completedCount) return;
    setPopupPage(0);
    setOpenPopup(index);
  };

  const handlePopupNext = () => {
    const light = lights[openPopup];
    const isLastPopupPage = popupPage === light.pages.length - 1;

    if (isLastPopupPage) {
      if (openPopup === completedCount) {
        const newCount = completedCount + 1;
        setCompletedCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      }

      setOpenPopup(null);
      setPopupPage(0);
    } else {
      setPopupPage((p) => p + 1);
    }
  };

  const handlePopupBack = () => {
    if (popupPage === 0) {
      // Close without completing — light stays glowing, no checkmark
      setOpenPopup(null);
    } else {
      setPopupPage((p) => p - 1);
    }
  };

  const currentPopupData = openPopup !== null ? lights[openPopup] : null;
  const currentPageData = currentPopupData?.pages[popupPage];
  const isLastPopupPage = currentPopupData
    ? popupPage === currentPopupData.pages.length - 1
    : false;

  return (
    <div className={styles.contentPage}>
      <div className="backBtnDiv">
        <img
          src={backButton}
          className="back-btn"
          onClick={onBack}
          alt="back"
        />
        <p className="back-btn-text">{backBtn}</p>
      </div>

      <h1 className="main-header-text">{cIndicatorLightsTitle}</h1>
      <p className={`standard-text ${styles.cIndicatorLightsText}`}>
        {cIndicatorLightsText}
      </p>

      {/* ── Lights grid ── */}
      <div className={styles.lightsGrid}>
        {lights &&
          lights.map((light, index) => {
            const isDone = index < completedCount;
            const isGlowing = index === completedCount;
            const isHidden = index > completedCount;

            return (
              <div
                key={light.id}
                className={`
                                ${styles.lightItem}
                                ${isDone ? styles.done : ""}
                                ${isGlowing ? styles.glowing : ""}
                                ${isHidden ? styles.hidden : ""}
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
      {openPopup !== null && currentPopupData && currentPageData && (
        <Popup
          isOpen={openPopup !== null}
          title={currentPageData.title}
          subtitle={currentPageData.subtitle}
          icon={imageMap[currentPopupData.image]}
          size={
            currentPageData.popupSize || currentPopupData.popupSize || "medium"
          }
          variant={
            currentPageData.variant || currentPopupData.variant || "default"
          }
          backText={currentPageData.backText || data.general[0].text}
          nextText={currentPageData.nextText || data.general[1].text}
          finishText={currentPageData.finishText || "סיום"}
          isLastPage={isLastPopupPage}
          showBackButton={currentPageData.showBackButton !== false}
          showNextButton={currentPageData.showNextButton !== false}
          showCloseButton={currentPageData.showCloseButton || false}
          nextDisabled={currentPageData.nextDisabled || false}
          onBack={handlePopupBack}
          onNext={handlePopupNext}
          onClose={handlePopupBack}
          footerNote={currentPageData.footerNote}
          footerImage={
            currentPageData.footerImage
              ? infoImageMap[currentPageData.footerImage]
              : null
          }
        >
          <p>{currentPageData.text}</p>

          {currentPageData.image && infoImageMap[currentPageData.image] && (
            <img
              src={infoImageMap[currentPageData.image]}
              alt=""
              className={styles.popupInfoImage}
            />
          )}
        </Popup>
      )}

      {/* ── Page next button ── */}
      <div
        className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${
          styles.nextBtn
        }`}
        onClick={onNext}
      >
        <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>
          {nextBtn}
        </p>
      </div>
    </div>
  );
};

export default ContentIndicatorLights;
