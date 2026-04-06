import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const COOKIE_KEY = "dc_cookie_consent";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "accepted") {
      updateConsent(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    updateConsent(true);
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    updateConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-banner-text">
        Questo sito utilizza cookie tecnici e di analisi per migliorare
        l&apos;esperienza di navigazione. Navigando accetti la nostra{" "}
        <Link to="/cookie-policy" className="cookie-banner-link">
          Cookie Policy
        </Link>{" "}
        e l&apos;
        <Link to="/privacy-policy" className="cookie-banner-link">
          Informativa sulla Privacy
        </Link>
        .
      </p>
      <div className="cookie-banner-actions">
        <button className="cookie-btn cookie-btn-accept" onClick={accept}>
          Accetta
        </button>
        <button className="cookie-btn cookie-btn-reject" onClick={reject}>
          Rifiuta
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
