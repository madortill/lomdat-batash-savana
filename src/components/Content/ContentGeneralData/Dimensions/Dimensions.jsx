import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Dimensions.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import carSilhouette from "../../../../assets/img/carSilhouette.svg";
import carSilhouetteBack from "../../../../assets/img/carSilhouetteBack.svg";
const CARD_KEY = "vehicleDimensions";

const ANNOTATIONS = {
    length: {
        line: { x1: 75, y1: 180, x2: 555, y2: 180 },
        ticks: [{ x1: 75, y1: 168, x2: 75, y2: 192 },
        { x1: 555, y1: 168, x2: 555, y2: 192 }],
        labelPos: { x: 300, y: 170 },
        labelAnchor: "middle",
    },
    width: {
        line: { x1: 230, y1: 190, x2: 400, y2: 190 },
        ticks: [{ x1: 230, y1: 178, x2: 230, y2: 202 },
        { x1: 400, y1: 178, x2: 400, y2: 202 }],
        labelPos: { x: 310, y: 180 },
        labelAnchor: "middle",
    },
    height: {
        line: { x1: 532, y1: 80, x2: 532, y2: 220 },
        ticks: [{ x1: 520, y1: 80, x2: 544, y2: 80 },
        { x1: 520, y1: 220, x2: 544, y2: 220 }],
        labelPos: { x: 480, y: 155 },
        labelAnchor: "middle",
    },
    wheels: {
        line: { x1: 140, y1: 210, x2: 470, y2: 210 },
        ticks: [{ x1: 140, y1: 198, x2: 140, y2: 222 },
        { x1: 470, y1: 198, x2: 470, y2: 222 }],
        labelPos: { x: 300, y: 200 },
        labelAnchor: "middle",
    },
};

const Dimensions = ({ onBack }) => {
    const { data } = useData();

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const dimensionsTitle = data.cDimensions[0].text;
    const dimensionsText = data.cDimensions[1].text;
    const buttons = data.cDimensions.slice(2);

    const wasCompleted = sessionStorage.getItem(`completed_${CARD_KEY}`) === "true";

    const defaultButtonId =
        buttons.find((button) => button.id === "length")?.id ||
        buttons[0]?.id ||
        null;

    const [seenButtons, setSeenButtons] = useState(() => {
        if (wasCompleted) return new Set(buttons.map((button) => button.id));

        const saved = sessionStorage.getItem(`seenButtons_${CARD_KEY}`);

        if (saved) {
            const parsed = new Set(JSON.parse(saved));
            if (defaultButtonId) parsed.add(defaultButtonId);
            return parsed;
        }

        return defaultButtonId ? new Set([defaultButtonId]) : new Set();
    });

    const [activeButton, setActiveButton] = useState(
        () => sessionStorage.getItem(`activeButton_${CARD_KEY}`) || defaultButtonId
    );

    const carImages = {
        length: carSilhouette,
        height: carSilhouette,
        wheels: carSilhouette,
        width: carSilhouetteBack,
    };

    const allSeen = buttons.length > 0 && seenButtons.size === buttons.length;

    const handleButtonClick = (id) => {
        setActiveButton(id);
        sessionStorage.setItem(`activeButton_${CARD_KEY}`, id);

        setSeenButtons((prev) => {
            const updated = new Set(prev).add(id);
            sessionStorage.setItem(`seenButtons_${CARD_KEY}`, JSON.stringify([...updated]));
            return updated;
        });
    };

    const finish = (completedValue) => {
        if (completedValue) {
            sessionStorage.setItem(`completed_${CARD_KEY}`, "true");
        }
        sessionStorage.removeItem(`seenButtons_${CARD_KEY}`);
        sessionStorage.removeItem(`activeButton_${CARD_KEY}`);
        onBack({ completed: completedValue });
    };

    const handleBack = () => finish(allSeen);
    const handleDone = () => { if (allSeen) finish(true); };

    const activeButtonData = buttons.find(b => b.id === activeButton) || null;
    const annotation = activeButton ? ANNOTATIONS[activeButton] : null;

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={handleBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{dimensionsTitle}</h1>

            <div className={styles.contentFrame}>
                <p className={`standard-text ${styles.textGeneralDataSubPage}`}>{dimensionsText}</p>

                {/* ── Buttons row ── */}
                <div className={styles.buttonsRow}>
                    {buttons.map((btn) => {
                        const isSeen = seenButtons.has(btn.id);
                        const isActive = activeButton === btn.id;

                        return (
                            <button
                                key={btn.id}
                                className={`${styles.dimButton} ${isSeen ? styles.seen : ""} ${isActive ? styles.active : ""}`}
                                onClick={() => handleButtonClick(btn.id)}
                            >
                                {btn.label}
                                {isSeen && (
                                    <div className={styles.checkmarkWrapper}>
                                        <span className={styles.checkmarkIcon}>✓</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ── Content panel ── */}
                {activeButtonData && (
                    <div className={styles.contentPanel}>
                        <p className={`standard-text ${styles.smallTextDimensions}`}>
                            {activeButtonData.description}
                        </p>

                        <svg
                            viewBox="0 0 600 320"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                width: "100%",
                                maxWidth: "580px",
                                height: "auto",
                                display: "block",
                                margin: "0 auto",
                                position: "absolute",
                                bottom: "10%",
                                pointerEvents: "none",
                                zIndex: 1
                            }}
                            aria-hidden="true"
                        >
                            <image
                                href={carImages[activeButton]}
                                x="30"
                                y="30"
                                width="580"
                                height="240"
                                preserveAspectRatio="xMidYMid meet"
                            />

                            {annotation && (
                                <g>
                                    {/* Main measurement line */}
                                    {annotation.line && (
                                        <line
                                            x1={annotation.line.x1}
                                            y1={annotation.line.y1}
                                            x2={annotation.line.x2}
                                            y2={annotation.line.y2}
                                            stroke="#FFF2B4"
                                            strokeWidth="4"
                                        />
                                    )}

                                    {/* End ticks */}
                                    {annotation.ticks.map((t, i) => (
                                        <line
                                            key={i}
                                            x1={t.x1} y1={t.y1}
                                            x2={t.x2} y2={t.y2}
                                            stroke="#FFF2B4"
                                            strokeWidth="4"
                                        />
                                    ))}

                                    <text
                                        x={annotation.labelPos.x}
                                        y={annotation.labelPos.y}
                                        textAnchor={annotation.labelAnchor}
                                        fontSize="20"
                                        fontWeight="bold"
                                        fontFamily="rubik, sans-serif"
                                        fill="#FFF2B4"
                                    >
                                        {activeButtonData.measurement} {activeButtonData.unit}
                                    </text>
                                </g>
                            )}
                        </svg>
                    </div>
                )}
            </div>

            <div
                className={`${allSeen ? "next-btn" : "next-btn-disabled"}`}
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