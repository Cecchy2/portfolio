const Illbe = () => {
  return (
    <>
      <div className="rounded-2xl illbe p-5 md:p-10 mx-5 md:mx-20 xl:mx-64 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src="/projects/Screenshot 2024-12-13 alle 15.50.55.png"
            className="sicilyFreshImg rounded-xl"
            onClick={() => window.open("https://illbe.netlify.app/", "_blank")}
            style={{
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              objectFit: "cover",
            }}
          />

          <div className="text-center md:text-left">
            <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">IllBe 💻</h1>
            <h4 className="mx-5">App Social network </h4>
            <br />
            <h4 className="mx-5 pb-5 pb-xl-0">
              App che dopo una semplice registrazione permette, dopo essersi
              loggati, di aggiungere amici e chattare. App ancora in costruzione
              ma chat funzionante
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Illbe;
