const TechQuizGame = () => {
  return (
    <>
      <div className="rounded-2xl techQuizGame py-5  mx-3  md:mx-20 p-10  xl:mx-64 mb-10">
        <div className="flex flex-col  items-center gap-5">
          <img
            src="/projects/TechQuiz.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() =>
              window.open("https://techquizgame.netlify.app/", "_blank")
            }
            style={{
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "cover",
            }}
          />

          <div className="text-center md:text-left">
            <h1 className=" display-6 fw-bold mt-xl-5 mb-5">
              Tech Quiz Game 🤔
            </h1>
            <h4 className="">Quiz game creato per Epicode.</h4>
            <br />

            <h4 className="">
              L' applicazione è in Vanilla Javascript,HTML, CSS e DOM
              Manipulation.
            </h4>

            <h4 className=" pb-5 pb-xl-0">Divertiti e prova il mio Quiz.</h4>
          </div>
        </div>
      </div>

      {/* <div className="techQuizGame ">
        <Container fluid>
          {" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/projects/Screenshot 2025-01-09 alle 09.17.52.png"
                className="sicilyFreshImg my-5 px-5"
                onClick={() =>
                  window.open("https://techquizgame.netlify.app/", "_blank")
                }
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">
                  Tech Quiz Game 🤔
                </h1>
                <h4 className="mx-5">Quiz game creato per Epicode.</h4>
                <br />

                <h4 className="mx-5">
                  L' applicazione è in Vanilla Javascript,HTML, CSS e DOM
                  Manipulation.
                </h4>

                <h4 className="mx-5 pb-5 pb-xl-0">
                  Divertiti e prova il mio Quiz.
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
};

export default TechQuizGame;
