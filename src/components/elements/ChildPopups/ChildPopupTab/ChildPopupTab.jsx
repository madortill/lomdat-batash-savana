import React, { useState } from "react";
import styles from "./ChildPopupTab.module.css";
import Tabs from "../../Tabs/Tabs"

/**
 * childPopupTab — Type 3
 *
 * The complex popup used for the BRAKES warning light.
 * Has two internal pages:
 *   Page 1 → info text + a "next →" arrow button to advance
 *   Page 2 → tabs (user must visit ALL tabs before הבנתי is enabled)
 *
 * Used inside <Popups> with showClose=false and closeOnBackdrop=false:
 *   <Popups onClose={close} showClose={false} closeOnBackdrop={false}>
 *     <childPopupTab data={lightData} onClose={close} />
 *   </Popups>
 *
 * Expected data shape — this light's entry in indicatorLights JSON:
 * {
 *   "id": "brake",
 *   "image": "brake",
 *   "popupType": "tabs",           ← tells ContentIndicatorLights which child to use
 *   "warningIconSrc": "...",        ← optional separate warning icon
 *   "title": "נורת אזהרה למערכת הבלמים",
 *   "page1": {
 *     "text": "בסוואנה מותקנות 2 מערכות בלמים..."
 *   },
 *   "page2": {
 *     "tabs": [
 *       {
 *         "label": "רכב במצב סטטי",
 *         "contentTitle": "בשעת פעולת המנוע...",
 *         "cards": [
 *           { "iconSrc": "/assets/...", "text": "אין להוציא..." },
 *           ...
 *         ]
 *       },
 *       { ... }
 *     ]
 *   },
 *   "confirmText": "הבנתי!"        ← optional
 * }
 *
 * Props:
 *   icon     — the imported SVG for this light (from imageMap)
 *   data     — the full light object from JSON (shape above)
 *   onClose  — called only when user has visited all tabs and clicks confirm
 */
function ChildPopupTab({ icon, data, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // starts with tab 0 already "visited" because it's shown on load
  const [visitedTabs, setVisitedTabs] = useState(new Set([0]));

  const tabs = data.page2?.tabs ?? [];
  const allTabsVisited = visitedTabs.size === tabs.length;

  const handleTabClick = (index) => {
    setActiveTab(index);
    setVisitedTabs((prev) => new Set([...prev, index]));
  };

  // ─────────────────────────────────────────────────────
  return (
    <div className={styles.container}>

      {/* ── Header: icon + title ── */}
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

          {/* "visit all" hint */}
          <p className={allTabsVisited ? styles.noticeGreen : styles.noticeGray}>
            {allTabsVisited
              ? "✓ ביקרת בכל הלשוניות"
              : `יש לבקר בכל הלשוניות — נותרו: ${tabs.length - visitedTabs.size}`}
          </p>

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