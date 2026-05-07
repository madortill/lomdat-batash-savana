// import { useState } from "react";
// import { useData } from "../../../../context/DataContext";
// import styles from "./Dimensions.module.css";
// import backButton from "../../../../assets/img/backBtn.svg";

// const CARD_KEY = "vehicleDimensions";

// // Define your 4 buttons — each key must match a data.json entry
// const BUTTONS = [
//     { key: "length", dataKey: "dimLength" },
//     { key: "width", dataKey: "dimWidth" },
//     { key: "height", dataKey: "dimHeight" },
//     { key: "weight", dataKey: "dimWeight" },
// ];

// const Dimensions = ({ onBack }) => {
//     const { data } = useData();

//     const backBtn = data.general[0].text;
//     const nextBtn = data.general[1].text;
//     const dimensionsTitle = data.cDimensions[0].text;
//     const dimensionsText = data.cDimensions[1].text;

//     // Persist which buttons have been clicked across navigation
//     const [seenButtons, setSeenButtons] = useState(() => {
//         const saved = localStorage.getItem(`seenButtons_${CARD_KEY}`);
//         return saved ? new Set(JSON.parse(saved)) : new Set();
//     });

//     // Which button's content panel is open right now
//     const [activeButton, setActiveButton] = useState(null);

//     const allSeen = seenButtons.size === BUTTONS.length;

//     const handleButtonClick = (key) => {
//         // Toggle: clicking an open button closes it
//         setActiveButton(prev => prev === key ? null : key);

//         // Mark as seen and persist
//         setSeenButtons(prev => {
//             if (prev.has(key)) return prev; // already seen, no need to update storage
//             const updated = new Set(prev).add(key);
//             localStorage.setItem(`seenButtons_${CARD_KEY}`, JSON.stringify([...updated]));
//             return updated;
//         });
//     };

//     const handleBack = () => {
//         // Whether or not they finished, clear mid-card progress
//         // (if completed, it's no longer needed; if not, they must start fresh)
//         localStorage.removeItem(`seenButtons_${CARD_KEY}`);
//         onBack({ completed: false }); // back button never counts as completion
//     };

//     const handleDone = () => {
//         if (!allSeen) return;
//         localStorage.removeItem(`seenButtons_${CARD_KEY}`);
//         onBack({ completed: true });
//     };

//     return (
//         <div className={styles.subPage}>
//             <div className="backBtnDiv">
//                 <img src={backButton} className="back-btn" onClick={handleBack} alt="back" />
//                 <p className="back-btn-text">{backBtn}</p>
//             </div>
//             <h1 className="main-header-text">{dimensionsTitle}</h1>
//             <div className={styles.contentFrame}>
//                 <p className={`standard-text`}>{dimensionsText}</p>
//                 {/* The 4 buttons */}
//                 <div className={styles.buttonsRow}>
//                     {BUTTONS.map(({ key, dataKey }) => {
//                         const isSeen = seenButtons.has(key);
//                         const isActive = activeButton === key;
//                         const label = data[dataKey]?.[0]?.text;

//                         return (
//                             <button
//                                 key={key}
//                                 className={`${styles.dimButton} ${isSeen ? styles.seen : ""} ${isActive ? styles.active : ""} `}
//                                 onClick={() => handleButtonClick(key)}
//                             >
//                                 {label}
//                                 {isSeen && (
//                                     <div className={styles.checkmarkWrapper}>
//                                         <span className={styles.checkmarkIcon}>✓</span>
//                                     </div>
//                                 )}
//                             </button>
//                         );
//                     })}
//                 </div>

//                 {/* Content panel — shown when a button is active */}
//                 {activeButton && (
//                     <div className={styles.contentPanel}>
//                         <p className={`standard-text ${styles.contentText}`}>
//                             {data[BUTTONS.find(b => b.key === activeButton).dataKey]?.[1]?.text}
//                         </p>
//                         {/* Add images, diagrams, measurements etc. here */}
//                     </div>
//                 )}

//             </div>

//             <div className={`${allSeen ? "next-btn" : "next-btn-disabled"}`} onClick={handleDone} >
//                 <p className={allSeen ? "next-btn-text" : "next-btn-text-disabled"}>
//                     {nextBtn}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Dimensions;


import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Dimensions.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import carSilhouette from "../../../../assets/img/carSilhouette.svg";
import carSilhouetteBack from "../../../../assets/img/carSilhouetteBack.svg";
const CARD_KEY = "vehicleDimensions";

/**
 * SVG ANNOTATION SYSTEM
 * ---------------------
 * Each button key maps to a set of drawing instructions for the measurement overlay.
 * All coordinates are in the SVG's viewBox space (0 0 600 320).
 *
 * line:       the main horizontal or vertical measurement line { x1, y1, x2, y2 }
 * ticks:      the two short perpendicular end-ticks (makes it look like ←——→)
 * labelPos:   where the "6.2 מ'" text sits { x, y }
 * labelAnchor: "middle" | "start" | "end" — keeps text centred/aligned on its point
 *
 * HOW TO CALIBRATE:
 * Open your car SVG in a browser, note the viewBox (e.g. "0 0 600 320").
 * Use the browser devtools to find the pixel coordinates of the car's
 * front bumper, rear bumper, roof, wheel base, etc.
 * Plug those numbers in below. The text will always stay glued to those
 * coordinates as the SVG scales — no media queries needed.
 */
