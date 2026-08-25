import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MyNavBar from "./components/MyNavBar";
import PageWrapper from "./components/PageWrapper";
import HomePage from "./components/HomePage";
import ProjectsSections from "./components/ProjectsSections";
import AboutMe from "./components/AboutMe";
import FAQSection from "./components/FAQSection";
import FormSection from "./components/FormSection";
import CookiePolicy from "./components/CookiePolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookieBanner from "./components/CookieBanner";
import HeroFX from "./components/HeroFX";
import { initScrollFx } from "./lib/scrollFx";

/**
 * Riaggancia il motore degli effetti a ogni cambio di route: i nodi con
 * data-py, data-pan, data-vtrack cambiano insieme alla pagina.
 * Sta dopo <Routes> nel JSX perche' i suoi effetti devono girare quando il
 * sottoalbero della route e' gia' montato nel DOM.
 */
function ScrollFxHost() {
  const location = useLocation();
  useEffect(() => initScrollFx(), [location.pathname]);
  return null;
}

/** Al ricaricamento la pagina riparte dall'alto, non da dove eri rimasto. */
function useTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }, []);
}

function Shell() {
  useTopOnLoad();
  const { pathname } = useLocation();
  return (
    <>
      <div className="progress" aria-hidden="true"><i data-progress /></div>
      <MyNavBar />

      {/* La scena vive FUORI da .page-content: dentro sarebbe nello stesso
          contesto di impilamento dei contenuti e nessuno z-index potrebbe
          mandarla dietro al nastro e agli altri blocchi. Da sorella, invece,
          il confronto tra livelli e' diretto: canvas posteriore 1, contenuti
          2, farfalle 65. */}
      {pathname === "/" && <HeroFX />}

      <div className="page-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/casi-studio" element={<PageWrapper><ProjectsSections /></PageWrapper>} />
        <Route path="/chi-sono" element={<PageWrapper><AboutMe /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQSection /></PageWrapper>} />
        <Route path="/contatti" element={<PageWrapper><FormSection /></PageWrapper>} />
        <Route path="/cookie-policy" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
        <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
      </Routes>
      </div>
      <ScrollFxHost />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
