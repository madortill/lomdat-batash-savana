import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Instructions.module.css";
import HappyGal from "../../assets/img/gal/HappyGal.svg";
import backButton from "../../assets/img/backBtn.svg";
import noAudio from "../../assets/img/noAudio.svg";
import audio from "../../assets/img/audio.svg";
import hebrew from "../../assets/img/language/hebrew.svg";


const Instructions = () => {

    const { data } = useData();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const TOTAL_STEPS = 2;

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(prev => prev + 1);
        } else {
            navigate("/Opening");
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        } else {
            navigate("/");
        }
    };

    // general
    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    // step0 - language
    const Instructions = data.Instructions[0].text;
    const InstructionsBubbleTextLanguage = data.Instructions[1].text;
    // step1 - audio
    const InstructionsBubbleTextAudio1 = data.Instructions[2].text1;
    const InstructionsBubbleTextAudio2 = data.Instructions[2].text2;
    const InstructionsBubbleTextAudioWith = data.Instructions[2].yesAudio;
    const InstructionsBubbleTextAudioWithout = data.Instructions[2].noAudio;
    // step2 - btns
    const InstructionsBubble = data.Instructions[3].textBubble;

    return (
        <div className="instructions-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={handleBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{Instructions}</h1>
            <img src={HappyGal} className={styles.instructionsGal} alt="happy-gal" />
            {step === 0 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>{InstructionsBubbleTextLanguage}</p>
                        <div className={styles.languagesDiv}>
                            <img src={hebrew} alt="hebrew" className={styles.languageBtn}/>
                            <img src={hebrew} alt="english" className={styles.languageBtn}/>
                            <img src={hebrew} alt="arabic" className={styles.languageBtn}/>
                            <img src={hebrew} alt="russian" className={styles.languageBtn}/>
                        </div>
                    </div>
                </>}
            {step === 1 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>{InstructionsBubbleTextAudio1}</p>
                        <button>{InstructionsBubbleTextAudioWith} <img src={audio} alt="audio btn" /></button>
                        <button>{InstructionsBubbleTextAudioWithout} <img src={noAudio} alt="audio btn" /></button>
                        <p className={styles.bubbleText}>{InstructionsBubbleTextAudio2}</p>
                    </div>
                </>}
            {step === 2 &&
                <>
                    <div className={styles.textBox}>
                        <p className={styles.bubbleText}>{InstructionsBubble}</p>
                    </div>
                </>}
            <div className={`next-btn ${styles.nextBtn}`} onClick={handleNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div >
    );
};

export default Instructions;


