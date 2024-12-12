import { Image } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <div className="section">
        <div className="d-flex justify-content-center align-items-center sectionImage">
          <div>
            <p className="m-0 fs-3 fw-bold">Ciao,</p>
            <div>
              <h1 className="m-0 display-3 fw-bold">Sono Dario Cecchinato</h1>
            </div>
          </div>
          <Image src="../../Fotoprofilo.jpg" className="profileImage object-fit-cover bordiImage" />
        </div>
      </div>
      <div className="section bg-dark">
        <h1>sezione2</h1>
      </div>
      <div className="section">
        <h1>sezione3</h1>
      </div>
      <div className="section">
        <h1>sezione4</h1>
      </div>
    </>
  );
};

export default HomePage;
