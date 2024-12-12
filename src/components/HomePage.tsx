import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const HomePage = () => {
  const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsFirstSectionVisible(window.scrollY <= 150);
    };
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className={`section ${isFirstSectionVisible ? "" : "opacityTransition"}`}>
        <div
          className={`d-flex justify-content-center align-items-center sectionImage ${
            isFirstSectionVisible ? "" : "position-fixed"
          }`}
        >
          <div>
            <p className="m-0 fs-3 fw-bold">Ciao,</p>
            <div>
              <h1 className="m-0 display-3 fw-bold">Sono Dario Cecchinato</h1>
            </div>
          </div>
          <Image src="../../Fotoprofilo.jpg" className={`profileImage object-fit-cover bordiImage`} />
        </div>
      </div>

      <div className="section bg-dark">
        <h1>Sezione 2</h1>
      </div>
      <div className="section bg-dark">
        <h1>Sezione 3</h1>
      </div>
      <div className="section bg-dark">
        <h1>Sezione 4</h1>
      </div>
    </>
  );
};

export default HomePage;
