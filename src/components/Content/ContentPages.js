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


export const pages = [
    { component: ContentIntro, isAutoEnabled: false},
    { component: ContentIntroPage2, isAutoEnabled: false },
    { component: ContentIntroPage3, isAutoEnabled: true },
    { component: ContentKnowingTheVehicle, isAutoEnabled: true },
    { component: ContentGeneralData, isAutoEnabled: false },
    { component: ContentIndicatorLights, isAutoEnabled: false },
    { component: ContentMetrics, isAutoEnabled: false },
    { component: VehicleOperationOpeningPage, isAutoEnabled: true },
    { component: VehicleOperationOpeningChecks, isAutoEnabled: false },
    { component: VOChecks, isAutoEnabled: false },
    { component: VOOpeningGearbox, isAutoEnabled: true },
    { component: VOGearbox, isAutoEnabled: true },
    { component: VOGearboxPractice, isAutoEnabled: false },
    { component: VOOpeningWheel, isAutoEnabled: false },
    { component: VOWheel, isAutoEnabled: false }
];

