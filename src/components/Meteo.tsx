import { Image } from "react-bootstrap";

const Meteo = () => {
  return (
    <>
      <div className="meteo d-flex align-items-center">
        <Image src="/public/projects/Screenshot 2025-01-08 alle 14.30.16.png" className="sicilyFreshImg ms-5" />
        <div>
          <h1 className="mx-5 display-6 fw-bold">Sicily Fresh</h1>
          <h4 className="mx-5">Il mio capstone per il diploma FullStack di Epicode.</h4>
          <br />
          <h4 className="mx-5">
            {" "}
            Il back-end è in Java con Spring Boot e Hibernate, usando PostgreSQL e un ERD per il mapping relazionale.
            Spring Security per autenticazione e autorizzazione, con ruoli per Clienti e Fornitori.{" "}
          </h4>
          <br />
          <h4 className="mx-5">
            Il front-end utilizza JavaScript, React e Redux per la gestione dello stato. La comunicazione tra front-end
            e back-end avviene tramite API REST, testate con Postman.
          </h4>
          <br />
          <h4 className="mx-5">
            L’interfaccia permette di sfogliare ricette, aggiungerle al carrello e completare ordini.
          </h4>
        </div>
      </div>
    </>
  );
};

export default Meteo;
