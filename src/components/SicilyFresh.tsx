const SicilyFresh = () => {
  return (
    <>
      <div className="rounded-2xl sicilyFresh py-5  mx-3  md:mx-20 p-10  xl:mx-64 mb-10">
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
            }}
          />

          <div className="text-center md:text-left ">
            <h1 className=" display-6 fw-bold mt-xl-5 mb-5">Sicily Fresh 🍝</h1>
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
