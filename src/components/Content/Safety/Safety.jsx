import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./Safety.module.css";
import blueCar from "../../../assets/img/blueCar.svg";
import Popups from "../../elements/Popups/Popups";
import SafetyCooling from "../../elements/ChildPopups/SafetyCooling/SafetyCooling";
import SafetyABS from "../../elements/ChildPopups/SafetyABS/SafetyABS";
import SafetyBattery from "../../elements/ChildPopups/SafetyBattery/SafetyBattery";
import backButton from "../../../assets/img/backBtn.svg";

const STORAGE_KEY = "safety_visited_cars";

const Safety = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();
    const [activePopup, setActivePopup] = useState(null);

    const [visitedPopups, setVisitedPopups] = useState(() => {
        const savedProgress = sessionStorage.getItem(STORAGE_KEY);
        return savedProgress ? JSON.parse(savedProgress) : {
            battery: false,
            abs: false,
            cooling: false
        };
    });

    if (!data || !data.general || !data.cSafety) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const mainTitle = data.cSafety[0]?.text ?? "";
    const subTitle = data.cSafety[1]?.text ?? "";
    const SafetyCoolingText = data.cSafety[2]?.text ?? "";
    const SafetyBatteryText = data.cSafety[3]?.text ?? "";
    const SafetyABSText = data.cSafety[4]?.text ?? "";

    const openPopup = (popupName) => {
        setActivePopup(popupName);
        setVisitedPopups(prev => {
            const updated = { ...prev, [popupName]: true };

            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            if (updated.battery && updated.abs && updated.cooling) {
                onComplete?.();
            }
            return updated;
        });
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const allVisited = visitedPopups.battery && visitedPopups.abs && visitedPopups.cooling;
    const isNextEnabled = canProceed || allVisited;

    return (
        <>
            <div className={styles.page}>

                <div className="backBtnDiv">
                    <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                    <p className="back-btn-text">{backBtn}</p>
                </div>

                <h1 className="main-header-text">{mainTitle}</h1>
                <p className={`standard-text ${styles.subText}`}>{subTitle}</p>

                <div className={styles.roadWrapper}>

                    <div className={styles.warningSign}>
                        <div className={styles.triangle}>
                            <span className={styles.exclamation}>!</span>
                        </div>
                        <div className={styles.pole}></div>
                    </div>

                    <div className={styles.carsRow}>

                        <button
                            className={`${styles.carBtn} ${visitedPopups.battery ? styles.visited : ""}`}
                            onClick={() => openPopup("battery")}
                        >
                            {visitedPopups.battery && <div className={styles.checkmark}>✓</div>}
                            <img src={blueCar} alt="מצברי הרכב" />
                            <span>{SafetyBatteryText}</span>
                        </button>

                        <button
                            className={`${styles.carBtn} ${visitedPopups.abs ? styles.visited : ""}`}
                            onClick={() => openPopup("abs")}
                        >
                            {visitedPopups.abs && <div className={styles.checkmark}>✓</div>}
                            <img src={blueCar} alt="מערכת ABS" />
                            <span>{SafetyABSText}</span>
                        </button>

                        <button
                            className={`${styles.carBtn} ${visitedPopups.cooling ? styles.visited : ""}`}
                            onClick={() => openPopup("cooling")}
                        >
                            {visitedPopups.cooling && <div className={styles.checkmark}>✓</div>}
                            <img src={blueCar} alt="מערכת הקירור" />
                            <span>{SafetyCoolingText}</span>
                        </button>
                    </div>

                    <div className={styles.road} />
                </div>

                <div
                    className={`${isNextEnabled ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                    onClick={isNextEnabled ? onNext : undefined}
                >
                    <p className={isNextEnabled ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
                </div>
            </div>

            {activePopup === "cooling" && (
                <Popups onClose={closePopup} showClose={false} closeOnBackdrop={false} className={styles.redShadowPopup}>
                    <SafetyCooling onClose={closePopup} />
                </Popups>
            )}

            {activePopup === "abs" && (
                <Popups onClose={closePopup} showClose={false} closeOnBackdrop={false} className={styles.redShadowPopup}>
                    <SafetyABS onClose={closePopup} />
                </Popups>
            )}

            {activePopup === "battery" && (
                <Popups onClose={closePopup} showClose={false} closeOnBackdrop={false} className={styles.redShadowPopup}>
                    <SafetyBattery onClose={closePopup} />
                </Popups>
            )}
        </>
    );
};

export default Safety;