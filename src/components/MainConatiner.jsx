import React from "react";
import TopContainer from "./TopConatiner";
import SecondContainer from "./SecondContainer";
import ThirdContainer from "./ThirdContainer";
import ForthConatiner from "./ForthContainer";
import FifthContainer from "./FifthContainer";
import SixthContainer from "./SixthContainer";
import SeventhContainer from "./SeventhContainer";
import EighthContainer from "./EighthContainer";
import NinthContainer from "./NinthContainer";
import TenthWebStories from "./TenthWebStories";
import ElevenQuestionContainer from "./ElevenQuestionContainer";
// import TwelveContainer from "./TwelveContainer";
// import Footer from './Footer'

const MainConatiner = () => {
    return(
        <section>
            <TopContainer/>
            <SecondContainer/>
            <ThirdContainer/>
            <ForthConatiner/>
            <FifthContainer/>
            <SixthContainer/>
            <SeventhContainer/>
            <EighthContainer/>
            <NinthContainer/>
            <TenthWebStories/>
            <ElevenQuestionContainer/>
            {/* <TwelveContainer/>
            <Footer/> */}
        </section>
    )
}

export default MainConatiner;