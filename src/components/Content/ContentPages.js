import ContentIntro from "./ContentIntro/ContentIntro";
import ContentIntroPage2 from "./ContentIntroPage2/ContentIntroPage2";
import ContentIntroPage3 from "./ContentIntroPage3/ContentIntroPage3";
import ContentKnowingTheVehicle from "./ContentKnowingTheVehicle/ContentKnowingTheVehicle";
import ContentGeneralData from "./ContentGeneralData/ContentGeneralData";
import ContentIndicatorLights from "./ContentIndicatorLights/ContentIndicatorLights";
import ContentMetrics from "./ContentMetrics/ContentMetrics";

export const pages = [
    { component: ContentIntro, isAutoEnabled: false},
    { component: ContentIntroPage2, isAutoEnabled: false },
    { component: ContentIntroPage3, isAutoEnabled: true },
    { component: ContentKnowingTheVehicle, isAutoEnabled: true },
    { component: ContentGeneralData, isAutoEnabled: false },
    { component: ContentIndicatorLights, isAutoEnabled: false },
    { component: ContentMetrics, isAutoEnabled: false }
];