const ANNOTATIONS = {
    length: {
        line: { x1: 55, y1: 210, x2: 545, y2: 210 },
        ticks: [{ x1: 55, y1: 198, x2: 55, y2: 222 },
        { x1: 545, y1: 198, x2: 545, y2: 222 }],
        labelPos: { x: 300, y: 200 },
        labelAnchor: "middle",
    },
    width: {
        line: { x1: 80, y1: 210, x2: 370, y2: 210 },
        ticks: [{ x1: 80, y1: 198, x2: 80, y2: 222 },
        { x1: 370, y1: 198, x2: 370, y2: 222 }],
        labelPos: { x: 225, y: 234 },
        labelAnchor: "middle",
    },
    height: {
        line: { x1: 540, y1: 30, x2: 540, y2: 238 },
        ticks: [{ x1: 520, y1: 80, x2: 572, y2: 80 },
        { x1: 520, y1: 220, x2: 572, y2: 220 }],
        labelPos: { x: 480, y: 155 },
        labelAnchor: "middle",
    },
    wheels: {
        line: { x1: 130, y1: 210, x2: 470, y2: 210 },
        ticks: [{ x1: 130, y1: 198, x2: 130, y2: 222 },
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

    const wasCompleted = localStorage.getItem(`completed_${CARD_KEY}`) === "true";

    const [seenButtons, setSeenButtons] = useState(() => {
        if (wasCompleted) return new Set(buttons.map(b => b.id));
        const saved = localStorage.getItem(`seenButtons_${CARD_KEY}`);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const carImages = {
        length: carSilhouette,
        height: carSilhouette,
        wheels: carSilhouette,
        width:  carSilhouetteBack,
    };

    /**
     * DEFAULT ACTIVE BUTTON LOGIC
     * ----------------------------
     * activeButton starts as the first button's id — so content is shown immediately.
     * But it is NOT added to seenButtons here, so no checkmark appears yet.
     * The checkmark for button A only appears after the user:
     *   1. clicks a different button (leaving A), then
     *   2. comes back to A — at which point it's a deliberate re-click.
     * OR: clicks away from A once (which marks A as seen).
     *
     * Specifically: a button is marked seen when the user clicks AWAY from it
     * (i.e. when it was the activeButton and the user picks something else).
     */
    const [activeButton, setActiveButton] = useState(
        () => localStorage.getItem(`activeButton_${CARD_KEY}`) || buttons[0]?.id || null
    );

    const allSeen = buttons.length > 0 && seenButtons.size === buttons.length;

    const handleButtonClick = (id) => {
        if (id === activeButton) return;

        if (activeButton) {
            setSeenButtons(prev => {
                if (prev.has(activeButton)) return prev;
                const updated = new Set(prev).add(activeButton);
                localStorage.setItem(`seenButtons_${CARD_KEY}`, JSON.stringify([...updated]));
                return updated;
            });
        }

        setActiveButton(id);
        localStorage.setItem(`activeButton_${CARD_KEY}`, id);
    };

    const finish = (completedValue) => {
        if (completedValue) {
            localStorage.setItem(`completed_${CARD_KEY}`, "true");
        }
        localStorage.removeItem(`seenButtons_${CARD_KEY}`);
        localStorage.removeItem(`activeButton_${CARD_KEY}`);
        onBack({ completed: completedValue });
    };

    // Back counts as complete if all buttons were seen (point 3 from earlier)
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
                <p className="standard-text">{dimensionsText}</p>

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
                        <p className={`standard-text ${styles.contentText}`}>
                            {activeButtonData.description}
                        </p>

                        {/*
                         * ── Inline SVG car diagram ──
                         *
                         * WHY INLINE SVG AND NOT <img>:
                         * An <img> tag cannot have text/lines drawn on top of it
                         * that scale with it. By using a single SVG with both the
                         * car image (<image> tag) and the annotation (<line>, <text>)
                         * inside the same viewBox, everything lives in the same
                         * coordinate system and scales together as one unit.
                         *
                         * The viewBox is fixed (0 0 600 320). The SVG element itself
                         * is set to width:100% so it shrinks/grows with its container.
                         * All x/y coordinates in ANNOTATIONS are in viewBox units,
                         * so they stay perfectly positioned at any screen size.
                         *
                         * measurement and unit come straight from the JSON object,
                         * so they translate automatically with the rest of the page.
                         */}
                        <svg
                            viewBox="0 0 600 320"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "100%", maxWidth: "580px", height: "auto", display: "block", margin: "0 auto", position: "absolute", bottom: "10%"}}
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

                            {/* Annotation — only rendered when there is an active button */}
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

                                    {/*
                                     * Measurement label
                                     * textAnchor="middle" centres the text on labelPos.x
                                     * regardless of string length — "2.012 מ'" and "6.2 מ'"
                                     * both centre correctly with no manual adjustment.
                                     * fontSize is in SVG units, so it scales with the viewBox.
                                     */}
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