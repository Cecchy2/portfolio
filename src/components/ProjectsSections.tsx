import SicilyFresh from "./SicilyFresh";

import Meteo from "./Meteo";
import TechQuizGame from "./TechQuizGame";
import Smartwage from "./Smartwage";

const ProjectsSections = () => {
  return (
    <>
      <div className=" py-3 bg-white">
        <h1 className="text-center "> Alcuni progetti </h1>
      </div>

      <Smartwage />
      <SicilyFresh />
      <TechQuizGame />
      <Meteo />
    </>
  );
};

export default ProjectsSections;
