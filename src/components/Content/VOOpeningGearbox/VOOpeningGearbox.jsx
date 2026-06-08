import { useEffect, useState, useRef } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOOpeningGearbox.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import yellowSavanna from "../../../assets/img/simulationSavannaHappyGal.svg";

const SEEN_KEY = "VOOpeningGearbox_seen";
const NEXT_ANIMATION_KEY = "VOOpeningGearbox_next_animation_seen";

const OpeningGearbox = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    if (!data?.general || !data?.cVOOpeningGearbox) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const vehicleOperationTitle = data.cVOOpeningGearbox[0].text;
    const vehicleOperationBubbleText = data.cVOOpeningGearbox[1].text;

    const alreadySeen = sessionStorage.getItem(SEEN_KEY) === "true";

    const [displayedText, setDisplayedText] = useState(
        alreadySeen ? vehicleOperationBubbleText : ""
    );

    const [bubbleVisible, setBubbleVisible] = useState(alreadySeen);
    const [carReady, setCarReady] = useState(alreadySeen);
    const [zoomOut, setZoomOut] = useState(false);
    const [isTextDone, setIsTextDone] = useState(alreadySeen);

    const typewriterRef = useRef(null);

    useEffect(() => {
        setCarReady(true);
    }, []);

    useEffect(() => {
        if (!carReady || alreadySeen) return;

        const bubbleDelay = setTimeout(() => {
            setBubbleVisible(true);

            let index = 0;

            typewriterRef.current = setInterval(() => {
                index++;

                setDisplayedText(vehicleOperationBubbleText.slice(0, index));

                if (index >= vehicleOperationBubbleText.length) {
                    clearInterval(typewriterRef.current);
                    sessionStorage.setItem(SEEN_KEY, "true");
                    setIsTextDone(true);
                    onComplete?.();
                }
            }, 40);
        }, 400);

        return () => {
            clearTimeout(bubbleDelay);
            clearInterval(typewriterRef.current);
        };
    }, [carReady, alreadySeen, vehicleOperationBubbleText, onComplete]);

    const handleNext = () => {
        if (!canProceed || !isTextDone || zoomOut) return;

        const nextAnimationAlreadySeen =
            sessionStorage.getItem(NEXT_ANIMATION_KEY) === "true";

        if (nextAnimationAlreadySeen) {
            onNext?.();
            return;
        }

        sessionStorage.setItem(NEXT_ANIMATION_KEY, "true");
        setZoomOut(true);

        setTimeout(() => {
            onNext?.();
        }, 1400);
    };

    const isNextEnabled = canProceed && isTextDone;

    return (
        <div className={`${styles.contentPage} ${zoomOut ? styles.pageFade : ""}`}>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={onBack}
                    alt="חזרה"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{vehicleOperationTitle}</h1>

            <div className={`${styles.textBox} ${bubbleVisible ? styles.textBoxVisible : ""}`}>
                <p className={`standard-text ${styles.bubbleText}`}>
                    {displayedText}

                    {!alreadySeen &&
                        displayedText.length < vehicleOperationBubbleText.length &&
                        bubbleVisible && (
                            <span className={styles.cursor} aria-hidden="true">
                                |
                            </span>
                        )}
                </p>
            </div>

            <div className={styles.zoomScene}>
                <div className={`${styles.zoomTarget} ${zoomOut ? styles.zoomIntoWindow : ""}`}>
                    <img
                        src={yellowSavanna}
                        alt="yellow Savanna"
                        className={styles.yellowSavanna}
                    />
                </div>
            </div>

            <div className={styles.gravelRoad}></div>

            <div
                className={`${isNextEnabled ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={handleNext}
            >
                <p className={isNextEnabled ? "next-btn-text" : "next-btn-text-disabled"}>
                    {nextBtn}
                </p>
            </div>
        </div>
    );
};

export default OpeningGearbox;