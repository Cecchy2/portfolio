import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavBar from "./components/MyNavBar";
import ParticlesBackground from "./components/ParticlesBackground";
import PageWrapper from "./components/PageWrapper";
import HomePage from "./components/HomePage";
import ProjectsSections from "./components/ProjectsSections";
import AboutMe from "./components/AboutMe";
import FAQSection from "./components/FAQSection";
import FormSection from "./components/FormSection";
import CookiePolicy from "./components/CookiePolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <BrowserRouter>
      <ParticlesBackground />
      <MyNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/casi-studio" element={<PageWrapper><ProjectsSections /></PageWrapper>} />
        <Route path="/chi-sono" element={<PageWrapper><AboutMe /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQSection /></PageWrapper>} />
        <Route path="/contatti" element={<PageWrapper><FormSection /></PageWrapper>} />
        <Route path="/cookie-policy" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
        <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;
