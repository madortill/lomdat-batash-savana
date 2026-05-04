import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIntroPage3.module.css";
import backButton from "../../../assets/img/backBtn.svg";

const ContentIntroPage3 = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.CIntro3) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const intro3Title = data.CIntro3[0].text;
    const tableData = data.CIntro3[1].tableData;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{intro3Title}</h1>
            <table className={styles.hoverTable}>
                <tbody>
                    {tableData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((cellText, colIdx) => (
                                <td key={colIdx} className={`${rowIdx === 0 ? styles.firstRow : ""} ${rowIdx === 0 || colIdx === 0 ? styles.boldCell : ""}`} >
                                    {cellText}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentIntroPage3;
