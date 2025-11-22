const SicilyFresh = () => {
  return (
    <>
      <div className="rounded-2xl sicilyFresh py-5 p md:p-10 w-full h-full">
        <div className="flex flex-col  items-center gap-5">
          <img
            src="/projects/SicilyFresh.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() =>
              window.open("https://sicilyfresh.netlify.app/", "_blank")
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

          <div className="text-center md:text-left ">
            <div className="flex items-center justify-center">
              <img
                src="/projects/limoni.svg"
                alt="logo sicilyfresh"
                className="w-20 h-20"
              />
              <h1 className=" display-6 fw-bold mt-xl-5  ms-2">Sicily Fresh</h1>
            </div>
            <h4 className="">
              Il mio capstone per il diploma FullStack di Epicode.
            </h4>
            <br />

            <h4 className=" pb-5 pb-xl-0">
              L’interfaccia permette di sfogliare ricette, aggiungerle al
              carrello e completare ordini.
            </h4>
          </div>
        </div>
      </div>

      {/* <div className="sicilyFresh" id="sicilyFresh">
        <Container fluid>
          <Row>
            <Col></Col>
          </Row>{" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/projects/Screenshot 2024-12-13 alle 15.50.33.png"
                className="sicilyFreshImg my-5 px-5"
                onClick={() =>
                  window.open("https://sicilyfresh.netlify.app/", "_blank")
                }
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">
                  Sicily Fresh 🍝
                </h1>
                <h4 className="mx-5">
                  Il mio capstone per il diploma FullStack di Epicode.
                </h4>
                <br />

                <h4 className="mx-5 pb-5 pb-xl-0">
                  L’interfaccia permette di sfogliare ricette, aggiungerle al
                  carrello e completare ordini.
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
};

export default SicilyFresh;
