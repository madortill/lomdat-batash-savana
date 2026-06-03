import React, { useEffect, useMemo, useState } from "react";
import styles from "./ChildPopupAdBlue.module.css";

function ChildPopupAdBlue({ icon, data, onClose, onDismiss, imageMap = {} }) {
    const steps = data.steps ?? [];
    const storageKey = `child-popup-adblue-progress-${data.id}`;

    const getInitialVisitedSteps = () => {
        const saved = localStorage.getItem(storageKey);

        if (!saved) {
            return new Set([0]);
        }

        try {
            const parsed = JSON.parse(saved);
            return new Set(parsed.visitedSteps ?? [0]);
        } catch {
            return new Set([0]);
        }
    };

    const [activeStep, setActiveStep] = useState(0);
    const [visitedSteps, setVisitedSteps] = useState(getInitialVisitedSteps);

    const allVisited = steps.length > 0 && visitedSteps.size >= steps.length;
    const activeStepData = steps[activeStep];

    const arrowPosition = steps.length > 1
        ? `${100 - (activeStep / (steps.length - 1)) * 100}%`
        : "50%";

    useEffect(() => {
        localStorage.setItem(
            storageKey,
            JSON.stringify({
                visitedSteps: Array.from(visitedSteps),
            })
        );
    }, [storageKey, visitedSteps]);

    const handleStepClick = (index) => {
        setActiveStep(index);
        setVisitedSteps((prev) => new Set([...prev, index]));
    };

    const handleCloseClick = () => {
        if (allVisited) {
            onClose?.();
            return;
        }

        onDismiss?.();
    };

    const getStepClassName = (index) => {
        const isActive = activeStep === index;
        const isVisited = visitedSteps.has(index);

        return `
            ${styles.timelineStep}
            ${isActive ? styles.active : ""}
            ${isVisited ? styles.visited : ""}
        `;
    };

    const leftTank = useMemo(() => {
        return imageMap[data.tanks?.emptyImage] ?? imageMap.adBlueEmpty;
    }, [imageMap, data.tanks]);

    const rightTank = useMemo(() => {
        return imageMap[data.tanks?.fullImage] ?? imageMap.adBlueFull;
    }, [imageMap, data.tanks]);

    const openingImage = imageMap[activeStepData?.image];

    return (
        <div className={styles.container}>
            <button
                type="button"
                className={styles.closeBtn}
                onClick={handleCloseClick}
                aria-label={data.closeText ?? "סגירת החלון"}
            >
                ×
            </button>

            <div className={styles.header}>
                {icon && (
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className={styles.icon}
                    />
                )}

                <h2 className={styles.title}>{data.title}</h2>

                {data.intro?.text && (
                    <p className={styles.introText}>{data.intro.text}</p>
                )}
            </div>

            <div className={styles.timelinePanel}>
                {data.instructionText && (
                    <p className={styles.instructionText}>{data.instructionText}</p>
                )}

                <div className={styles.timelineArea}>
                    <div className={styles.tankBlock}>
                        {rightTank && (
                            <img
                                src={rightTank}
                                alt=""
                                aria-hidden="true"
                                className={styles.tankImage}
                            />
                        )}
                        <p className={styles.tankLabel}>
                            {data.tanks?.fullLabel ?? "מיכל מלא"}
                        </p>
                    </div>

                    <div className={styles.timelineColumn}>
                        <div className={styles.timelineWrapper}>
                            <div className={styles.timelineLine} />

                            {steps.map((step, index) => (
                                <button
                                    key={step.id ?? index}
                                    type="button"
                                    className={getStepClassName(index)}
                                    onClick={() => handleStepClick(index)}
                                    aria-label={step.label}
                                >
                                    <span className={styles.stepNumber}>
                                        {index + 1}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div
                            className={styles.bubble}
                            style={{ "--arrow-x": arrowPosition }}
                        >
                            <div className={styles.bubbleArrow} />

                            {activeStepData?.title && (
                                <h3 className={styles.bubbleTitle}>
                                    {activeStepData.title}
                                </h3>
                            )}

                            {activeStepData?.text && (
                                <p
                                    className={styles.bubbleText}
                                    dangerouslySetInnerHTML={{ __html: activeStepData.text }}
                                />
                            )}

                            {openingImage && (
                                <img
                                    src={openingImage}
                                    alt=""
                                    aria-hidden="true"
                                    className={styles.openingImage}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.tankBlock}>
                        {leftTank && (
                            <img
                                src={leftTank}
                                alt=""
                                aria-hidden="true"
                                className={styles.tankImage}
                            />
                        )}
                        <p className={styles.tankLabel}>
                            {data.tanks?.emptyLabel ?? "מיכל ריק"}
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <button
                    type="button"
                    className={`${styles.confirmBtn} ${!allVisited ? styles.confirmHidden : ""}`}
                    disabled={!allVisited}
                    onClick={onClose}
                >
                    {data.confirmText ?? "הבנתי!"}
                </button>
            </div>
        </div>
    );
}

export default ChildPopupAdBlue;