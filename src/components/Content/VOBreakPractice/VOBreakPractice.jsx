import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOBreakPractice.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import breakIntroImg from "../../../assets/img/breaksDrive.svg";
import breakPressedImg from "../../../assets/img/breaksPark.svg";
import Popups from "../../elements/Popups/Popups";
import InbetweenPopup from "../../elements/ChildPopups/InbetweenPopup/InbetweenPopup";

const BreakPractice = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();
    const [isPressed, setIsPressed] = useState(false);
    const [hasBeenPressed, setHasBeenPressed] = useState(false);
    const [showInbetweenPopup, setShowInbetweenPopup] = useState(false);

    if (!data || !data.general || !data.cBreakPractice) return null;

    const [backBtn, nextBtn, Title, Text] = [data.general[0].text, data.general[1].text, data.cBreakPractice[0].text, data.cBreakPractice[1].text];
    const popupData = data.inbetweenPopups?.beforeSafety;
    const isNextEnabled = canProceed || hasBeenPressed;

    const handlePedalClick = () => {
        setIsPressed(p => !p);
        if (!hasBeenPressed) { setHasBeenPressed(true); onComplete?.(); }
    };

    const handlePopupClose = () => { setShowInbetweenPopup(false); onNext?.(); };

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{Title}</h1>
            <p className={`standard-text ${styles.text}`}>{Text}</p>

            <div className={styles.imgWrapper}>
                <img src={isPressed ? breakPressedImg : breakIntroImg} alt="breaks photo" className={styles.breakImg} />
                {!hasBeenPressed ? <div className={styles.glowCircle} onClick={handlePedalClick} /> : (
                    <div className={`${styles.pedalHitbox} ${isPressed ? styles.pedalHitboxPressed : styles.pedalHitboxReleased}`} onClick={handlePedalClick} />
                )}
            </div>

            <div className={`${isNextEnabled ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={() => isNextEnabled && setShowInbetweenPopup(true)}>
                <p className={isNextEnabled ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>

            {showInbetweenPopup && popupData && (
                <Popups onClose={() => setShowInbetweenPopup(false)} showClose={false} closeOnBackdrop={false}>
                    <InbetweenPopup text={popupData.text} confirmText={popupData.buttonText} onClose={handlePopupClose} />
                </Popups>
            )}
        </div>
    );
};

export default BreakPractice;