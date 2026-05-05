import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIntro.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import arrowIntro from "../../../assets/img/arrowIntro.svg";
import CommentGal from "../../elements/CommentGal/CommentGal";
import checkmark from "../../../assets/img/checkmark.svg";

// carousel car imgs
import savanna from "../../../assets/img/carousel/savanna.svg";
import ford from "../../../assets/img/carousel/ford.svg";
import toyota from "../../../assets/img/carousel/toyota.svg";
import ecoline from "../../../assets/img/carousel/ecoline.svg";
import citroen from "../../../assets/img/carousel/citroen.svg";

const imageMap = {
    savanna,
    ford,
    toyota,
    ecoline,
    citroen
};

const ContentIntro = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [seenSlides, setSeenSlides] = useState(() => {
        const saved = sessionStorage.getItem("seenSlides_contentIntro");
        return saved ? new Set(JSON.parse(saved)) : new Set([0]);
    });
    const slides = data.carousel;
    const total = slides.length;
    const { label, image } = slides[current];

    const goTo = (index) => {
        setCurrent(index);
        setSeenSlides(prev => {
            const updated = new Set(prev).add(index);
            sessionStorage.setItem("seenSlides_contentIntro", JSON.stringify([...updated]));
            if (updated.size === total) {
                onComplete();
            }
            return updated;
        });
    };

    if (!data || !data.general || !data.Opening) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const introTitle = data.CIntro[0].text;
    const introText1 = data.CIntro[1].text;
    const introText2 = data.CIntro[2].text;
    const cIntroArrowText = data.CIntro[3].text;
    const cIntroCommentText = data.CIntro[4].text;

    const prev = () => goTo((current - 1 + total) % total);
    const next = () => goTo((current + 1) % total);

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv" >
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{introTitle}</h1>
            <p className={`standard-text ${styles.introText1}`} dangerouslySetInnerHTML={{ __html: introText1 }} />
            <p className={`standard-text ${styles.introText2}`}>{introText2}</p>
            <div className={styles.carousel}>
                <div className={styles.slideWrapper}>
                    <button className={styles.arrow} onClick={next}>›</button>
                    <button className={styles.arrow} onClick={prev}>‹</button>
                    {/* Slide */}
                    <div className={styles.slide}>
                        {seenSlides.has(current) && (
                            <img src={checkmark} alt="visited" className={styles.slideCheckmark} />
                        )}
                        <div className={styles.imageContainer}>
                            <img
                                src={imageMap[image]}
                                alt={label}
                                className={styles.slideImage}
                            />
                        </div>
                        <p className={styles.slideLabel}>{label}</p>
                    </div>
                    {/* Dots */}
                </div>
                <div className={styles.dots}>
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.introArrowDiv}>
                <p className={`arrow-text ${styles.introArrowText}`}>{cIntroArrowText}</p>
                <img src={arrowIntro} alt="arrow" className={styles.introArrow} />
            </div>
            <div className={styles.commentGalWrapper}>
                <CommentGal
                    text={cIntroCommentText}
                    mood="orange"
                    characterSide="right"
                    size="large"
                />
            </div>
            <div className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={onNext} >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"} >{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentIntro;