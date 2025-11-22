import SicilyFresh from "./SicilyFresh";

import Meteo from "./Meteo";
import TechQuizGame from "./TechQuizGame";
import Smartwage from "./Smartwage";
import { useSectionObserver } from "../hooks/useSectionObserver";
import Ristonic from "./Ristonic";

const ProjectsSections = () => {
  const ref = useSectionObserver("sicilyFresh", 0.2);
  return (
    <div id="sicilyFresh" ref={ref}>
      <div className="py-3 bg-white my-10">
        <div className="flex items-center justify-center">
          <div className="border-t-2 w-full" />
          <h1 className="text-center mx-10 whitespace-nowrap">
            Alcuni progetti
          </h1>
          <div className="border-t-2 w-full" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 mb-10">
        <div className="w-full xl:w-[45%]">
          <Smartwage />
        </div>
        <div className="w-full xl:w-[45%]">
          <Ristonic />
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
    </div>
  );
};

export default ProjectsSections;
