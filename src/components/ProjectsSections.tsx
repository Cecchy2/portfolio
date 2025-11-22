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

      <div className="flex flex-wrap justify-center gap-8 px-4 mb-10">
        <div className="w-full xl:w-[45%]">
          <Smartwage />
        </div>
        <div className="w-full xl:w-[45%]">
          <SicilyFresh />
        </div>
        <div className="w-full xl:w-[45%]">
          <TechQuizGame />
        </div>
        <div className="w-full xl:w-[45%]">
          <Meteo />
        </div>
      </div>
    </>
  );
};

export default ProjectsSections;
