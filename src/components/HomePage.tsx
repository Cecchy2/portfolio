import FirstSection from "./FirstSection";
import ServiziSection from "./ServiziSection";
import MetodoSection from "./MetodoSection";
import ProjectsSections from "./ProjectsSections";
import AboutMe from "./AboutMe";
import FAQSection from "./FAQSection";
import FormSection from "./FormSection";
import Footer from "./Footer";

/* La home e' la pagina lunga: le stesse sezioni che hanno una route propria
   (/casi-studio, /chi-sono, /faq, /contatti) qui scorrono una dopo l'altra.
   Sono gli stessi componenti, non copie: quello che si cambia la' vale anche
   qui. Le route restano perche' la navbar ci punta ancora. */
const HomePage = () => (
  <>
    <FirstSection />
    <ServiziSection />
    <MetodoSection />
    <ProjectsSections />
    <AboutMe />
    <FAQSection />
    <FormSection />
    <Footer />
  </>
);

export default HomePage;
