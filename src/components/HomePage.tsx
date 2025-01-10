import AboutMe from "./AboutMe";
import FirstSection from "./FirstSection";
import Footer from "./Footer";
import FormSection from "./FormSection";
import ProjectsSections from "./ProjectsSections";
import TechSection from "./TechSection";

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <AboutMe />
      <TechSection />
      <ProjectsSections />

      <FormSection />
      <Footer />
    </>
  );
};

export default HomePage;
