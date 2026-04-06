const CookiePolicy = () => (
  <div className="legal-page">
    <div className="section-header">
      <p className="section-eyebrow">Informativa</p>
      <h2 className="section-title">Cookie Policy</h2>
      <div className="section-title-bar" />
    </div>

    <div className="legal-content">
      <p>
        <strong>Ultimo aggiornamento:</strong> 6 aprile 2026
      </p>

      <h3>1. Cosa sono i cookie</h3>
      <p>
        I cookie sono piccoli file di testo che i siti web salvano sul
        dispositivo dell&apos;utente durante la navigazione. Vengono utilizzati
        per memorizzare preferenze e migliorare l&apos;esperienza di
        navigazione.
      </p>

      <h3>2. Cookie utilizzati da questo sito</h3>

      <h4>Cookie tecnici</h4>
      <ul>
        <li>
          <strong>dc_cookie_consent</strong> &mdash; Memorizza la scelta
          dell&apos;utente relativa al consenso cookie. Durata: persistente
          (localStorage). Non &egrave; un cookie ma un dato locale.
        </li>
      </ul>

      <h4>Cookie di analisi (Google Analytics 4)</h4>
      <p>
        Previo consenso dell&apos;utente, questo sito utilizza Google Analytics 4
        (GA4) di Google LLC per raccogliere dati anonimi sull&apos;utilizzo del
        sito (pagine visitate, durata della sessione, dispositivo utilizzato).
        Questi dati servono esclusivamente a migliorare il sito.
      </p>
      <ul>
        <li>
          <strong>_ga, _ga_*</strong> &mdash; Cookie di Google Analytics per
          distinguere gli utenti. Durata: fino a 2 anni.
        </li>
      </ul>
      <p>
        I cookie di analisi vengono attivati <strong>solo dopo il consenso</strong>{" "}
        esplicito dell&apos;utente tramite il banner. In assenza di consenso,
        nessun dato viene trasmesso a Google.
      </p>
      <p>
        Non vengono utilizzati cookie di profilazione n&eacute; cookie a fini
        pubblicitari.
      </p>

      <h3>3. Cookie di terze parti</h3>
      <p>
        Oltre a Google Analytics (attivato solo con consenso), il sito non
        integra altri servizi di terze parti che installano cookie. I link
        esterni (LinkedIn, GitHub) sono semplici collegamenti ipertestuali.
      </p>

      <h3>4. Come disabilitare i cookie</h3>
      <p>
        L&apos;utente pu&ograve; gestire le preferenze sui cookie direttamente
        dalle impostazioni del proprio browser. La disabilitazione dei cookie
        tecnici potrebbe compromettere alcune funzionalit&agrave; del sito.
      </p>

      <h3>5. Contatti</h3>
      <p>
        Per qualsiasi domanda relativa a questa Cookie Policy, puoi scrivere a:{" "}
        <a href="mailto:dariocecchinato@gmail.com" className="legal-link">
          dariocecchinato@gmail.com
        </a>
      </p>
    </div>
  </div>
);

export default CookiePolicy;
