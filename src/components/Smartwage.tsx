const Smartwage = () => {
  return (
    <>
      <div className="rounded-2xl smartwage py-5 p-5 md:p-10 w-full h-full">
        <div className="flex flex-col  items-center gap-5">
          <img
            src="/projects/Smartwage.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() =>
              window.open("https://app.smartwage.it/register", "_blank")
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
            <div className="flex items-center justify-center mb-2">
              <img
                src="/projects/Pittogramma.png"
                alt="logo smartwage"
                className="w-10 h-14 bg-white rounded-2xl p-1"
              />
              <h1 className=" display-6 fw-bold ms-2">Smartwage</h1>
            </div>
            <h4 className="">
              Piattaforma che permette la gestione del Welfare Aziendale.
            </h4>
            <br />

            <h4 className="pb-xl-0">
              Sono 2 applicazioni collegate, una web app per le aziende ed una
              app mobile per i dipendenti.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Smartwage;
