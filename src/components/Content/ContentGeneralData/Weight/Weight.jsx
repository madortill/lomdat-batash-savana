import { useEffect } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Weight.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import kettlebell from "../../../../assets/img/generalDataCards/kettlebell.svg";

const Weight = ({ onBack }) => {
    const { data } = useData();

    useEffect(() => {
        sessionStorage.setItem("completed_weight", "true");
    }, []);

    if (!data || !data.cWeight) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const title = data.cWeight[0].text;
    const items = data.cWeight[1].items;

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={() => onBack({ completed: true })}
                    alt="back"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{title}</h1>

            <div className={styles.contentFrame}>
                <div className={styles.weightContainer}>
                    {items.map((item, i) => (
                        <div
                            key={item.id}
                            className={`${styles.weightItem} ${styles[`weightItem${i}`]}`}
                        >
                            <p className={styles.weightLabel}>{item.label}</p>

                            <div className={styles.kettlebellWrapper}>
                                <img
                                    src={kettlebell}
                                    alt={item.label}
                                    className={`${styles.kettlebell} ${styles[`kettlebell${i}`]}`}
                                />
                                <p className={styles.weightValue}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="next-btn"
                onClick={() => onBack({ completed: true })}
            >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Weight;