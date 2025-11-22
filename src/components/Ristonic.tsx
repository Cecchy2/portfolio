const Ristonic = () => {
  return (
    <>
      <div className="rounded-2xl ristonic py-5 p-5 md:p-10 w-full h-full">
        <div className="flex flex-col  items-center gap-5">
          <img
            src="/projects/Ristonic.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() =>
              window.open("https://www.ristonic.com/home", "_blank")
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

          <div className="text-center md:text-left text-white">
            <div className="flex items-center justify-center mb-2">
              <img
                src="/projects/logoIcon.png"
                alt="<logo ristonic"
                className="w-13 h-13"
              />
              <h1 className=" display-6 fw-bold   ms-2">Ristonic </h1>
            </div>
            <h4 className="">
              Piattaforma che collega chi cerca lavoro e chi cerca personale nel
              campo HO.RE.CA
            </h4>
            <br />

            <h4 className="pb-xl-0">Web application in sviluppo...</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ristonic;
