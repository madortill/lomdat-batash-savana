import { useState } from "react";
import ContentIntro from "./ContentIntro/ContentIntro";

const ContentControl = () => {

    const [step, setStep] = useState(0);

    return (
        <div className="practice-container">
            {step === 0 && <ContentIntro />}
        </div>
    );
};

export default ContentControl;

