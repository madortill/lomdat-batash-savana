import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentKnowingTheVehicle.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import bgCircleRoad from "../../../assets/img/smallCircleRoad.svg";
import Tabs from "../../elements/Tabs/Tabs";
import savanna from "../../../assets/img/tabSavanna.svg"

const ContentKnowingTheVehicle = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.cKnowingVehicle) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cKnowingVehicleTitle = data.cKnowingVehicle[0].text;
    const cKnowingVehicleRoadText1 = data.cKnowingVehicle[1].text;
    const cKnowingVehicleRoadText2 = data.cKnowingVehicle[2].text;
    const cKnowingVehicleRoadText3 = data.cKnowingVehicle[3].text;
    const { tab1, tab2 } = data.cKnowingVehicle[4];

    const buildTabContent = (tab) => (
        <div className={styles.tabContentInner}>
            <div className={styles.tabTextLines}>
                {tab.lines.map(line => (
                    <p key={line.id} className={styles.tabText}>{line.text}</p>
                ))}
            </div>
            <img src={savanna} alt="car" className={styles.tabCarImage} />
        </div>
    );

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <div className={styles.bigCirclesFlexDiv}>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{cKnowingVehicleRoadText1}</p>
                </div>
                <div className={`${styles.roadCircleDiv} ${styles.middleCircleDiv}`}>
                    <img src={bgCircleRoad} alt="circle" className={`${styles.roadCircle} ${styles.middleCircle}`} />
                    <p className={`${styles.circleText} ${styles.middleCircleText}`} >{cKnowingVehicleRoadText2}</p>
                </div>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{cKnowingVehicleRoadText3}</p>
                </div>
            </div>
            <div className={styles.tabsInfo}>
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
            <h1 className="main-header-text">{cKnowingVehicleTitle}</h1>
            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentKnowingTheVehicle;
