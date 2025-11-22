const Meteo = () => {
  return (
    <>
      <div className="rounded-2xl meteo py-5 p-5 md:p-10 w-full h-full">
        <div className="flex flex-col  items-center gap-5">
          <img
            src="/projects/Meteo.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() =>
              window.open("https://meteocecchy.netlify.app/", "_blank")
            }
            style={{
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "cover",
              zIndex: 9999,
            }}
          />

          <div className="text-center md:text-left">
            <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">Meteo 🔆</h1>

            <h4 className=" pb-5 pb-xl-0">
              {" "}
              L'app consente agli utenti di cercare il meteo corrente e le
              previsioni a breve termine per una città specifica. L'utente può
              inserire il nome di una città per ottenere le condizioni meteo
              attuali.{" "}
            </h4>
          </div>
        </div>
      </div>
      {/* <div className="meteo">
        <Container fluid>
          {" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/projects/Screenshot 2025-01-08 alle 14.30.16.png"
                className="sicilyFreshImg my-5 px-5"
                onClick={() => window.open("https://meteocecchy.netlify.app/", "_blank")}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">Meteo 🔆</h1>

                <h4 className="mx-5 pb-5 pb-xl-0">
                  {" "}
                  L'app consente agli utenti di cercare il meteo corrente e le previsioni a breve termine per una città
                  specifica. L'utente può inserire il nome di una città per ottenere le condizioni meteo attuali.{" "}
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
};

export default Meteo;
