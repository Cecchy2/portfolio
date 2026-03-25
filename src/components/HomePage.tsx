import React from "react";
import AboutMe from "./AboutMe";
import FirstSection from "./FirstSection";
import Footer from "./Footer";
import FormSection from "./FormSection";
import ProjectsSections from "./ProjectsSections";
import TechSection from "./TechSection";
import { useSectionFade } from "../hooks/useSectionFade";

const FadeSection: React.FC<{ children: React.ReactNode; fraction?: number }> = ({
  children,
  fraction,
}) => {
  const ref = useSectionFade(fraction);
  return (
    <div ref={ref} style={{ willChange: "opacity" }}>
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <FadeSection><AboutMe /></FadeSection>
      <FadeSection><TechSection /></FadeSection>
      <FadeSection><ProjectsSections /></FadeSection>
      <FadeSection><FormSection /></FadeSection>
      <FadeSection fraction={0.15}><Footer /></FadeSection>
    </>
  );
};

export default HomePage;
