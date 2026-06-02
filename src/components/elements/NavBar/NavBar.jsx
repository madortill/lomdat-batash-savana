import { useState } from "react";
import styles from "./NavBar.module.css";
import navWheel from "../../../assets/img/navbarWheel.svg";

const NavBar = ({ topics, currentStep, accessibleCount, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!topics) return null;

    const handleTopicClick = (index) => {
        if (index < accessibleCount) {
            onNavigate(index);
            setIsOpen(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`${styles.navbar} ${isOpen ? styles.open : ""}`}
                dir="rtl"
            >
                <div
                    className={styles.wheelSection}
                    onClick={() => setIsOpen(o => !o)}
                    role="button"
                    aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
                >
                    <img src={navWheel} alt="" className={styles.wheelImg} />
                    <p className={styles.currentLabel}>
                        {topics?.[currentStep]?.label}
                    </p>
                </div>

                <div className={`${styles.topicsWrapper} ${isOpen ? styles.topicsOpen : ""}`}>
                    {topics.map((topic, i) => {
                        const isAccessible = i < accessibleCount;
                        const isCurrent = i === currentStep;

                        return (
                            <div
                                key={i}
                                className={`
                                    ${styles.topicItem}
                                    ${isCurrent ? styles.current : ""}
                                    ${isAccessible ? styles.unlocked : styles.locked}
                                `}
                                onClick={() => handleTopicClick(i)}
                            >
                                <span className={styles.topicLabel}>{topic.label}</span>
                                {isCurrent && <span className={styles.activeDot} />}
                                {!isAccessible && <span className={styles.lockIcon}>🔒</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default NavBar;