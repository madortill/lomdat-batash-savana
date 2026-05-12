import { useEffect } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Air.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import tireImg from "../../../../assets/img/tabsWheel.svg";
import Tabs from "../../../elements/Tabs/Tabs";

const Air = ({ onBack, cardKey }) => {
    const { data } = useData();

    useEffect(() => {
        localStorage.setItem(`completed_${cardKey}`, "true");
    }, []);

    if (!data || !data.general || !data.cAir) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const title = data.cAir[0].text;
    const { tab1, tab2 } = data.cAir[1];

    const buildTabContent = (tab) => (
        <div className={styles.tabContentInner}>
            <p className={styles.tabTitle}>{tab.title}</p>
            <div className={styles.tiresRow}>
                <div className={styles.tireItem}>
                    <p className={styles.tireLabel}>{tab.front.label}</p>
                    <div className={styles.tireWrapper}>
                        <img src={tireImg} alt="tire" className={styles.tireImg} />
                        <p className={styles.tireValue}>{tab.front.value}</p>
                    </div>
                </div>
                <div className={styles.tireItem}>
                    <p className={styles.tireLabel}>{tab.back.label}</p>
                    <div className={styles.tireWrapper}>
                        <img src={tireImg} alt="tire" className={styles.tireImg} />
                        <p className={styles.tireValue}>{tab.back.value}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={() => onBack({ completed: true })}
                    alt="back"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{title}</h1>

            <div className={styles.contentFrame}>
                <Tabs
                    tab1Label={tab1.label}
                    tab2Label={tab2.label}
                    tab1Content={buildTabContent(tab1)}
                    tab2Content={buildTabContent(tab2)}
                    activeColor="#F9DB88"
                    borderColor="#073799"
                    contentBg="#F9DB88"
                />
            </div>

            <div
                className="next-btn"
                onClick={() => onBack({ completed: true })}
            >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Air;