import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOBreak.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import breakIntroImg from "../../../assets/img/breaksIntro.svg";
import CommentGal from "../../elements/CommentGal/CommentGal";

const Break = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.cBreak) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const Title = data.cBreak[0].text;
    const Text = data.cBreak[1].text;
    const TextSmall = data.cBreak[2].text;
    const commentText = data.cBreak[3].text;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{Title}</h1>
            <p className={`standard-text ${styles.text}`} dangerouslySetInnerHTML={{ __html: Text }} />
            <div className={styles.imgDiv}>
                <img src={breakIntroImg} alt="urban" className={styles.breakImg} />
                <p className={`standard-text ${styles.smallText}`}>{TextSmall}</p>
            </div>
            <div className={styles.commentWrapper}>
                <CommentGal
                    text={commentText}
                    mood="red"
                    characterSide="right"
                    size="small"
                />
            </div>
            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Break;