import { Image } from "react-bootstrap";

const Illbe = () => {
  return (
    <>
      <div className="illbe d-flex align-items-center flex-column flex-xl-row p-5 p-xl-0">
        <Image src="/public/projects/Screenshot 2024-12-13 alle 15.50.55.png" className="sicilyFreshImg ms-5" />
        <div>
          <h1 className="mx-5 display-6 fw-bold">IllBe</h1>
          <h4 className="mx-5">App Social network con chat. </h4>
          <br />
          <h4 className="mx-5">
            {" "}
            Il back-end è in Java con Spring Boot e Hibernate, WebSocket per gli endpoint della chat Spring Security per
            autenticazione e autorizzazione.{" "}
          </h4>
          <br />
          <h4 className="mx-5">
            Il front-end utilizza JavaScript, React e Redux per la gestione dello stato. La comunicazione tra front-end
            e back-end avviene tramite API REST, testate con Postman.
          </h4>
        </div>
      </div>
    </>
  );
};

export default Illbe;
