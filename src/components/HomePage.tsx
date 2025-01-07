import FirstSection from "./FirstSection";
import FourthSection from "./FourthSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />

      <FourthSection />

      <div className="section ">
        <h1>Sezione 4</h1>
      </div>
    </>
  );
};

export default HomePage;
