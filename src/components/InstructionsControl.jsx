import { useState } from "react";
import InstructionsLanguage from "./Instructions/InstructionsLanguage";

const InstructionsControl = () => {

    const [step, setStep] = useState(0);

    return (
        <div className="practice-container">
            {step === 0 && <InstructionsLanguage />}
        </div>
    );
};

export default InstructionsControl;

