import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIndicatorLights.module.css";
import backButton from "../../../assets/img/backBtn.svg";

import Popups from "../../elements/Popups/Popups";
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
import bothBrakesIcons from "../../../assets/img/indicatorLights/bothBreaksIconInside.svg";

// ── brakes popup ──
import frontBrakes from "../../../assets/img/indicatorLights/frontBrakes.svg";
import backBrakes from "../../../assets/img/indicatorLights/backBrakes.svg";
import brakeBgImg from "../../../assets/img/brakeBgImg.svg";
import brakeFluid from "../../../assets/img/brakeFluid.svg";
import workshopBgImg from "../../../assets/img/workshopBgImg.svg";
import gal from "../../../assets/img/gal/NeutralGal.svg";
import brakesPark from "../../../assets/img/workshopBgImg.svg";

// ── urea liquid popup ──
import adBlueFull from "../../../assets/img/adBlueFull.svg";
import adBlueEmpty from "../../../assets/img/adBlueEmpty.svg";
import adBlueOpening from "../../../assets/img/adBlueOpening.svg";


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

const indicatorColorMap = {
  brake: "#c0392b",
  ignition: "#E69907",
  oil: "#c0392b",
  abs: "#E69907",
  airbag: "#c0392b",
  backLight: "#E69907",
  battery: "#c0392b",
  turn: "#61A747",
  seatbelt: "#c0392b",
  strongLights: "#073799",
  adBlue: "#073799",
  bothBrakes: "#c0392b",
};

const popupImageMap = {
  bothBrakes: bothBrakesIcons,
};

const popupImageMap2 = {
  frontBrakes,
  backBrakes,
  brakeBgImg,
  brakeFluid,
  workshopBgImg,
  gal,
  brakesPark,
};

const adBlueImageMap = {
  adBlueFull,
  adBlueEmpty,
  adBlueOpening,
};

const STORAGE_KEY = "indicatorLights_progress";

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

  const [completedCount, setCompletedCount] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [openIndex, setOpenIndex] = useState(null);

  const allDone = completedCount >= lights.length;

  useEffect(() => {
    if (allDone) onComplete?.();
  }, [completedCount]);

  const handleLightClick = (index) => {
    if (index > completedCount) return;
    setOpenIndex(index);
  };

  const handlePopupClose = () => {
    if (openIndex === completedCount) {
      const newCount = completedCount + 1;
      setCompletedCount(newCount);
      sessionStorage.setItem(STORAGE_KEY, newCount.toString());
    }
    setOpenIndex(null);
  };

  const handlePopupDismiss = () => {
    setOpenIndex(null);
  };

  const currentLight = openIndex !== null ? lights[openIndex] : null;

  return (
    <div className={styles.contentPage}>

      <div className="backBtnDiv">
        <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
        <p className="back-btn-text">{backBtn}</p>
      </div>

      <h1 className="main-header-text">{title}</h1>
      <p className={`standard-text ${styles.cIndicatorLightsText}`}>{subtitle}</p>

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
                onDismiss={handlePopupDismiss}
                imageMap={popupImageMap2}
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
                onDismiss={handlePopupDismiss}
                imageMap={adBlueImageMap}
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
              icon={popupImageMap[currentLight.id] ?? imageMap[currentLight.image]}
              title={currentLight.pages?.[0]?.title}
              text={currentLight.pages?.[0]?.text}
              confirmText={currentLight.pages?.[0]?.confirmText ?? "הבנתי!"}
              color={indicatorColorMap[currentLight.id]}
              largeIcon={currentLight.id === "bothBrakes"}
              onClose={handlePopupClose}
            />
          </Popups>
        );
      })()}

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