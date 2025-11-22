import { Col, Container, Row } from "react-bootstrap";
import { useSectionObserver } from "../hooks/useSectionObserver";

const AboutMe = () => {
  const ref = useSectionObserver("about-me");
  return (
    <>
      <div
        className="md:mx-20 my-5  bg-dark  rounded-4xl border-8 border-amber-500"
        id="about-me"
        ref={ref}
      >
        <div>
          <div className="text-white  md:p-10">
            <div className="font-bold text-4xl md:text-5xl py-5 text-white text-center">
              Ciao sono Dario
            </div>

            <div className="text-xl md:text-2xl mb-2 mt-2 px-4  text-white">
              Sono un Front-end developer con una grande passione per la
              programmazione, amo sviluppare applicazioni e curare ogni minimo
              dettaglio per renderle perfette. Ogni giorno mi destreggio tra{" "}
              <span className="text-warning">
                JavaScript, TypeScript, React, React Native e Redux.
              </span>{" "}
              <br />
              <br />
              <span>
                Utilizzo svariati altri framework e librerie,{" "}
                <span className="text-warning">
                  Tailwind, Bootstrap, Three.js{" "}
                </span>{" "}
                e altro ancora.
              </span>
              <br />
              Le API (con le loro key) sono il mio pane quotidiano, e non manca
              una buona dose di curiosità per nuovi framework e strumenti che
              possano rendere il mio lavoro più fluido e divertente.
              <br />
              <br />
              Ho esperienza anche come Back-end e programmo con{" "}
              <span className="text-warning">
                Java e Spring, Docker e Database relazionali{" "}
              </span>
              questo mi permette di avere una visione completa quando serve e di
              potere sviluppare appplicazioni complete.
              <br />
              <br />
              Inoltre, ho ottime doti comunicative sviluppate durante le mie
              esperienze come commerciale: so relazionarmi con i clienti,
              comprendere le loro esigenze e presentare soluzioni in modo
              chiaro, professionale ed empatico.
            </div>

            <br />
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutMe;
