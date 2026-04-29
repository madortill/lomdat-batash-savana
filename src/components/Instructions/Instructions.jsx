import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Instructions.module.css";
import HappyGal from "../../assets/img/gal/HappyGal.svg";
import backButton from "../../assets/img/backBtn.svg";
import noAudio from "../../assets/img/noAudio.svg";
import audio from "../../assets/img/audio.svg";

// language selection
const LanguageIcon = ({ circleColor, textColor, label }) => (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_25_60)">
            <circle cx="35.941" cy="31.941" r="31.941" fill={circleColor} />
        </g>
        <text 
            x="50%" 
            y="50%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fill={textColor} 
            fontSize="clamp(1rem, 2vw, 1.5rem)" 
            fontWeight="700"
            fontFamily="Assistant"
        >
            {label}
        </text>
        <defs>
            <filter id="filter0_d_25_60" x="0" y="0" width="71.882" height="71.882" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_60" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_60" result="shape" />
            </filter>
        </defs>
    </svg>
);

const Instructions = () => {
    const { data } = useData();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const TOTAL_STEPS = 2;
    const [selectedLang, setSelectedLang] = useState('HE');

    const languages = [
        { id: 'HE', label: 'עב' },
        { id: 'EN', label: 'EN' },
        { id: 'RU', label: 'Рус' },
        { id: 'AR', label: 'ער' }
    ];

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

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const InstructionsHeader = data.Instructions[0].text;
    const InstructionsBubbleTextLanguage = data.Instructions[1].text;
    const InstructionsBubbleTextAudio1 = data.Instructions[2].text1;
    const InstructionsBubbleTextAudio2 = data.Instructions[2].text2;
    const InstructionsBubbleTextAudioWith = data.Instructions[2].yesAudio;
    const InstructionsBubbleTextAudioWithout = data.Instructions[2].noAudio;
    const InstructionsBubble = data.Instructions[3].textBubble;

    return (
        <div className="instructions-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={handleBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{InstructionsHeader}</h1>
            <img src={HappyGal} className={styles.instructionsGal} alt="happy-gal" />
            
            {step === 0 &&
                <div className={styles.textBox}>
                    <p className={styles.bubbleText}>{InstructionsBubbleTextLanguage}</p>
                    <div className={styles.languagesDiv}>
                        {languages.map((lang) => (
                            <div 
                                key={lang.id} 
                                onClick={() => setSelectedLang(lang.id)} 
                                className={styles.languageBtnWrapper}
                            >
                                <LanguageIcon 
                                    label={lang.label}
                                    circleColor={selectedLang === lang.id ? "#E69907" : "#FFF2B4"} 
                                    textColor={selectedLang === lang.id ? "#FFF2B4" : "#073799"} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }

            {step === 1 &&
                <div className={styles.textBox}>
                    <p className={styles.bubbleText}>{InstructionsBubbleTextAudio1}</p>
                    <button>{InstructionsBubbleTextAudioWith} <img src={audio} alt="audio btn" /></button>
                    <button>{InstructionsBubbleTextAudioWithout} <img src={noAudio} alt="audio btn" /></button>
                    <p className={styles.bubbleText}>{InstructionsBubbleTextAudio2}</p>
                </div>
            }

            {step === 2 &&
                <div className={styles.textBox}>
                    <p className={styles.bubbleText}>{InstructionsBubble}</p>
                </div>
            }

            <div className={`next-btn ${styles.nextBtn}`} onClick={handleNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Instructions;