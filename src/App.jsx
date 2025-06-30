import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./scrollTop/ScrollToTop.jsx";
import Header from './components/Header.jsx';
import MainConatiner from "./components/MainConatiner.jsx";
import ComparePage from "./components/CompareUniversityPage.jsx";
import TopUniversity from "./components/TopUniversityPage.jsx";
import ContactUsPage from "./components/ContactUsPage.jsx";
import KnowMorePage from "./components/KnowMorePage.jsx";
import AllUniversitiesPage from './components/AllUniversities.jsx';
import WebStories from "./components/WebStoriesPage.jsx";
import TwelveContainer from "./components/TwelveContainer.jsx";
import ProgramPage from "./components/ProgramPage.jsx";
import UniversityInfo from "./components/UniversityInfo.jsx";
import StoryViewer from "./components/StoryViewer.jsx";
import './global.css'; 
import Footer from "./components/Footer.jsx";
import TermConditions from "./components/TermConditions.jsx";
import PrivacyPolicy from "./components/PricacyPolicy.jsx";
import Blog from "./components/Blog.jsx";
import Disclamer from "./components/Disclamer.jsx";


export default class App extends Component {
  render() {
    return (
      <Router>
           <ScrollToTop />
        <div className="app-layout">
          <Header />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<MainConatiner />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/top-universities" element={<TopUniversity />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/know-more" element={<KnowMorePage />} /> 
              <Route path="/universities" element={<AllUniversitiesPage />} />
              <Route path="/universities/:slug" element={<UniversityInfo />} />
              <Route path="/web-stories" element={<WebStories />} />
              <Route path="/web-stories/:id" element={<StoryViewer />} />
              <Route path="/terms" element={<TermConditions />} />         
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path ="/disclaimer" element={<Disclamer />} />
                   <Route path="/:category/:programId" element={<ProgramPage />} /> 
            </Routes>
          </main>
          <TwelveContainer />
          <Footer/>
        </div>
      </Router>
    );
  }
}
