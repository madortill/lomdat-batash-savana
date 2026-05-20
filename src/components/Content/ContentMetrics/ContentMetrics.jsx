import React, { useState } from "react";
import styles from "./ContentMetrics.module.css";
import dashboardBg from "../../../assets/img/dashboard.svg"; // תמונת הדשבורד השלמה
import Popups from "../../elements/Popups/Popups";
import StandardIndicator from "../../elements/ChildPopups/StandardIndicator/StandardIndicator";
// import backButton from "../../../assets/img/backBtn.svg";
// או שתייבא את WheelsPopup במידה ויצרת קובץ נפרד

// מיפוי הנתונים של המדדים השונים כולל המיקומים שלהם באחוזים
const METRICS_DATA = {
    speed: {
        id: "speed",
        title: "מד מהירות (Speedometer)",
        text: "מד המהירות מציג את מהירות הנסיעה הנוכחית של הרכב בקמ״ש (km/h) ובמייל לשעה (MPH).",
        isActive: true, // 100% opacity + glow
        style: { top: "35%", left: "34%", width: "32%", height: "42%", borderRadius: "50%" }
    },
    temp: {
        id: "temp",
        title: "מד טמפרטורת נוזל הקירור",
        text: "מד זה מציג את טמפרטורת נוזל הקירור של המנוע. שים לב לא לעבור את הטווח התקין כדי למנוע התחממות!",
        isActive: true,
        style: { top: "58%", left: "17%", width: "15%", height: "23%", borderRadius: "50%" }
    },
    gas: {
        id: "gas",
        title: "מד דלק (Fuel Gauge)",
        text: "מציג את כמות הדלק הנותרת במיכל. האות E מסמנת מיכל ריק (Empty) והאות F מסמנת מיכל מלא (Full).",
        isActive: true,
        style: { top: "56%", left: "68%", width: "15%", height: "23%", borderRadius: "50%" }
    },
    oil: {
        id: "oil",
        title: "מד לחץ שמן",
        text: "מד לחץ שמן המנוע. מציג נתונים כלליים שאינם חלק מהמשימה הנוכחית.",
        isActive: false, // 60% opacity, no glow, no click
        style: { top: "39%", left: "21%", width: "13%", height: "19%", borderRadius: "50%" }
    },
    battery: {
        id: "battery",
        title: "מד מתח מצבר (Voltmeter)",
        text: "מציג את מתח הטעינה של המצבר ברשת החשמל של הרכב.",
        isActive: false,
        style: { top: "37%", left: "66%", width: "13%", height: "19%", borderRadius: "50%" }
    }
};

// const backBtn = data.general[0].text;
// const nextBtn = data.general[1].text;

function ContentMetrics() {
    const [activePopupMetric, setActivePopupMetric] = useState(null);

    const handleMetricClick = (metricKey) => {
        const metric = METRICS_DATA[metricKey];
        if (!metric.isActive) return; // לא מאפשר ללחוץ על מדדים כבויים
        setActivePopupMetric(metric);
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className="main-header-text">נורות חיווי - מדדים</h1>
            <p className="standard-text">לחצו על המדדים כדי ללמוד עוד!</p>

            {/* אזור הדשבורד האינטראקטיבי */}
            <div className={styles.dashboardWrapper}>
                <img src={dashboardBg} alt="Dashboard" className={styles.dashboardImg} />

                {/* ריצה על כל המדדים והצבת שכבות אינטראקטיביות מעליהם */}
                {Object.keys(METRICS_DATA).map((key) => {
                    const metric = METRICS_DATA[key];
                    return (
                        <button
                            key={metric.id}
                            className={`${styles.metricOverlay} ${metric.isActive ? styles.activeMetric : styles.inactiveMetric
                                }`}
                            style={metric.style}
                            onClick={() => handleMetricClick(key)}
                            disabled={!metric.isActive}
                            aria-label={metric.title}
                        >
                            {/* טבעת הגלואו הפועמת - תיווצר רק עבור מדדים פעילים */}
                            {metric.isActive && <div className={styles.glowRing} />}
                        </button>
                    );
                })}
            </div>

            {/* פופאפ מבוסס על רכיב ה-Popups הקיים שלך */}
            {activePopupMetric && (
                <Popups onClose={() => setActivePopupMetric(null)} showClose={true}>
                    <StandardIndicator
                        title={activePopupMetric.title}
                        text={activePopupMetric.text}
                        confirmText="הבנתי!"
                        onClose={() => setActivePopupMetric(null)}
                    />
                </Popups>
            )}

        </div>
    );
}

export default ContentMetrics;