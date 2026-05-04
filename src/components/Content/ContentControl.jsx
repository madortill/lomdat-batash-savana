import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "./ContentPages.js";

const ContentControl = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(() => {
        const savedStep = sessionStorage.getItem("currentStep");
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const [canProceed, setCanProceed] = useState(() => {
        return sessionStorage.getItem("canProceed_step0") === "true";
    });

    useEffect(() => {
        sessionStorage.setItem("currentStep", step);
        const alreadyDone = sessionStorage.getItem(`canProceed_step${step}`) === "true";
        const autoEnabled = pages[step].isAutoEnabled;
        if (alreadyDone || autoEnabled) {
            setCanProceed(true);
        } else {
            setCanProceed(false);
        }
    }, [step]);

    const handleNext = () => {
        if (!canProceed) return;

        if (step === pages.length - 1) {
            navigate("/End");
        } else {
            const nextStep = step + 1;
            setStep(nextStep);
            if (pages[nextStep].isAutoEnabled) {
                setCanProceed(true);
            } else {
                setCanProceed(false);
            }
        }
    };

    const handleBack = () => {
        if (step === 0) {
            navigate("/NavPage");
        } else {
            setStep(s => s - 1);
            setCanProceed(true);
        }
    };

    const CurrentPage = pages[step].component;

    return (
        <div className="content-container">
            <CurrentPage
                onComplete={() => {
                    setCanProceed(true);
                    sessionStorage.setItem("canProceed_step0", "true");
                }}
                onNext={handleNext}
                onBack={handleBack}
                canProceed={canProceed}
            />
        </div>
    );
};

export default ContentControl;