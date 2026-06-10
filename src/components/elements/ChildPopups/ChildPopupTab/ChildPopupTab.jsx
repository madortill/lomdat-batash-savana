import React, { useEffect, useMemo, useState } from "react";
import styles from "./ChildPopupTab.module.css";
import Tabs from "../../Tabs/Tabs";
import CommentGal from "../../CommentGal/CommentGal";

const ChildPopupTab = ({
  icon,
  data,
  onClose,
  onDismiss,
  imageMap = {},
}) => {
  const storageKey = `child-popup-tab-progress-${data.id}`;

  const tabs = data.page2?.tabs ?? [];

  const getInitialVisitedTabs = () => {
    const saved = sessionStorage.getItem(storageKey);

    if (!saved) {
      return new Set([0]);
    }

    try {
      const parsed = JSON.parse(saved);
      return new Set(parsed.visitedTabs ?? [0]);
    } catch {
      return new Set([0]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [visitedTabs, setVisitedTabs] = useState(getInitialVisitedTabs);

  const allTabsVisited = tabs.length > 0 && visitedTabs.size >= tabs.length;

  useEffect(() => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        visitedTabs: Array.from(visitedTabs),
      })
    );
  }, [storageKey, visitedTabs]);

  const handleTabChange = (index) => {
    setVisitedTabs((prev) => new Set([...prev, index]));
  };

  const renderCardIcon = (iconSrc) => {
    if (!iconSrc) return null;

    return (
      <img
        src={imageMap[iconSrc] ?? iconSrc}
        alt=""
        aria-hidden="true"
        className={styles.cardIcon}
      />
    );
  };

  const renderTabContent = (tab) => {
    return (
      <div className={styles.tabInnerContent}>
        {tab?.contentTitle && (
          <p className={styles.tabContentTitle}>{tab.contentTitle}</p>
        )}

        <div className={styles.cardsGrid}>
          {tab?.cards?.map((card, index) => (
            <div key={index} className={`${styles.card} ${card.hideIcon ? styles.cardNoIcon : ""}`} >
              {!card.hideIcon && renderCardIcon(card.iconSrc)}
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tab1Content = useMemo(() => renderTabContent(tabs[0]), [tabs]);
  const tab2Content = useMemo(() => renderTabContent(tabs[1]), [tabs]);

  return (
    <div className={styles.container}>
      {currentPage === 1 && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onDismiss}
          aria-label="סגירת החלון"
        >
          ×
        </button>
      )}

      <div className={styles.header}>
        {icon && (
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className={styles.warningIcon}
          />
        )}

        <h2 className={styles.title}>{data.title}</h2>
      </div>

      {currentPage === 1 && (
        <div className={styles.page}>
          {data.page1?.text && (
            <p className={styles.pageText}>{data.page1.text}</p>
          )}

          {data.page1?.images?.length > 0 && (
            <div className={styles.imagesGrid}>
              {data.page1.images.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img
                    src={imageMap[image.image]}
                    alt={image.alt ?? ""}
                    className={styles.pageImage}
                  />

                  {image.label && (
                    <p className={styles.imageLabel}>{image.label}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.page1?.commentText && (
            <div className={styles.commentWrapper}>
              <CommentGal
                text={data.page1.commentText}
                mood="orange"
                characterSide="left"
                size="small"
              />
            </div>
          )}

          <button
            type="button"
            className={styles.nextPageBtn}
            onClick={() => setCurrentPage(2)}
          >
            {data.page1?.nextText ?? "הבא"}
          </button>
        </div>
      )}

      {currentPage === 2 && (
        <div className={styles.page}>
          <button
            type="button"
            className={styles.backCornerBtn}
            onClick={() => setCurrentPage(1)}
            aria-label={data.page2?.backText ?? "חזור"}
          >
            <span className={styles.backCornerIcon}>➜</span>
            <span className={styles.backCornerText}>
              {data.page2?.backText ?? "חזור"}
            </span>
          </button>

          <div className={styles.tabsWrapper}>
            <Tabs
              tab1Label={tabs[0]?.label}
              tab2Label={tabs[1]?.label}
              tab1Content={tab1Content}
              tab2Content={tab2Content}
              activeColor="#FFF2B4"
              borderColor="#E69907"
              outlineColor="#E69907"
              inactiveTextColor="#FFF2B4"
              activeTextColor="#E69907"
              contentBg="#FFF2B4"
              onChangeTab={handleTabChange}
            />
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.confirmBtn}
              onClick={onClose}
              disabled={!allTabsVisited}
            >
              {data.confirmText ?? "הבנתי!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildPopupTab;