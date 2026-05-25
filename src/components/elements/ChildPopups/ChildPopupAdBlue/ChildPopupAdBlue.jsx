import React, { useState } from "react";
import styles from "./ChildPopupAdBlue.module.css";

function ChildPopupAdBlue({ icon, data, onClose }) {

    const steps = data.steps ?? [];

    const [activeStep, setActiveStep] = useState(0);

    const [visitedSteps, setVisitedSteps] = useState(new Set([0]));

    const allVisited = visitedSteps.size === steps.length;

    const handleStepClick = (index) => {
        setActiveStep(index);

        setVisitedSteps((prev) => {
            return new Set([...prev, index]);
        });
    };

    return (
        <div className={styles.container}>

            {/* ── Header ───────────────────── */}
            <div className={styles.header}>
                {icon && (
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className={styles.icon}
                    />
                )}

                <h2 className={styles.title}>
                    {data.title}
                </h2>
            </div>

            {/* ── Timeline ─────────────────── */}
            <div className={styles.timelineWrapper}>

                {/* line */}
                <div className={styles.timelineLine} />

                {steps.map((step, index) => {

                    const isActive = activeStep === index;
                    const isVisited = visitedSteps.has(index);

                    return (
                        <button
                            key={index}
                            className={`
                                ${styles.timelineStep}
                                ${isActive ? styles.active : ""}
                                ${isVisited ? styles.visited : ""}
                            `}
                            onClick={() => handleStepClick(index)}
                        >

                            <span className={styles.stepNumber}>
                                {isVisited ? "✓" : index + 1}
                            </span>

                            <span className={styles.stepLabel}>
                                {step.label}
                            </span>

                        </button>
                    );
                })}
            </div>

            {/* ── Speech bubble/content ────── */}
            <div className={styles.bubble}>

                {steps[activeStep]?.title && (
                    <h3 className={styles.bubbleTitle}>
                        {steps[activeStep].title}
                    </h3>
                )}

                <p className={styles.bubbleText}>
                    {steps[activeStep]?.text}
                </p>

            </div>

            {/* ── Confirm button ───────────── */}
            <button
                className={styles.confirmBtn}
                disabled={!allVisited}
                onClick={onClose}
            >
                {data.confirmText ?? "הבנתי!"}
            </button>

        </div>
    );
}

export default ChildPopupAdBlue;