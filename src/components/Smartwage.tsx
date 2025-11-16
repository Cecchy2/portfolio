const Smartwage = () => {
  return (
    <>
      <div className="rounded-2xl smartwage p-10 mx-64 mb-10">
        <div className="flex items-center">
          <img
            src="/projects/Smartwage.png"
            className="sicilyFreshImg my-5 rounded-xl"
            onClick={() => window.open("https://www.smartwage.it/", "_blank")}
            style={{ width: "500px", height: "300px", objectFit: "cover" }}
          />

          <div>
            <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">
              Smartwage 🎯
            </h1>
            <h4 className="mx-5">
              Piattaforma che permette la gestione del Welfare
            </h4>
            <br />

            <h4 className="mx-5 pb-5 pb-xl-0">
              Web app in React e App mobile collegata in React native
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Smartwage;
