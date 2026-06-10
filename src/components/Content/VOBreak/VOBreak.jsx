import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOBreak.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import breakIntroImg from "../../../assets/img/breaksIntro.svg";
import CommentGal from "../../elements/CommentGal/CommentGal";

const NEXT_ANIMATION_KEY = "VOBreak_next_animation_seen";

const Break = ({ onNext, onBack }) => {
    const { data } = useData();
    const [isAnimatingNext, setIsAnimatingNext] = useState(false);

    if (!data || !data.general || !data.cBreak) return null;

    const [backBtn, nextBtn] = [data.general[0].text, data.general[1].text];
    const [Title, Text, TextSmall, commentText] = [data.cBreak[0].text, data.cBreak[1].text, data.cBreak[2].text, data.cBreak[3].text];

    const handleNext = () => {
        if (isAnimatingNext) return;
        if (sessionStorage.getItem(NEXT_ANIMATION_KEY) === "true") { onNext?.(); return; }

        sessionStorage.setItem(NEXT_ANIMATION_KEY, "true");
        setIsAnimatingNext(true);
        setTimeout(() => onNext?.(), 900);
    };

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{Title}</h1>
            <p className={`standard-text ${styles.text}`} dangerouslySetInnerHTML={{ __html: Text }} />

            <div className={`${styles.imgDiv} ${isAnimatingNext ? styles.imgDivZoom : ""}`}>
                <img src={breakIntroImg} alt="בלם חניה" className={styles.breakImg} />
                <p className={`standard-text ${styles.smallText} ${isAnimatingNext ? styles.fadeOut : ""}`}>{TextSmall}</p>
            </div>

            <div className={`${styles.commentWrapper} ${isAnimatingNext ? styles.fadeOut : ""}`}>
                <CommentGal text={commentText} mood="red" characterSide="right" size="medium" />
            </div>

            <div className={`next-btn ${styles.nextBtn} ${isAnimatingNext ? styles.nextBtnLocked : ""}`} onClick={handleNext}>
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Break;