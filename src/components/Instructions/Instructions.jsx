import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Instructions.module.css";
import HappyGal from "../../assets/img/HappyGal.svg";
import backBtn from "../../assets/img/backBtn.svg";


const Instructions = ({ onSendData }) => {

    // const { data } = useData();
    // const Instructions = data.Instructions[0].text;
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const TOTAL_STEPS = 2;

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(prev => prev + 1);
        } else {
            navigate("/NavPage");
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="instructions-page">
            <img src={backBtn} className="back-btn" onClick={handleBack}/>
            {/* <h1>{Instructions}</h1> */}
            <p className="main-header-text">This is lomdat Savana!</p>
            <img src={HappyGal} className={styles.instructionsGal} alt="happy-gal" />
            {step === 0 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>hi i am bubble text Language</p>
                    </div>
                </>}
            {step === 1 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>hi i am bubble text sound</p>
                    </div>
                </>}
            {step === 2 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>hi i am bubble text buttons</p>
                    </div>
                </>}
            <div className={`next-btn ${styles.nextBtn}`} onClick={handleNext} >
                <p className="next-btn-text">NEXT</p>
            </div>
        </div >
    );
};

export default Instructions;


