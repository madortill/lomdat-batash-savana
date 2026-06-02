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
    { component: ContentIntro, isAutoEnabled: false, label: "מבוא"},
    { component: ContentIntroPage2, isAutoEnabled: false, label: "מבוא"},
    { component: ContentIntroPage3, isAutoEnabled: true, label: "מבוא"},
    { component: ContentKnowingTheVehicle, isAutoEnabled: true, label: "מבוא"},
    { component: ContentGeneralData, isAutoEnabled: false, label: "מבוא"},
    { component: ContentIndicatorLights, isAutoEnabled: false, label: "מבוא"},
    { component: ContentMetrics, isAutoEnabled: false, label: "מבוא"},
    { component: VehicleOperationOpeningPage, isAutoEnabled: true, label: "מבוא"},
    { component: VehicleOperationOpeningChecks, isAutoEnabled: false, label: "מבוא"},
    { component: VOChecks, isAutoEnabled: false, label: "מבוא"},
    { component: VOOpeningGearbox, isAutoEnabled: true, label: "מבוא"},
    { component: VOGearbox, isAutoEnabled: true, label: "מבוא"},
    { component: VOGearboxPractice, isAutoEnabled: false, label: "מבוא"},
    { component: VOOpeningWheel, isAutoEnabled: false, label: "מבוא"},
    { component: VOWheel, isAutoEnabled: false, label: "מבוא"},
    { component: VOOpeningBreak, isAutoEnabled: false, label: "מבוא"},
    { component: VOBreak, isAutoEnabled: true, label: "מבוא"},
    { component: VOBreakPractice, isAutoEnabled: false, label: "מבוא"},
    { component: Safety, isAutoEnabled: false, label: "מבוא"}
];

