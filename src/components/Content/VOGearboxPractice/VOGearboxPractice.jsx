import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOGearboxPractice.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import gearboxBg from "../../../assets/img/gearboxBg2.svg";
import worriedGal from "../../../assets/img/gal/worriedGalCut.svg";
import gearboxController from "../../../assets/img/gearboxController.svg";

const STORAGE_KEY = "VOGearboxPractice_done";
const TARGET_GEAR = 2;
const DEFAULT_GEAR = 5;
const MIN_GEAR = 1;
const MAX_GEAR = 6;

const GearboxPractice = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    if (!data?.general || !data?.cGearboxPractice) return null;

    const alreadyDone = sessionStorage.getItem(STORAGE_KEY) === "true";
    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const pageTitle = data.cGearboxPractice[0].text;
    const bubbleText = data.cGearboxPractice[1].text;

    const [gear, setGear] = useState(alreadyDone ? TARGET_GEAR : DEFAULT_GEAR);

    const changeGear = (delta) => {
        setGear(prev => {
            const next = prev + delta;
            if (next < MIN_GEAR || next > MAX_GEAR) return prev;
            if (next === TARGET_GEAR && !alreadyDone) {
                sessionStorage.setItem(STORAGE_KEY, "true");
                onComplete?.();
            }
            return next;
        });
    };

    const atTarget = gear === TARGET_GEAR;
    const atMin = gear === MIN_GEAR;
    const atMax = gear === MAX_GEAR;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{pageTitle}</h1>

            <div className={styles.imgDiv}>
                <img src={gearboxBg} alt="inside view of savanna car" className={styles.gearboxBg} />

                <div className={styles.characterWrapper}>
                    <img src={worriedGal} alt="גל הגלגל" className={styles.character} />
                </div>

                <div className={styles.speechBubble}>
                    <p className={styles.bubbleText}>{bubbleText}</p>
                </div>

                <div className={`${styles.hardwareController} ${atTarget ? styles.controllerSuccess : ""}`}>
                    <img src={gearboxController} alt="controller" className={styles.controllerImg} />

                    <button
                        className={`${styles.hwBtn} ${styles.plusBtn} ${atMax ? styles.btnDisabled : ""}`}
                        onClick={() => changeGear(1)}
                        disabled={atMax}
                        aria-label="העלה הילוך"
                    />

                    <button
                        className={`${styles.hwBtn} ${styles.minusBtn} ${atMin ? styles.btnDisabled : ""}`}
                        onClick={() => changeGear(-1)}
                        disabled={atMin}
                        aria-label="הוריד הילוך"
                    />

                    <div className={styles.hwDisplay}>
                        <span className={`${styles.gearNumber} ${atTarget ? styles.gearNumberSuccess : ""}`}>{gear}</span>
                    </div>
                </div>
            </div>

            <div className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={onNext}>
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default GearboxPractice;