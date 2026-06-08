import { useMemo, useState } from "react";
import styles from "./NavBar.module.css";

import navWheel from "../../../assets/img/navbarWheel.svg";
import topicBlueBg from "../../../assets/img/topicBlueBg.svg";
import topicGrayBg from "../../../assets/img/topicGrayBg.svg";
import topicBlackBg from "../../../assets/img/topicBlackBg.svg";

const NavBar = ({ topics = [], currentPage = 0, accessiblePageCount = 1, onNavigate, labels = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const labelsMap = useMemo(() => {
        if (Array.isArray(labels)) return Object.fromEntries(labels.filter(i => i?.id).map(i => [i.id, i.text]));
        return labels ?? {};
    }, [labels]);

    const normalizedTopics = useMemo(() => {
        if (!Array.isArray(topics)) return [];
        return topics.map((t, idx) => ({ ...t, pageIndex: t.pageIndex ?? idx }))
            .filter(t => t.navId)
            .map(t => ({ ...t, displayLabel: labelsMap?.[t.navId] ?? t.label }));
    }, [topics, labelsMap]);

    if (!normalizedTopics.length) return null;

    const currentTopicIndex = normalizedTopics.findIndex((t, idx) => {
        return currentPage >= t.pageIndex && currentPage < (normalizedTopics[idx + 1]?.pageIndex ?? Infinity);
    });

    const safeCurrentTopicIndex = currentTopicIndex >= 0 ? currentTopicIndex : 0;
    const currentTopic = normalizedTopics[safeCurrentTopicIndex];

    const getTopicBg = (isCurrent, isAccessible) => isCurrent ? topicBlueBg : isAccessible ? topicGrayBg : topicBlackBg;

    const handleTopicClick = (topic) => {
        if (topic.pageIndex >= accessiblePageCount) return;
        onNavigate?.(topic.pageIndex);
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && <button type="button" className={styles.backdrop} onClick={() => setIsOpen(false)} aria-label="סגירת תפריט ניווט" />}

            <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`} dir="rtl" aria-label="ניווט ראשי">
                {isOpen ? (
                    <div className={styles.openPanel}>
                        <button type="button" className={styles.wheelButton} onClick={() => setIsOpen(false)} aria-expanded={isOpen} aria-label="סגור תפריט">
                            <img src={navWheel} alt="" aria-hidden="true" className={styles.wheelImg} />
                        </button>

                        <div className={styles.topicsList}>
                            {normalizedTopics.map((topic, index) => {
                                const isAccessible = topic.pageIndex < accessiblePageCount;
                                const isCurrent = index === safeCurrentTopicIndex;
                                return (
                                    <button
                                        type="button" key={topic.navId} disabled={!isAccessible} onClick={() => handleTopicClick(topic)}
                                        className={`${styles.topicItem} ${isCurrent ? styles.current : ""} ${isAccessible ? styles.unlocked : styles.locked}`}
                                        style={{ backgroundImage: `url(${getTopicBg(isCurrent, isAccessible)})` }}
                                    >
                                        <span className={styles.topicLabel}>{topic.displayLabel}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <button type="button" className={styles.closedNav} onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-label="פתח תפריט ניווט">
                        <img src={navWheel} alt="" aria-hidden="true" className={styles.closedWheel} />
                        <div className={styles.closedTopic} style={{ backgroundImage: `url(${topicBlackBg})` }}>
                            <span className={styles.closedLabel}>{currentTopic?.displayLabel}</span>
                        </div>
                    </button>
                )}
            </nav>
        </>
    );
};

export default NavBar;