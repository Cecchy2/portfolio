import CarouselLoghi from "./CorouselLoghi";

const SecondSection = () => {
  return (
    <div className="stickyWrapper">
      <div className="secondSection">
        <h1 className=" pt-5 text-center display-3 fw-bold">About me:</h1>
        <div className="section ">
          <div>
            <CarouselLoghi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
