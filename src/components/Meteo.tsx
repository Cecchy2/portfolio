import { Image } from "react-bootstrap";

const Meteo = () => {
  return (
    <>
      <div className="meteo d-flex align-items-center flex-column flex-xl-row p-5 p-xl-0">
        <Image src="/public/projects/Screenshot 2025-01-08 alle 14.30.16.png" className="sicilyFreshImg ms-5" />
        <div>
          <h1 className="mx-5 display-6 fw-bold">Meteo</h1>
          <h4 className="mx-5">
            Un'applicazione di previsioni meteo sviluppata con React, Vite.js, Bootstrap, React Router Dom e
            OpenWeatherMap API{" "}
          </h4>
          <br />
          <h4 className="mx-5">
            {" "}
            L'app consente agli utenti di cercare il meteo corrente e le previsioni a breve termine per una città
            specifica. L'utente può inserire il nome di una città per ottenere le condizioni meteo attuali.{" "}
          </h4>
          <br />
          <h4 className="mx-5">
            Visualizza temperatura, descrizione del meteo, velocità del vento, umidità e icona meteo. Fornisce le
            previsioni meteo per i prossimi 3 giorni a mezzogiorno.
          </h4>
        </div>
      </div>
    </>
  );
};

export default Meteo;
