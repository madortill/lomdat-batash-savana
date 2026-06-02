import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOBreakPractice.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import breakIntroImg from "../../../assets/img/breaksDrive.svg";
import breakPressedImg from "../../../assets/img/breaksPark.svg";

const BreakPractice = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();
    const [isPressed, setIsPressed] = useState(false);
    const [hasBeenPressed, setHasBeenPressed] = useState(false);

    if (!data || !data.general || !data.cBreak) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const Title = data.cBreakPractice[0].text;
    const Text = data.cBreakPractice[1].text;

    const handlePedalClick = () => {
        setIsPressed(!isPressed);
        setHasBeenPressed(true);
        if (!hasBeenPressed) {
            onComplete?.();
        }
    };

    const isNextEnabled = canProceed || hasBeenPressed;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{Title}</h1>
            <p className={`standard-text ${styles.text}`}>{Text}</p>

            <div className={styles.imgWrapper}>
                <img src={isPressed ? breakPressedImg : breakIntroImg} alt="breaks photo" className={styles.breakImg} />
                {!hasBeenPressed && (
                    <div className={styles.glowCircle} onClick={handlePedalClick}></div>
                )}
                {hasBeenPressed && (
                    <div
                        className={`${styles.pedalHitbox} ${isPressed ? styles.pedalHitboxPressed : styles.pedalHitboxReleased}`}
                        onClick={handlePedalClick}
                    ></div>
                )}
            </div>

            <div className={`${isNextEnabled ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={isNextEnabled ? onNext : undefined} >
                <p className={isNextEnabled ? "next-btn-text" : "next-btn-text-disabled"} >{nextBtn}</p>
            </div>
        </div>
    );
};

export default BreakPractice;