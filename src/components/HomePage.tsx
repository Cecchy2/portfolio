import AboutMe from "./AboutMe";
import FirstSection from "./FirstSection";
import ProjectsSections from "./ProjectsSections";
import TechSection from "./TechSection";

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <AboutMe />
      <TechSection />
      <ProjectsSections />

      <div className="section ">
        <h1>Sezione 4</h1>
      </div>
    </>
  );
};

export default HomePage;
