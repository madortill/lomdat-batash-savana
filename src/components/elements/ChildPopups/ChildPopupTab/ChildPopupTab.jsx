import React, { useState } from "react";
import styles from "./ChildPopupTab.module.css";
import Tabs from "../../Tabs/Tabs"

const ChildPopupTab = ({ icon, data, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [visitedTabs, setVisitedTabs] = useState(new Set([0]));

  const tabs = data.page2?.tabs ?? [];
  const allTabsVisited = visitedTabs.size === tabs.length;

  const handleTabClick = (index) => {
    setActiveTab(index);
    setVisitedTabs((prev) => new Set([...prev, index]));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className={styles.warningIcon}
        />
        <h2 className={styles.title}>{data.title}</h2>
      </div>

      {/* ══════════════ PAGE 1 ══════════════ */}
      {currentPage === 1 && (
        <>
          {/* Arrow button — top-right, advances to page 2 */}
          <button
            className={styles.nextPageBtn}
            onClick={() => setCurrentPage(2)}
            aria-label="המשך לדף הבא"
          >
            →
          </button>

          <div className={styles.infoPanel}>
            <p>{data.page1?.text}</p>
          </div>
        </>
      )}

      {/* ══════════════ PAGE 2: TABS ══════════════ */}
      {currentPage === 2 && (
        <>
          {/* Tab buttons */}
          <div className={styles.tabRow} role="tablist">
            {tabs.map((tab, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeTab === i}
                className={[
                  styles.tabBtn,
                  activeTab === i ? styles.tabActive : "",
                  visitedTabs.has(i) ? styles.tabVisited : "",
                ].join(" ")}
                onClick={() => handleTabClick(i)}
              >
                {tab.label}
                {/* green ✓ badge once visited */}
                {visitedTabs.has(i) && (
                  <span className={styles.visitedBadge} aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <Tabs />
          <div className={styles.tabContent} role="tabpanel">
            {tabs[activeTab]?.contentTitle && (
              <p className={styles.tabContentTitle}>
                {tabs[activeTab].contentTitle}
              </p>
            )}

            <div className={styles.cardsGrid}>
              {tabs[activeTab]?.cards?.map((card, i) => (
                <div key={i} className={styles.card}>
                  {card.iconSrc && (
                    <img
                      src={card.iconSrc}
                      alt=""
                      aria-hidden="true"
                      className={styles.cardIcon}
                    />
                  )}
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm button — locked until all tabs visited */}
          <button
            className={styles.confirmBtn}
            onClick={onClose}
            disabled={!allTabsVisited}
          >
            {data.confirmText ?? "הבנתי!"}
          </button>
        </>
      )}

    </div>
  );
}

export default ChildPopupTab;