import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Instructions.module.css";
import HappyGal from "../../assets/img/gal/HappyGal.svg";
import backButton from "../../assets/img/backBtn.svg";
import noAudio from "../../assets/img/noAudio.svg";
import audio from "../../assets/img/audio.svg";
import arrow from "../../assets/img/curvedArrow1.svg";
import navbarImg from "../../assets/img/navbar.png";
import Popups from "../elements/Popups/Popups";
import DisabledButton from "../elements/ChildPopups/DisabledButton/DisabledButton";

const INSTRUCTIONS_STEP_STORAGE_KEY = "instructions_current_step";
const LANGUAGE_STORAGE_KEY = "instructions_selected_language";
const AUDIO_STORAGE_KEY = "instructions_selected_audio";
const languages = [{ id: "HE", label: "עב" }, { id: "EN", label: "EN" }, { id: "RU", label: "Рус" }, { id: "AR", label: "ער" }];

const LanguageIcon = ({ circleColor, textColor, label }) => (
    <svg className={styles.languageIcon} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_25_60)"><circle cx="35.941" cy="31.941" r="31.941" fill={circleColor} /></g>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={textColor} fontSize="25" fontWeight="700" fontFamily="Assistant">{label}</text>
        <defs>
            <filter id="filter0_d_25_60" x="0" y="0" width="71.882" height="71.882" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" /><feGaussianBlur stdDeviation="2" /><feComposite in2="hardAlpha" operator="out" />
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

    const [step, setStep] = useState(() => {
        const savedStep = sessionStorage.getItem(INSTRUCTIONS_STEP_STORAGE_KEY);
        return savedStep ? Number(savedStep) : 0;
    });

    const [selectedLang, setSelectedLang] = useState(() => sessionStorage.getItem(LANGUAGE_STORAGE_KEY) || null);
    const [selectedAudio, setSelectedAudio] = useState(() => sessionStorage.getItem(AUDIO_STORAGE_KEY) || null);
    const [showDisabledPopup, setShowDisabledPopup] = useState(false);

    if (!data || !data.general || !data.Instructions) return null;

    const [backBtn, nextBtn, InstructionsHeader, InstructionsBubbleTextLanguage] = [data.general[0].text, data.general[1].text, data.Instructions[0].text, data.Instructions[1].text];
    const { text1: audioText1, text2: audioText2, yesAudio, noAudio: audioLabelNo } = data.Instructions[2];
    const { textBubble: buttonsText, nextBtn: nextHelp, backBtn: backHelp, nav: navHelp } = data.Instructions[3];
    const disabledPopupData = data.Instructions[4];
    const canContinue = step === 0 ? !!selectedLang : step === 1 ? !!selectedAudio : true;

    const handleLanguageSelect = (id) => { setSelectedLang(id); sessionStorage.setItem(LANGUAGE_STORAGE_KEY, id); };
    const handleAudioSelect = (choice) => { setSelectedAudio(choice); sessionStorage.setItem(AUDIO_STORAGE_KEY, choice); };

    const handleNext = () => {
        if (!canContinue) return;

        if (step < 2) {
            setStep((prev) => prev + 1);
            return;
        }

        setShowDisabledPopup(true);
    };

    const handleDisabledPopupClose = () => {
        setShowDisabledPopup(false);
        navigate("/Opening");
    };

    const handleBack = () => step > 0 ? setStep((prev) => prev - 1) : navigate("/");

    useEffect(() => {
        sessionStorage.setItem(INSTRUCTIONS_STEP_STORAGE_KEY, String(step));
    }, [step]);

    return (
        <div className={`instructions-page ${styles.page} ${step === 2 ? styles.step2Page : ""}`}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={handleBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{InstructionsHeader}</h1>

            <img src={HappyGal} className={styles.instructionsGal} alt="happy-gal" />

            {step === 0 && (
                <div className={styles.textBox}>
                    <p className={styles.bubbleText}>{InstructionsBubbleTextLanguage}</p>
                    <div className={styles.languagesDiv}>
                        {languages.map((lang) => (
                            <div key={lang.id} onClick={() => handleLanguageSelect(lang.id)} className={styles.languageBtnWrapper}>
                                <LanguageIcon label={lang.label} circleColor={selectedLang === lang.id ? "#E69907" : "#FFF2B4"} textColor={selectedLang === lang.id ? "#FFF2B4" : "#073799"} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className={styles.textBox}>
                    <p className={styles.bubbleText}>{audioText1}</p>
                    <div className={styles.audioDiv}>
                        {[
                            { type: "with", text: yesAudio, img: audio, styleClass: styles.audioBtn },
                            { type: "without", text: audioLabelNo, img: noAudio, styleClass: styles.noAudioBtn }
                        ].map(({ type, text, img, styleClass }) => (
                            <button key={type} className={`${styleClass} ${selectedAudio === type ? styles.audioBtnSelected : ""}`} onClick={() => handleAudioSelect(type)}>
                                {text} <img src={img} alt="audio status" />
                            </button>
                        ))}
                    </div>
                    <p className={styles.bubbleText}>{audioText2}</p>
                </div>
            )}

            {step === 2 && (
                <>
                    <div className={`${styles.textBox} ${styles.step2TextBox}`}>
                        <p className={styles.bubbleText}>{buttonsText}</p>
                    </div>

                    {/* בועת חזרה - פינה ימנית עליונה */}
                    <div className={`${styles.helpBubble} ${styles.backHelp}`}>
                        <div className={styles.backHelpDiv}>
                            <img src={arrow} alt="" className={`${styles.helpArrow} ${styles.backArrow}`} />
                            <p className={styles.helpText}>{backHelp}</p>
                        </div>
                    </div>

                    {/* בועת התקדם - פינה שמאלית תחתונה */}
                    <div className={`${styles.helpBubble} ${styles.nextHelp}`}>
                        <div className={styles.nextHelpDiv}>
                            <p className={styles.helpText}>{nextHelp}</p>
                            <img src={arrow} alt="" className={`${styles.helpArrow} ${styles.nextArrow}`} />
                        </div>
                    </div>

                    {/* בועת תפריט ניווט - פינה ימנית תחתונה */}
                    <div className={`${styles.helpBubble} ${styles.navHelp}`}>
                        <div className={styles.navHelpInner}>
                            <div className={styles.navHelpInnerDiv}>
                                <p className={styles.navHelpText}>{navHelp}</p>
                                <img src={arrow} alt="" className={`${styles.helpArrow} ${styles.navArrow}`} />
                            </div>
                            <img src={navbarImg} alt="תפריט ניווט" className={styles.navbarPreview} />
                        </div>
                    </div>
                </>
            )}

            <div className={`${canContinue ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={handleNext}>
                <p className={canContinue ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>

            {showDisabledPopup && disabledPopupData && (
                <Popups onClose={handleDisabledPopupClose} showClose={false} closeOnBackdrop={false}>
                    <DisabledButton
                        text1={disabledPopupData.text1}
                        buttonText={disabledPopupData.buttonText}
                        text2={disabledPopupData.text2}
                        onClose={handleDisabledPopupClose}
                    />
                </Popups>
            )}

        </div>
    );
};

export default Instructions;