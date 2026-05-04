import ContentIntro from "./ContentIntro/ContentIntro";
import ContentIntroPage2 from "./ContentIntroPage2/ContentIntroPage2";
import ContentIntroPage3 from "./ContentIntroPage3/ContentIntroPage3";
import ContentKnowingTheVehicle from "./ContentKnowingTheVehicle/ContentKnowingTheVehicle";

export const pages = [
    { component: ContentIntro, isAutoEnabled: false},
    { component: ContentIntroPage2, isAutoEnabled: true },
    { component: ContentIntroPage3, isAutoEnabled: true },
    { component: ContentKnowingTheVehicle, isAutoEnabled: true }
];