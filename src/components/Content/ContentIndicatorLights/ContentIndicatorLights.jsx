import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIndicatorLights.module.css";
import backButton from "../../../assets/img/backBtn.svg";

// ── The shell ──
import Popups from "../../elements/Popups/Popups";

// ── The three popup child components ──
import AdBluePopup from "../../elements/ChildPopups/ChildPopupAdBlue/ChildPopupAdBlue";
import ChildPopupTab from "../../elements/ChildPopups/ChildPopupTab/ChildPopupTab";
import StandardIndicator from "../../elements/ChildPopups/StandardIndicator/StandardIndicator";

// ── Image map ──
import brakeIcon from "../../../assets/img/indicatorLights/brake.svg";
import ignitionIcon from "../../../assets/img/indicatorLights/coldIgnition.svg";
import oilIcon from "../../../assets/img/indicatorLights/oil.svg";
import absIcon from "../../../assets/img/indicatorLights/abs.svg";
import airbag from "../../../assets/img/indicatorLights/airbag.svg";
import backLight from "../../../assets/img/indicatorLights/backLight.svg";
import battery from "../../../assets/img/indicatorLights/battery.svg";
import turn from "../../../assets/img/indicatorLights/turn.svg";
import seatbelt from "../../../assets/img/indicatorLights/seatbelt.svg";
import strongLights from "../../../assets/img/indicatorLights/strongLights.svg";
import adBlue from "../../../assets/img/indicatorLights/adBlue.svg";
import bothBrakes from "../../../assets/img/indicatorLights/bothBrakes.svg";

const imageMap = {
  brake: brakeIcon,
  ignition: ignitionIcon,
  oil: oilIcon,
  abs: absIcon,
  airbag,
  backLight,
  battery,
  turn,
  seatbelt,
  strongLights,
  adBlue,
  bothBrakes,
};

const STORAGE_KEY = "indicatorLights_progress";

// ─────────────────────────────────────────────────────────────────
//  POPUP TYPE ROUTING — decided by "popupType" in the JSON:
//
//  "infoCard"  → <AdBluePopup>           simple: icon + title + text + button
//  "tabs"      → <ChildPopupTab>         must visit all tabs before closing
//  "timeline"  → <ChildPopupTimeline>    must visit all steps before closing
// ─────────────────────────────────────────────────────────────────

const ContentIndicatorLights = ({ onComplete, onNext, onBack, canProceed }) => {
  const { data } = useData();

  if (!data?.general || !data?.cIndicatorLights || !data?.indicatorLights) {
    return null;
  }

  const backBtn = data.general[0].text;
  const nextBtn = data.general[1].text;
  const title = data.cIndicatorLights[0].text;
  const subtitle = data.cIndicatorLights[1].text;
  const lights = data.indicatorLights;

  // ── progress ─────────────────────────────────────────────────
  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [openIndex, setOpenIndex] = useState(null);

  const allDone = completedCount >= lights.length;

  useEffect(() => {
    if (allDone) onComplete?.();
  }, [completedCount]);

  // ── handlers ─────────────────────────────────────────────────
  const handleLightClick = (index) => {
    if (index > completedCount) return;
    setOpenIndex(index);
  };

  // called by child popup when user fully completes it → advances progress
  const handlePopupClose = () => {
    if (openIndex === completedCount) {
      const newCount = completedCount + 1;
      setCompletedCount(newCount);
      localStorage.setItem(STORAGE_KEY, newCount.toString());
    }
    setOpenIndex(null);
  };

  // called by X button or backdrop click → dismisses without advancing
  const handlePopupDismiss = () => {
    setOpenIndex(null);
  };

  const currentLight = openIndex !== null ? lights[openIndex] : null;

  // ── render ───────────────────────────────────────────────────
  return (
    <div className={styles.contentPage}>

      {/* Back button */}
      <div className="backBtnDiv">
        <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
        <p className="back-btn-text">{backBtn}</p>
      </div>

      <h1 className="main-header-text">{title}</h1>
      <p className={`standard-text ${styles.cIndicatorLightsText}`}>{subtitle}</p>

      {/* ── Lights grid — your original CSS classes are used here ── */}
      <div className={styles.lightsGrid}>
        {lights.map((light, index) => {
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
                {isGlowing && <div className={styles.glowRing} />}
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

      {/* ── Popup — routes to the right child based on popupType ── */}
      {currentLight && (() => {
        const type = currentLight.popupType;

        if (type === "tabs") {
          return (
            <Popups
              onClose={handlePopupDismiss}
              showClose={false}
              closeOnBackdrop={false}
            >
              <ChildPopupTab
                icon={imageMap[currentLight.image]}
                data={currentLight}
                onClose={handlePopupClose}
              />
            </Popups>
          );
        }

        if (type === "timeline") {
          return (
            <Popups
              onClose={handlePopupDismiss}
              showClose={false}
              closeOnBackdrop={false}
            >
              <AdBluePopup
                icon={imageMap[currentLight.image]}
                data={currentLight}
                onClose={handlePopupClose}
              />
            </Popups>
          );
        }

        return (
          <Popups
            onClose={handlePopupDismiss}
            showClose={false}
            closeOnBackdrop={false}
          >
            <StandardIndicator
              icon={imageMap[currentLight.image]}
              title={currentLight.pages?.[0]?.title}
              text={currentLight.pages?.[0]?.text}
              confirmText={currentLight.pages?.[0]?.confirmText ?? "הבנתי!"}
              onClose={handlePopupClose}
            />
          </Popups>
        );
      })()}

      {/* ── Page next button ── */}
      <div
        className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
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