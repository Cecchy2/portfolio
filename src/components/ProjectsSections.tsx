import { Card, Col, Container, Row } from "react-bootstrap";
import SicilyFresh from "./SicilyFresh";
import Illbe from "./Illbe";
import Meteo from "./Meteo";
import TechQuizGame from "./TechQuizGame";

const ProjectsSections = () => {
  return (
    <>
      <SicilyFresh />
      <Illbe />
      <Meteo />
      <TechQuizGame />
    </>
  );
};

export default ProjectsSections;
