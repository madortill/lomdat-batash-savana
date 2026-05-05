import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "./ContentPages.js";

const ContentControl = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(() => {
        const savedStep = sessionStorage.getItem("currentStep");
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const getCanProceedForStep = (stepIndex) => {
        if (pages[stepIndex].isAutoEnabled) return true;
        return sessionStorage.getItem(`canProceed_step${stepIndex}`) === "true";
    };

    const [canProceed, setCanProceed] = useState(() => getCanProceedForStep(0));

    useEffect(() => {
        sessionStorage.setItem("currentStep", step);
        setCanProceed(getCanProceedForStep(step));
    }, [step]);

    const handleNext = () => {
        if (!canProceed) return;
        if (step === pages.length - 1) {
            navigate("/End");
        } else {
            setStep(s => s + 1);
        }
    };

    const handleBack = () => {
        if (step === 0) {
            navigate("/NavPage");
        } else {
            setStep(s => s - 1);
        }
    };

    const CurrentPage = pages[step].component;

    return (
        <div className="content-container">
            <CurrentPage
                onComplete={() => {
                    setCanProceed(true);
                    sessionStorage.setItem(`canProceed_step${step}`, "true");
                }}
                onNext={handleNext}
                onBack={handleBack}
                canProceed={canProceed}
            />
        </div>
    );
};

export default ContentControl;