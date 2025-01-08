import { Card, Col, Container, Row } from "react-bootstrap";
import SicilyFresh from "./SicilyFresh";
import Illbe from "./Illbe";
import Meteo from "./Meteo";

const ProjectsSections = () => {
  return (
    <>
      <SicilyFresh />
      <Illbe />
      <Meteo />
    </>
  );
};

export default ProjectsSections;
