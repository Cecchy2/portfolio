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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
