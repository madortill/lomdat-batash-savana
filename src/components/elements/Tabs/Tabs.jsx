import { useState } from "react";
import styles from "./Tabs.module.css";

const Tabs = ({
    tab1Label,
    tab2Label,
    tab1Content,
    tab2Content,
    activeColor = "#F9DB88",
    borderColor = "#073799",
    outlineColor = "#073799",
    inactiveTextColor = "#FFF2B4",
    activeTextColor = "#073799",
    contentBg = "#F9DB88",
    onChangeTab,
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        if (onChangeTab) {
            onChangeTab(index);
        }
    };

    const bubbleRadius = activeTab === 0
        ? "30px 30px 0px 30px"
        : "30px 30px 30px 0px";

    return (
        <div className={styles.tabContainer} style={{ borderColor, "--tabs-outline-color": outlineColor }}>
            <div className={styles.tabHeaders} style={{ backgroundColor: borderColor }}>
                <div
                    className={styles.bubble}
                    style={{
                        backgroundColor: activeColor,
                        transform: activeTab === 0 ? "translateX(0%)" : "translateX(-100%)",
                        borderRadius: bubbleRadius,
                    }}
                />
                <div className={styles.tab} onClick={() => handleTabClick(0)}>
                    <p className={styles.tabLabel} style={{ color: activeTab === 0 ? activeTextColor : inactiveTextColor }}>
                        {tab1Label}
                    </p>
                </div>

                <div className={styles.tab} onClick={() => handleTabClick(1)}>
                    <p className={styles.tabLabel} style={{ color: activeTab === 1 ? activeTextColor : inactiveTextColor }}>
                        {tab2Label}
                    </p>
                </div>
            </div>

            <div className={styles.tabContent} style={{ backgroundColor: contentBg, borderTopColor: borderColor }}>
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