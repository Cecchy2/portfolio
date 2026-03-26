import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const CONTACT_LINKS = [
  {
    icon: <MdEmail size={22} />,
    label: "Email",
    value: "dariocecchinato@gmail.com",
    href: "mailto:dariocecchinato@gmail.com",
  },
  {
    icon: <FaLinkedin size={22} />,
    label: "LinkedIn",
    value: "linkedin.com/in/cecchy2",
    href: "https://www.linkedin.com/in/cecchy2",
  },
  {
    icon: <FaGithub size={22} />,
    label: "GitHub",
    value: "github.com/Cecchy2",
    href: "https://github.com/Cecchy2",
  },
];

const FormSection = () => {
  const ref = useSectionObserver("formSection");
  const revealRef = useScrollReveal({ threshold: 0.05 });

  const [formValues, setFormValues] = useState({
    nome: "",
    cognome: "",
    email: "",
    messaggio: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://fellow-jyoti-cecchy-3c2d0121.koyeb.app/messaggi",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFormValues({ nome: "", cognome: "", email: "", messaggio: "" });
      } else {
        const error = await response.json();
        alert(
          error.message ||
            "Si è verificato un errore durante l'invio del messaggio."
        );
      }
    } catch {
      alert("Errore di connessione. Controlla il server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="formSection" ref={ref}>
      <div ref={revealRef} className="contact-wrapper">

        {/* Header */}
        <div className="contact-header">
          <p className="contact-eyebrow">Contatti</p>
          <h2 className="contact-title">Parliamoci</h2>
          <div className="contact-title-bar" />
        </div>

        <div className="contact-body">
          {/* Left — info */}
          <div className="contact-info">
            <p className="contact-info-lead">
              Hai un progetto in mente o vuoi semplicemente fare una chiacchierata?
              Scrivimi, rispondo entro 24 ore.
            </p>

            <div className="contact-links">
              {CONTACT_LINKS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >
                  <span className="contact-link-icon">{c.icon}</span>
                  <div className="contact-link-text">
                    <span className="contact-link-label">{c.label}</span>
                    <span className="contact-link-value">{c.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleChange}
                  placeholder="Mario"
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="cognome">Cognome</label>
                <input
                  id="cognome"
                  type="text"
                  name="cognome"
                  value={formValues.cognome}
                  onChange={handleChange}
                  placeholder="Rossi"
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="mario@esempio.com"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="messaggio">Messaggio</label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={5}
                value={formValues.messaggio}
                onChange={handleChange}
                placeholder="Scrivi qui il tuo messaggio..."
                required
              />
            </div>

            <button type="submit" className="contact-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                  {" "}Inviando...
                </>
              ) : (
                <>
                  Invia messaggio <FiSend size={16} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default FormSection;
