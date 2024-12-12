import { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

const HomePage = () => {
  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Configurazione IntersectionObserver con threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSecondSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // Corretto il posizionamento del parametro
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={`section ${isSecondSectionVisible ? "opacity" : ""}`}>
        <div className="d-flex justify-content-center align-items-center sectionImage">
          <div>
            <p className="m-0 fs-3 fw-bold">Ciao,</p>
            <div>
              <h1 className="m-0 display-3 fw-bold">Sono Dario Cecchinato</h1>
            </div>
          </div>
          <Image
            src="../../Fotoprofilo.jpg"
            className={`profileImage object-fit-cover bordiImage z-index-100 ${
              isSecondSectionVisible ? "fixedImage" : ""
            }`}
          />
        </div>
      </div>
      <div ref={secondSectionRef} className="section bg-dark">
        <h1>sezione2</h1>
      </div>
      <div className="section bg-dark">
        <h1>sezione3</h1>
      </div>
      <div className="section bg-dark">
        <h1>sezione4</h1>
      </div>
    </>
  );
};

export default HomePage;
