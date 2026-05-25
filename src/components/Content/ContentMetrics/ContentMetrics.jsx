import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentMetrics.module.css";
import dashboardBg from "../../../assets/img/dashboard.svg";
import Popups from "../../elements/Popups/Popups";
import ChildPopupMetric from "../../elements/ChildPopups/ChildPopupMetric/ChildPopupMetric";
import backButton from "../../../assets/img/backBtn.svg";

const ContentMetrics = ({ onNext, onBack, onComplete }) => {
    const { data } = useData();

    const [activePopupMetric, setActivePopupMetric] = useState(null);

    const [viewedMetrics, setViewedMetrics] = useState(() => {
        return JSON.parse(
            sessionStorage.getItem("contentMetricsViewed") || "[]"
        );
    });

    if (!data || !data.general) return null;
    if (!data || !data.general || !data.cMetrics || !data.dashboardMetrics) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cMetricsTitle = data.cMetrics[0].text;
    const cMetricsText = data.cMetrics[1].text;

    const metricsData = data.dashboardMetrics;

    const activeMetrics = metricsData.filter(metric => metric.isActive);

    const allViewed = activeMetrics.every(metric =>
        viewedMetrics.includes(metric.id)
    );

    const handleMetricClick = (metric) => {
        if (!metric.isActive) return;
        setActivePopupMetric(metric);
    };

    const handleClosePopup = () => {
        if (activePopupMetric) {
            setViewedMetrics(prev =>
                prev.includes(activePopupMetric.id) ? prev : [...prev, activePopupMetric.id]
            );
        }

        setActivePopupMetric(null);
    };

    useEffect(() => {
        if (allViewed) {
            onComplete?.();
        }
    }, [allViewed, onComplete]);

    useEffect(() => {
        sessionStorage.setItem(
            "contentMetricsViewed",
            JSON.stringify(viewedMetrics)
        );
    }, [viewedMetrics]);

    return (
        <div className={styles.pageContainer}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{cMetricsTitle}</h1>
            <p className={`standard-text ${styles.metricsText}`}>{cMetricsText}</p>

            {/* אזור הדשבורד האינטראקטיבי */}
            <div className={styles.dashboardWrapper}>
                <img src={dashboardBg} alt="Dashboard" className={styles.dashboardImg} />

                {/* ריצה על כל המדדים והצבת שכבות אינטראקטיביות מעליהם */}
                {metricsData.map((metric) => {
                    return (
                        <button
                            key={metric.id}
                            className={`${styles.metricOverlay} ${viewedMetrics.includes(metric.id) ? styles.viewedMetric : styles.activeMetric}`}
                            style={metric.style}
                            onClick={() => handleMetricClick(metric)}
                        >
                            {metric.isActive && !viewedMetrics.includes(metric.id) && (
                                <div className={styles.glowRing} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* פופאפ מבוסס על רכיב ה-Popups הקיים שלך */}
            {activePopupMetric && (
                <Popups onClose={handleClosePopup} showClose={false} isTransparent={true}>
                    <ChildPopupMetric
                        title={activePopupMetric.title}
                        text={activePopupMetric.text}
                        confirmText="הבנתי!"
                        onClose={handleClosePopup}
                    />
                </Popups>
            )}

            <div className={allViewed ? "next-btn" : "next-btn-disabled"} onClick={allViewed ? onNext : undefined} >
                <p className={allViewed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>

        </div>
    );
}

export default ContentMetrics;