import { Image } from "react-bootstrap";

const TechQuizGame = () => {
  return (
    <>
      <div className="techQuizGame d-flex align-items-center flex-column flex-xl-row p-5 p-xl-0">
        <Image
          src="/public/projects/Screenshot 2025-01-09 alle 09.17.52.png"
          className="sicilyFreshImg ms-5"
          onClick={() => window.open("https://techquizgame.netlify.app/", "_blank")}
          style={{ cursor: "pointer" }}
        />

        <div>
          <h1 className="mx-5 display-6 fw-bold">Tech Quiz Game</h1>
          <h4 className="mx-5">Quiz game creato per la prima build week.</h4>
          <br />
          <h4 className="mx-5">Rappresenta una copia della app Benchmark di Epicode.</h4>
          <br />
          <h4 className="mx-5">
            L' applicazione è in Vanilla Javascript, creata con DOM Manipulation ed Eventi, HTML, CSS ed Animazioni
          </h4>
          <br />
          <h4 className="mx-5">L’interfaccia non è responsive, va aperto in schermi grandi.</h4>
        </div>
      </div>
    </>
  );
};

export default TechQuizGame;
