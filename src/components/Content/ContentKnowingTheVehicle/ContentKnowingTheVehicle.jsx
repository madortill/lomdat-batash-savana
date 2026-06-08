import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentKnowingTheVehicle.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import bgCircleRoad from "../../../assets/img/smallCircleRoad.svg";
import Tabs from "../../elements/Tabs/Tabs";
import savanna from "../../../assets/img/tabSavanna.svg";
import arrow from "../../../assets/img/curvedArrow1.svg";

const ContentKnowingTheVehicle = ({ onNext, onBack }) => {
    const { data } = useData();

    const [hasVisitedTab2, setHasVisitedTab2] = useState(() => {
        const savedProgress = sessionStorage.getItem("knowingVehicle_tab2_visited");
        return savedProgress === "true";
    });

    if (!data || !data.general || !data.cKnowingVehicle) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cKnowingVehicleTitle = data.cKnowingVehicle[0].text;
    const cKnowingVehicleRoadText1 = data.cKnowingVehicle[1].text;
    const cKnowingVehicleRoadText2 = data.cKnowingVehicle[2].text;
    const cKnowingVehicleRoadText3 = data.cKnowingVehicle[3].text;
    const { tab1, tab2 } = data.cKnowingVehicle[4];
    const cKnowingVehicleRoadArrowText = data.cKnowingVehicle[5].text;

    const canProceed = hasVisitedTab2;

    const handleTabChange = (index) => {
        if (index === 1 && !hasVisitedTab2) {
            setHasVisitedTab2(true);
            sessionStorage.setItem("knowingVehicle_tab2_visited", "true");
        }
    };

    const handleNextClick = () => {
        if (canProceed) {
            onNext();
        }
    };

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
                <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{cKnowingVehicleTitle}</h1>
            <div className={styles.bigCirclesFlexDiv}>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText}>{cKnowingVehicleRoadText1}</p>
                </div>
                <div className={`${styles.roadCircleDiv} ${styles.middleCircleDiv}`}>
                    <img src={bgCircleRoad} alt="circle" className={`${styles.roadCircle} ${styles.middleCircle}`} />
                    <p className={`${styles.circleText} ${styles.middleCircleText}`}>{cKnowingVehicleRoadText2}</p>
                </div>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText}>{cKnowingVehicleRoadText3}</p>
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
                    onChangeTab={handleTabChange}
                />
            </div>
            <div className={styles.commentDiv}>
                <img src={arrow} alt="arrow" className={styles.arrow}/>
                <p className={styles.circleText}>{cKnowingVehicleRoadArrowText}</p>
            </div>
            <div
                className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={handleNextClick}
            >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentKnowingTheVehicle;