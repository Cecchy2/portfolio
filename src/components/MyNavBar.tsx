import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Servizi", path: "/", hash: "#servizi" },
  { label: "Progetti", path: "/casi-studio" },
  { label: "Chi sono", path: "/chi-sono" },
  { label: "FAQ", path: "/faq" },
  { label: "Contatti", path: "/contatti" },
];

const MyNavBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (path: string, hash?: string) => {
    setOpen(false);
    if (hash && location.pathname === path) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(path);
    window.scrollTo(0, 0);
    if (hash) {
      // la sezione esiste solo dopo il render della nuova route
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  };

  return (
    <header className="nav" data-open={open} data-stuck={location.pathname !== "/"}>
      <div className="nav-inner">
        <a
          className="brand"
          role="button"
          tabIndex={0}
          onClick={() => go("/")}
          onKeyDown={(e) => e.key === "Enter" && go("/")}
        >
          Dario Cecchinato
        </a>

        <nav className="nav-links" id="navLinks">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              className="nav-link"
              role="button"
              tabIndex={0}
              aria-current={location.pathname === item.path && !item.hash ? "true" : undefined}
              onClick={() => go(item.path, item.hash)}
              onKeyDown={(e) => e.key === "Enter" && go(item.path, item.hash)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default MyNavBar;
