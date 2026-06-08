import ContentIntro from "./ContentIntro/ContentIntro";
import ContentIntroPage2 from "./ContentIntroPage2/ContentIntroPage2";
import ContentIntroPage3 from "./ContentIntroPage3/ContentIntroPage3";
import ContentKnowingTheVehicle from "./ContentKnowingTheVehicle/ContentKnowingTheVehicle";
import ContentGeneralData from "./ContentGeneralData/ContentGeneralData";
import ContentIndicatorLights from "./ContentIndicatorLights/ContentIndicatorLights";
import ContentMetrics from "./ContentMetrics/ContentMetrics";
import VehicleOperationOpeningPage from "./VehicleOperationOpeningPage/VehicleOperationOpeningPage";
import VehicleOperationOpeningChecks from "./VOOpeningChecks/VOOpeningChecks";
import VOChecks from "./VOChecks/VOChecks";
import VOOpeningGearbox from "./VOOpeningGearbox/VOOpeningGearbox";
import VOGearbox from "./VOGearbox/VOGearbox";
import VOGearboxPractice from "./VOGearboxPractice/VOGearboxPractice";
import VOOpeningWheel from "./VOOpeningWheel/VOOpeningWheel";
import VOWheel from "./VOWheel/VOWheel";
import VOOpeningBreak from "./VOOpeningBreak/VOOpeningBreak";
import VOBreak from "./VOBreak/VOBreak";
import VOBreakPractice from "./VOBreakPractice/VOBreakPractice";
import Safety from "./Safety/Safety";

export const pages = [
    { component: ContentIntro, isAutoEnabled: false, label: "מבוא", navId: "intro" },
    { component: ContentIntroPage2, isAutoEnabled: false, label: "עמוד" },
    { component: ContentIntroPage3, isAutoEnabled: true, label: "עמוד" },

    { component: ContentKnowingTheVehicle, isAutoEnabled: true, label: "הכרת הרכב", navId: "knowingVehicle" },
    { component: ContentGeneralData, isAutoEnabled: false, label: "נתונים כלליים" },

    { component: ContentIndicatorLights, isAutoEnabled: false, label: "נורות חיווי", navId: "indicatorLights" },
    { component: ContentMetrics, isAutoEnabled: false, label: "מדדים" },

    { component: VehicleOperationOpeningPage, isAutoEnabled: true, label: "תפעול הרכב", navId: "vehicleOperation" },
    { component: VehicleOperationOpeningChecks, isAutoEnabled: false, label: "עמוד" },
    { component: VOChecks, isAutoEnabled: false, label: "עמוד" },
    { component: VOOpeningGearbox, isAutoEnabled: true, label: "עמוד" },
    { component: VOGearbox, isAutoEnabled: true, label: "עמוד" },
    { component: VOGearboxPractice, isAutoEnabled: false, label: "עמוד" },
    { component: VOOpeningWheel, isAutoEnabled: false, label: "עמוד" },
    { component: VOWheel, isAutoEnabled: false, label: "עמוד" },
    { component: VOOpeningBreak, isAutoEnabled: false, label: "עמוד" },
    { component: VOBreak, isAutoEnabled: true, label: "עמוד" },
    { component: VOBreakPractice, isAutoEnabled: false, label: "עמוד" },

    { component: Safety, isAutoEnabled: false, label: "דגשי בטיחות", navId: "safety" }
];