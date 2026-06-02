// import styles from "./SafetyCooling.module.css";
// import { useData } from "../../../../context/DataContext";
// import CommentGal from "../../CommentGal/CommentGal";
// import coolingImgRight from "../../../../assets/img/cooling1.svg";
// import coolingImgCenter from "../../../../assets/img/cooling2.svg";
// import coolingImgLeft from "../../../../assets/img/cooling3.svg";

// const SafetyCooling = ({ onClose }) => {
//     const { data } = useData();

//     if (!data?.cSafetyCooling) return null;

//     const title = data.cSafetyCooling[0].text;
//     const textRight = data.cSafetyCooling[1].text;
//     const textCenter = data.cSafetyCooling[2].text;
//     const textLeft = data.cSafetyCooling[3].text;
//     const commentText = data.cSafetyCooling[4].text;
//     const confirmText = data.cSafetyCooling[5].text;

//     return (
//         <div className={styles.popup} dir="rtl">
//             <h2 className={styles.title}>{title}</h2>

//             <div className={styles.contentGrid}>
//                 <div className={styles.column}>
//                     <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
//                         <img
//                             src={coolingImgRight}
//                             alt="אזהרת פתיחת מכסה"
//                             className={`${styles.image} ${styles.imgRight}`}
//                         />
//                     </div>
//                     <p className={styles.columnText}>{textRight}</p>
//                 </div>

//                 <div className={styles.column}>
//                     <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
//                         <img
//                             src={coolingImgCenter}
//                             alt="איסור הסרת מכסה"
//                             className={`${styles.image} ${styles.imgCenter}`}
//                         />
//                     </div>
//                     <p className={styles.columnText}>{textCenter}</p>
//                 </div>

//                 <div className={styles.column}>
//                     <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
//                         <img
//                             src={coolingImgLeft}
//                             alt="איסור הוספת נוזל"
//                             className={`${styles.image} ${styles.imgLeft}`}
//                         />
//                     </div>
//                     <p className={styles.columnText}>{textLeft}</p>
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

// export default SafetyCooling;



import styles from "./SafetyCooling.module.css";
import { useData } from "../../../../context/DataContext";
import CommentGal from "../../CommentGal/CommentGal";
import coolingImgRight from "../../../../assets/img/cooling1.svg";
import coolingImgCenter from "../../../../assets/img/cooling2.svg";
import coolingImgLeft from "../../../../assets/img/cooling3.svg";

const SafetyCooling = ({ onClose }) => {
    const { data } = useData();

    if (!data?.cSafetyCooling) return null;

    const title = data.cSafetyCooling[0].text;
    const textRight = data.cSafetyCooling[1].text;
    const textCenter = data.cSafetyCooling[2].text;
    const textLeft = data.cSafetyCooling[3].text;
    const commentText = data.cSafetyCooling[4].text;
    const confirmText = data.cSafetyCooling[5].text;

    return (
        <div className={styles.popup} dir="rtl">
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.contentGrid}>
                <div className={styles.column}>
                    <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
                        <img
                            src={coolingImgRight}
                            alt="אזהרת פתיחת מכסה"
                            className={`${styles.image} ${styles.imgRight}`}
                        />
                    </div>
                    <p className={styles.columnText}>{textRight}</p>
                </div>

                <div className={styles.column}>
                    <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
                        <img
                            src={coolingImgCenter}
                            alt="איסור הסרת מכסה"
                            className={`${styles.image} ${styles.imgCenter}`}
                        />
                    </div>
                    <p className={styles.columnText}>{textCenter}</p>
                </div>

                <div className={styles.column}>
                    <div className={`${styles.imageWrapper} ${styles.redBorder}`}>
                        <img
                            src={coolingImgLeft}
                            alt="איסור הוספת נוזל"
                            className={`${styles.image} ${styles.imgLeft}`}
                        />
                    </div>
                    <p className={styles.columnText}>{textLeft}</p>
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

export default SafetyCooling;