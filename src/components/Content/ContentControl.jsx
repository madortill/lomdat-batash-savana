import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "./ContentPages.js";
import Navbar from "../elements/Navbar/NavBar";

const ContentControl = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(() => {
        const saved = sessionStorage.getItem("currentStep");
        return saved ? parseInt(saved, 10) : 0;
    });

    const [highestStep, setHighestStep] = useState(() => {
        return parseInt(sessionStorage.getItem("highestStep") || "0", 10);
    });

    const getCanProceedForStep = (stepIndex) => {
        if (pages[stepIndex].isAutoEnabled) return true;
        return sessionStorage.getItem(`canProceed_step${stepIndex}`) === "true";
    };

    const [canProceed, setCanProceed] = useState(() => getCanProceedForStep(0));

    useEffect(() => {
        sessionStorage.setItem("currentStep", step);
        setCanProceed(getCanProceedForStep(step));

        if (step > highestStep) {
            setHighestStep(step);
            sessionStorage.setItem("highestStep", step.toString());
        }
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

    const handleNavbarNavigate = (targetStep) => {
        setStep(targetStep);
    };

    const CurrentPage = pages[step].component;
    const topics = pages.map(p => ({ label: p.label ?? `שלב ${p + 1}` }));

    return (
        <div className="content-container">
            <Navbar
                topics={topics}
                currentStep={step}
                accessibleCount={highestStep + 1}
                onNavigate={handleNavbarNavigate}
            />

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