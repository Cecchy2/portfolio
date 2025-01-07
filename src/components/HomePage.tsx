import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />

      <div className="section d-flex justify-content-center align-items-center align-content-center bg-dark">
        <div className="d-flex align-items-center align-content-center">
          <h1>ciao</h1>
        </div>
      </div>

      <div className="section ">
        <h1>Sezione 4</h1>
      </div>
    </>
  );
};

export default HomePage;
