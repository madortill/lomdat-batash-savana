import { useState } from "react";
import styles from "./Tabs.module.css";

const Tabs = ({
    tab1Label,
    tab2Label,
    tab1Content,
    tab2Content,
    activeColor = "#F9DB88",
    borderColor = "#073799",
    inactiveTextColor = "#FFF2B4",
    activeTextColor = "#073799",
    contentBg = "#F9DB88",
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const bubbleRadius = activeTab === 0
        ? "30px 30px 0px 30px"
        : "30px 30px 30px 0px";

    return (
        <div className={styles.tabContainer} style={{ borderColor }}>
            <div className={styles.tabHeaders} style={{ backgroundColor: borderColor }}>
                {/* Sliding bubble */}
                <div
                    className={styles.bubble}
                    style={{
                        backgroundColor: activeColor,
                        transform: activeTab === 0 ? "translateX(0%)" : "translateX(-100%)",
                        borderRadius: bubbleRadius,
                    }}
                />
                {/* Tab 1 */}
                <div className={styles.tab} onClick={() => setActiveTab(0)} >
                    <p className={styles.tabLabel} style={{ color: activeTab === 0 ? activeTextColor : inactiveTextColor }} >
                        {tab1Label}
                    </p>
                </div>

                {/* Tab 2 */}
                <div className={styles.tab} onClick={() => setActiveTab(1)} >
                    <p className={styles.tabLabel} style={{ color: activeTab === 1 ? activeTextColor : inactiveTextColor }} >
                        {tab2Label}
                    </p>
                </div>

            </div>

            {/* Content area */}
            <div className={styles.tabContent} style={{ backgroundColor: contentBg, borderTopColor: borderColor, }}>
                <div className={`${styles.panel} ${activeTab === 0 ? styles.activePanel : ""}`}>
                    {tab1Content}
                </div>
                <div className={`${styles.panel} ${activeTab === 1 ? styles.activePanel : ""}`}>
                    {tab2Content}
                </div>
            </div>

        </div>
    );
};

export default Tabs;