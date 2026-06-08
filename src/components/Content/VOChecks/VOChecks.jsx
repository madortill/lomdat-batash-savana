import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOChecks.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import yellowSavanna from "../../../assets/img/simulationSavannaHappyGal.svg";

const SEEN_KEY = "VOChecks_seen";
const NEXT_ANIMATION_KEY = "VOChecks_next_animation_seen";

const DOT_POSITIONS = [
    { index: 0, x: 28, y: 43 },
    { index: 1, x: 18, y: 40 },
    { index: 2, x: 82, y: 82 },
    { index: 3, x: 7, y: 55 },
    { index: 4, x: 14, y: 50 },
    { index: 5, x: 10, y: 45 },
    { index: 6, x: 10, y: 22 },
];

const Checks = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    if (!data?.general || !data?.cVOChecks) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const checksTitle = data.cVOChecks[0].text;
    const checksText = data.cVOChecks[1].text;
    const checks = data.cVOChecks[2].items;

    const alreadySeen = sessionStorage.getItem(SEEN_KEY) === "true";

    const [carGrown, setCarGrown] = useState(alreadySeen);
    const [dotsVisible, setDotsVisible] = useState(alreadySeen);
    const [carShrinking, setCarShrinking] = useState(false);

    const [completed, setCompleted] = useState(() =>
        alreadySeen ? new Set(checks.map((_, i) => i)) : new Set()
    );

    const [activeDot, setActiveDot] = useState(null);

    useEffect(() => {
        if (alreadySeen) return;

        const t = setTimeout(() => setCarGrown(true), 300);
        return () => clearTimeout(t);
    }, [alreadySeen]);

    useEffect(() => {
        if (!carGrown || alreadySeen) return;

        const t = setTimeout(() => setDotsVisible(true), 700);
        return () => clearTimeout(t);
    }, [carGrown, alreadySeen]);

    const handleDotClick = (index) => {
        if (carShrinking) return;

        setActiveDot(index);

        setCompleted((prev) => {
            const next = new Set([...prev, index]);

            if (next.size === checks.length) {
                sessionStorage.setItem(SEEN_KEY, "true");
                onComplete?.();
            }

            return next;
        });
    };

    const handleNextClick = () => {
        if (!canProceed || carShrinking) return;

        const nextAnimationAlreadySeen =
            sessionStorage.getItem(NEXT_ANIMATION_KEY) === "true";

        if (nextAnimationAlreadySeen) {
            onNext?.();
            return;
        }

        sessionStorage.setItem(NEXT_ANIMATION_KEY, "true");
        setDotsVisible(false);
        setCarShrinking(true);

        setTimeout(() => {
            onNext?.();
        }, 700);
    };

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

            <h1 className="main-header-text">{checksTitle}</h1>

            <p className={`standard-text ${styles.checksText}`}>
                {checksText}
            </p>

            <div className={`${styles.checklist} ${dotsVisible ? styles.checklistVisible : ""}`}>
                {checks.map((check, index) => (
                    <div key={index} className={styles.checkItem}>
                        <div className={`${styles.checkbox} ${completed.has(index) ? styles.checkboxDone : ""}`}>
                            {completed.has(index) && (
                                <span className={styles.checkmark}>✓</span>
                            )}
                        </div>

                        <span className={`${styles.checkLabel} ${activeDot === index ? styles.checkLabelActive : ""}`}>
                            {check.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.gravelRoad} />

            <div
                className={`
                    ${styles.carWrapper}
                    ${carGrown ? styles.carWrapperGrown : ""}
                    ${carShrinking ? styles.carWrapperShrunk : ""}
                `}
            >
                <img
                    src={yellowSavanna}
                    alt="yellow Savanna"
                    className={styles.carImage}
                    draggable={false}
                />

                {dotsVisible &&
                    DOT_POSITIONS.slice(0, checks.length).map((dot) => {
                        const isDone = completed.has(dot.index);
                        const isActive = activeDot === dot.index;

                        return (
                            <button
                                key={dot.index}
                                className={`
                                    ${styles.dot}
                                    ${isDone ? styles.dotDone : styles.dotGlowing}
                                    ${isActive ? styles.dotActive : ""}
                                `}
                                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                                onClick={() => handleDotClick(dot.index)}
                                aria-label={checks[dot.index]?.label}
                            />
                        );
                    })}
            </div>

            <div
                className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={handleNextClick}
            >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>
                    {nextBtn}
                </p>
            </div>
        </div>
    );
};

export default Checks;