import { Col, Container, Image, Row } from "react-bootstrap";
import CarouselLoghi from "./CorouselLoghi";
import { SiIntellijidea, SiRedux } from "react-icons/si";
import { FaBootstrap, FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaSass } from "react-icons/fa";
import { TbBrandVite, TbBrandVscode } from "react-icons/tb";

const SecondSection = () => {
  return (
    <div className="stickyWrapper">
      <div className="secondSection">
        <h1 className=" pt-5 text-center display-3 fw-bold mb-5">Le tecnologie che uso:</h1>
        <Container>
          <Row className="gy-4 justify-content-between mt-5">
            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/javascript.png" alt="JavaScript" className="tech-image" />
                <div className="tech-overlay">
                  <h4>JavaScript per lo sviluppo di applicazioni web interattive e robuste</h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/typescript.png" alt="TypeScript" className="tech-image" />
                <div className="tech-overlay">
                  <h4>TypeScript per un maggiore controllo del codice</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/react.png" alt="React" className="tech-image" />
                <div className="tech-overlay">
                  <h4>React per la creazione di interfacce utente dinamiche e performanti</h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={3} lg={2}>
              <div className="tech-card ">
                <img src="/public/java 2.png" alt="Java" className="tech-image " />
                <div className="tech-overlay">
                  <h4>Java per lo sviluppo del backend</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img src="/public/spring.png" alt="Spring" className="tech-image " />
                <div className="tech-overlay">
                  <h4>Spring e Spring Boot per la sicurezza e un'architettura REST manutenibile</h4>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col className="iconTech">
              <SiRedux size={70} />
            </Col>
            <Col className="iconTech">
              <FaHtml5 size={70} />
            </Col>
            <Col className="iconTech">
              <FaCss3Alt size={70} />
            </Col>
            <Col className="iconTech">
              <FaGithub size={70} />
            </Col>
            <Col className="iconTech">
              <FaGitAlt size={70} />
            </Col>
            <Col className="iconTech">
              <SiIntellijidea size={70} />
            </Col>
            <Col className="iconTech">
              <TbBrandVscode size={70} />
            </Col>
            <Col className="iconTech">
              <FaBootstrap size={70} />
            </Col>
            <Col className="iconTech">
              <FaSass size={70} />
            </Col>
            <Col className="iconTech">
              <TbBrandVite size={70} />
            </Col>
          </Row>
        </Container>
        <div>
          <div className="">
            <CarouselLoghi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
