import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "./Instructions.css";


const Instructions = ({ onSendData }) => {

    // const { data } = useData();
    // const introTitle = data.infoPageLanguage[0].text;

    return (
        <div className="instructions-page">
            {/* <h1>{introTitle}</h1> */}
            <p>This is lomdat Savana!!!</p>
        </div>
    );
};

export default Instructions;
