import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Instructions.module.css";
import HappyGal from "../../assets/img/HappyGal.svg";


const Instructions = ({ onSendData }) => {

    // const { data } = useData();
    // const Instructions = data.Instructions[0].text;

    const [step, setStep] = useState(0);

    return (
        <div className="instructions-page">
            {/* <h1>{Instructions}</h1> */}
            <p className="main-header-text">This is lomdat Savana!</p>
            <img src={HappyGal} className={styles.instructionsGal} alt="happy-gal" />
            {step === 0 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>hi i am bubble text</p>
                    </div>
                </>}
            <div className={`next-btn ${styles.nextBtn}`}>
                <p className="next-btn-text">NEXT</p>
            </div>
        </div >
    );
};

export default Instructions;


