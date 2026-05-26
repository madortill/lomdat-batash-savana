import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VehicleOperationOpeningPage.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import bgCircleRoad from "../../../assets/img/smallCircleRoad.svg";

const VehicleOperationOpeningPage = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.CIntro3) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.cVehicleOperationOpeningPage[3].text;
    const vehicleOperationTitle = data.cVehicleOperationOpeningPage[0].text;
    const vehicleOperationText = data.cVehicleOperationOpeningPage[1].text;
    const vehicleOperationText2 = data.cVehicleOperationOpeningPage[2].text;
    const vehicleOperationCircle1 = data.cVehicleOperationOpeningPage[4].text;
    const vehicleOperationCircle2 = data.cVehicleOperationOpeningPage[5].text;
    const vehicleOperationCircle3 = data.cVehicleOperationOpeningPage[6].text;
    const vehicleOperationCircle4 = data.cVehicleOperationOpeningPage[7].text;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{vehicleOperationTitle}</h1>
            <p className={`standard-text ${styles.introVehicleOperation}`}>{vehicleOperationText}</p>
            <div className={styles.bigCirclesFlexDiv}>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{vehicleOperationCircle1}</p>
                </div>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{vehicleOperationCircle2}</p>
                </div>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{vehicleOperationCircle3}</p>
                </div>
                <div className={styles.roadCircleDiv}>
                    <img src={bgCircleRoad} alt="circle" className={styles.roadCircle} />
                    <p className={styles.circleText} >{vehicleOperationCircle4}</p>
                </div>
            </div>
            <p className={`standard-text ${styles.bottomVehicleOperation}`}>{vehicleOperationText2}</p>
            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default VehicleOperationOpeningPage;

