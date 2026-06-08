import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "./ContentPages.js";
import NavBar from "../elements/NavBar/NavBar";
import { useData } from "../../context/DataContext";

const ContentControl = () => {
    const navigate = useNavigate();
    const { data } = useData();

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

    const [canProceed, setCanProceed] = useState(() => getCanProceedForStep(step));

    useEffect(() => {
        sessionStorage.setItem("currentStep", step.toString());
        setCanProceed(getCanProceedForStep(step));

        if (step > highestStep) {
            setHighestStep(step);
            sessionStorage.setItem("highestStep", step.toString());
        }
    }, [step, highestStep]);

    const handleNext = () => {
        if (!canProceed) return;

        if (step === pages.length - 1) {
            navigate("/End");
        } else {
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        if (step === 0) {
            navigate("/NavPage");
        } else {
            setStep((s) => s - 1);
        }
    };

    const handleNavbarNavigate = (targetStep) => {
        setStep(targetStep);
    };

    const CurrentPage = pages[step].component;

    return (
        <div className="content-container">
            <NavBar
                topics={pages}
                currentPage={step}
                accessiblePageCount={highestStep + 1}
                onNavigate={handleNavbarNavigate}
                labels={data?.navbar}
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