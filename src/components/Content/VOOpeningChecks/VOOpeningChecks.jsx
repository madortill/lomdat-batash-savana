import { useEffect, useState, useRef } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOOpeningChecks.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import yellowSavanna from "../../../assets/img/simulationSavannaHappyGal.svg";

const SEEN_KEY = "VOOpeningChecks_seen";

const OpeningChecks = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const alreadySeen = sessionStorage.getItem(SEEN_KEY) === "true";

    const [displayedText, setDisplayedText] = useState(
        alreadySeen ? (data?.cVOOpeningChecks?.[1]?.text ?? "") : ""
    );

    const [bubbleVisible, setBubbleVisible] = useState(alreadySeen);
    const [carDroveIn, setCarDroveIn] = useState(alreadySeen);
    const typewriterRef = useRef(null);

    if (!data || !data.general || !data.cVOOpeningChecks) return null;


    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const vehicleOperationTitle = data.cVOOpeningChecks[0].text;
    const vehicleOperationBubbleText = data.cVOOpeningChecks[1].text;

    const handleCarAnimationEnd = () => {
        setCarDroveIn(true);
    };

    useEffect(() => {
        if (!carDroveIn) return;
        if (alreadySeen) return;
        const bubbleDelay = setTimeout(() => {
            setBubbleVisible(true);
            let index = 0;
            typewriterRef.current = setInterval(() => {
                index++;
                setDisplayedText(vehicleOperationBubbleText.slice(0, index));
                if (index >= vehicleOperationBubbleText.length) {
                    clearInterval(typewriterRef.current);
                    sessionStorage.setItem(SEEN_KEY, "true");
                    onComplete?.();
                }
            }, 40);
        }, 400);
        return () => {
            clearTimeout(bubbleDelay);
            clearInterval(typewriterRef.current);
        };
    }, [carDroveIn]);

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{vehicleOperationTitle}</h1>

            <div className={`${styles.textBox} ${bubbleVisible ? styles.textBoxVisible : ""}`}>
                <p className={`standard-text ${styles.bubbleText}`}>
                    {displayedText}
                    {!alreadySeen && displayedText.length < vehicleOperationBubbleText.length && bubbleVisible && (
                        <span className={styles.cursor} aria-hidden="true">|</span>
                    )}
                </p>
            </div>

            <div className={styles.gravelRoad}></div>
            <img src={yellowSavanna} alt="yellow Savanna" className={` ${styles.yellowSavanna} ${!alreadySeen ? styles.carDriveIn : ""} `} onAnimationEnd={handleCarAnimationEnd} />

            <div className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={onNext} >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"} >{nextBtn}</p>
            </div>
        </div>
    );
};

export default OpeningChecks;