import styles from "./SafetyABS.module.css";
import { useData } from "../../../../context/DataContext";
import CommentGal from "../../CommentGal/CommentGal";
import absOnImg from "../../../../assets/img/absOn.svg";
import absOffImg from "../../../../assets/img/absOff.svg";
import arrowSvg from "../../../../assets/img/curvedArrow1.svg";

const SafetyABS = ({ onClose }) => {
    const { data } = useData();

    if (!data?.cSafetyABS) return null;

    const title = data.cSafetyABS[0].text;
    const headerRight = data.cSafetyABS[1].text;
    const headerLeft = data.cSafetyABS[2].text;
    const textRight = data.cSafetyABS[3].text;
    const textLeft = data.cSafetyABS[4].text;
    const arrowTextRight = data.cSafetyABS[5].text;
    const arrowTextLeft = data.cSafetyABS[6].text;
    const commentText = data.cSafetyABS[7].text;
    const confirmText = data.cSafetyABS[8].text;

    return (
        <div className={styles.popup} dir="rtl">
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.contentGrid}>
                <div className={styles.textColumn}>
                    <h3 className={styles.columnHeader}>{headerRight}</h3>
                    <p className={styles.columnText}>{textRight}</p>
                </div>
                <div className={styles.textColumn}>
                    <h3 className={styles.columnHeader}>{headerLeft}</h3>
                    <p className={styles.columnText}>{textLeft}</p>
                </div>
            </div>

            <div className={styles.imagesGrid}>
                <div className={styles.imageWrapper}>
                    <img
                        src={absOffImg}
                        alt="רכב מאבד שליטה ללא ABS"
                        className={`${styles.image} ${styles.redImg}`}
                    />
                    <img
                        src={arrowSvg}
                        alt="חץ סימון"
                        className={styles.arrowRight}
                    />
                    <span className={styles.labelRight}>{arrowTextRight}</span>
                </div>

                <div className={styles.imageWrapper}>
                    <img
                        src={absOnImg}
                        alt="רכב עם מערכת ABS"
                        className={`${styles.image} ${styles.greenImg}`}
                    />
                    <img
                        src={arrowSvg}
                        alt="חץ סימון"
                        className={styles.arrowLeft}
                    />
                    <span className={styles.labelLeft}>{arrowTextLeft}</span>
                </div>
            </div>

            <div className={styles.commentWrapper}>
                <CommentGal
                    text={commentText}
                    mood="red"
                    characterSide="right"
                    size="small"
                />
            </div>

            <div className={styles.confirmBtn} onClick={onClose}>
                {confirmText}
            </div>
        </div>
    );
};

export default SafetyABS;

// import styles from "./SafetyABS.module.css";
// import { useData } from "../../../../context/DataContext";
// import CommentGal from "../../CommentGal/CommentGal";
// import absOnImg from "../../../../assets/img/absOn.svg";
// import absOffImg from "../../../../assets/img/absOff.svg";
// import arrowSvg from "../../../../assets/img/curvedArrow1.svg";

// const SafetyABS = ({ onClose }) => {
//     const { data } = useData();

//     if (!data?.cSafetyABS) return null;

//     const title = data.cSafetyABS[0].text;
//     const headerRight = data.cSafetyABS[1].text;
//     const headerLeft = data.cSafetyABS[2].text;
//     const textRight = data.cSafetyABS[3].text;
//     const textLeft = data.cSafetyABS[4].text;
//     const arrowTextRight = data.cSafetyABS[5].text;
//     const arrowTextLeft = data.cSafetyABS[6].text;
//     const commentText = data.cSafetyABS[7].text;
//     const confirmText = data.cSafetyABS[8].text;

//     return (
//         <div className={styles.popup} dir="rtl">
//             <h2 className={styles.title}>{title}</h2>

//             <div className={styles.contentGrid}>
//                 <div className={styles.textColumn}>
//                     <h3 className={styles.columnHeader}>{headerRight}</h3>
//                     <p className={styles.columnText}>{textRight}</p>
//                 </div>
//                 <div className={styles.textColumn}>
//                     <h3 className={styles.columnHeader}>{headerLeft}</h3>
//                     <p className={styles.columnText}>{textLeft}</p>
//                 </div>
//             </div>

//             <div className={styles.imagesGrid}>
//                 <div className={styles.imageWrapper}>
//                     <img
//                         src={absOffImg}
//                         alt="רכב מאבד שליטה ללא ABS"
//                         className={`${styles.image} ${styles.redImg}`}
//                     />
//                     <img
//                         src={arrowSvg}
//                         alt="חץ סימון"
//                         className={styles.arrowRight}
//                     />
//                     <span className={styles.labelRight}>{arrowTextRight}</span>
//                 </div>

//                 <div className={styles.imageWrapper}>
//                     <img
//                         src={absOnImg}
//                         alt="רכב עם מערכת ABS"
//                         className={`${styles.image} ${styles.greenImg}`}
//                     />
//                     <img
//                         src={arrowSvg}
//                         alt="חץ סימון"
//                         className={styles.arrowLeft}
//                     />
//                     <span className={styles.labelLeft}>{arrowTextLeft}</span>
//                 </div>
//             </div>

//             <div className={styles.bottomRow}>
//                 <div className={styles.commentWrapper}>
//                     <CommentGal
//                         text={commentText}
//                         mood="red"
//                         characterSide="right"
//                         size="small"
//                     />
//                 </div>

//                 <button className={styles.confirmBtn} onClick={onClose}>
//                     {confirmText}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SafetyABS;