import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Dimensions.module.css";
import backButton from "../../../../assets/img/backBtn.svg";

const CARD_KEY = "vehicleDimensions";

// Define your 4 buttons — each key must match a data.json entry
const BUTTONS = [
    { key: "length", dataKey: "dimLength" },
    { key: "width", dataKey: "dimWidth" },
    { key: "height", dataKey: "dimHeight" },
    { key: "weight", dataKey: "dimWeight" },
];

const Dimensions = ({ onBack }) => {
    const { data } = useData();

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;

    // Persist which buttons have been clicked across navigation
    const [seenButtons, setSeenButtons] = useState(() => {
        const saved = localStorage.getItem(`seenButtons_${CARD_KEY}`);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    // Which button's content panel is open right now
    const [activeButton, setActiveButton] = useState(null);

    const allSeen = seenButtons.size === BUTTONS.length;

    const handleButtonClick = (key) => {
        // Toggle: clicking an open button closes it
        setActiveButton(prev => prev === key ? null : key);

        // Mark as seen and persist
        setSeenButtons(prev => {
            if (prev.has(key)) return prev; // already seen, no need to update storage
            const updated = new Set(prev).add(key);
            localStorage.setItem(`seenButtons_${CARD_KEY}`, JSON.stringify([...updated]));
            return updated;
        });
    };

    const handleBack = () => {
        // Whether or not they finished, clear mid-card progress
        // (if completed, it's no longer needed; if not, they must start fresh)
        localStorage.removeItem(`seenButtons_${CARD_KEY}`);
        onBack({ completed: false }); // back button never counts as completion
    };

    const handleDone = () => {
        if (!allSeen) return;
        localStorage.removeItem(`seenButtons_${CARD_KEY}`);
        onBack({ completed: true });
    };

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={handleBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{data.cDimensions?.[0]?.text}</h1>
            <p className={`standard-text`}>{data.cDimensions?.[1]?.text}</p>

            {/* The 4 buttons */}
            <div className={styles.buttonsRow}>
                {BUTTONS.map(({ key, dataKey }) => {
                    const isSeen = seenButtons.has(key);
                    const isActive = activeButton === key;
                    const label = data[dataKey]?.[0]?.text; // first entry = button label

                    return (
                        <button
                            key={key}
                            className={`${styles.dimButton} ${isSeen ? styles.seen : ""} ${isActive ? styles.active : ""} `}
                            onClick={() => handleButtonClick(key)}
                        >
                            {label}
                            {isSeen && (
                                <div className={styles.checkmarkWrapper}>
                                    <span className={styles.checkmarkIcon}>✓</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content panel — shown when a button is active */}
            {activeButton && (
                <div className={styles.contentPanel}>
                    <p className={`standard-text ${styles.contentText}`}>
                        {data[BUTTONS.find(b => b.key === activeButton).dataKey]?.[1]?.text}
                    </p>
                    {/* Add images, diagrams, measurements etc. here */}
                </div>
            )}

            {/* Done button — only clickable when all 4 buttons have been seen */}
            <div
                className={`${allSeen ? "next-btn" : "next-btn-disabled"} ${styles.doneBtn}`}
                onClick={handleDone}
            >
                <p className={allSeen ? "next-btn-text" : "next-btn-text-disabled"}>
                    {nextBtn}
                </p>
            </div>
        </div>
    );
};

export default Dimensions;