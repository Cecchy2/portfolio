const PrivacyPolicy = () => (
  <div className="legal-page">
    <div className="section-header">
      <p className="section-eyebrow">Informativa</p>
      <h2 className="section-title">Informativa sulla Privacy</h2>
      <div className="section-title-bar" />
    </div>

    <div className="legal-content">
      <p>
        <strong>Ultimo aggiornamento:</strong> 6 aprile 2026
      </p>
      <p>
        Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003, la
        presente informativa descrive le modalit&agrave; di trattamento dei dati
        personali raccolti attraverso questo sito web.
      </p>

      <h3>1. Titolare del trattamento</h3>
      <p>
        Dario Cecchinato &mdash;{" "}
        <a href="mailto:dariocecchinato@gmail.com" className="legal-link">
          dariocecchinato@gmail.com
        </a>
      </p>

      <h3>2. Dati raccolti</h3>
      <p>
        Attraverso il modulo di contatto presente sul sito vengono raccolti i
        seguenti dati forniti volontariamente dall&apos;utente:
      </p>
      <ul>
        <li>Nome e cognome</li>
        <li>Indirizzo email</li>
        <li>Tipologia di servizio richiesto</li>
        <li>Contenuto del messaggio</li>
      </ul>

      <h3>3. Finalit&agrave; del trattamento</h3>
      <p>I dati personali vengono trattati per le seguenti finalit&agrave;:</p>
      <ul>
        <li>Rispondere alle richieste di contatto e informazioni</li>
        <li>Fornire preventivi e proposte relative ai servizi offerti</li>
      </ul>
      <p>
        I dati non vengono utilizzati per finalit&agrave; di marketing,
        profilazione o comunicati a terzi.
      </p>

      <h3>4. Base giuridica</h3>
      <p>
        Il trattamento dei dati si basa sul consenso dell&apos;utente, espresso
        al momento dell&apos;invio del modulo di contatto, e sul legittimo
        interesse del titolare a rispondere alle richieste ricevute.
      </p>

      <h3>5. Conservazione dei dati</h3>
      <p>
        I dati personali vengono conservati per il tempo strettamente necessario
        a soddisfare le finalit&agrave; per cui sono stati raccolti e comunque
        non oltre 12 mesi dalla ricezione della richiesta.
      </p>

      <h3>6. Diritti dell&apos;interessato</h3>
      <p>
        In qualsiasi momento l&apos;utente pu&ograve; esercitare i seguenti
        diritti scrivendo a{" "}
        <a href="mailto:dariocecchinato@gmail.com" className="legal-link">
          dariocecchinato@gmail.com
        </a>
        :
      </p>
      <ul>
        <li>Accesso ai propri dati personali</li>
        <li>Rettifica o aggiornamento dei dati</li>
        <li>Cancellazione dei dati</li>
        <li>Limitazione del trattamento</li>
        <li>Portabilit&agrave; dei dati</li>
        <li>Opposizione al trattamento</li>
      </ul>
      <p>
        L&apos;utente ha inoltre il diritto di proporre reclamo
        all&apos;Autorit&agrave; Garante per la Protezione dei Dati Personali (
        <a
          href="https://www.garanteprivacy.it"
          target="_blank"
          rel="noopener noreferrer"
          className="legal-link"
        >
          www.garanteprivacy.it
        </a>
        ).
      </p>

      <h3>7. Sicurezza</h3>
      <p>
        I dati trasmessi attraverso il modulo di contatto vengono inviati
        tramite connessione HTTPS crittografata. Il titolare adotta misure
        tecniche e organizzative adeguate per proteggere i dati personali da
        accessi non autorizzati, perdita o distruzione.
      </p>

      <h3>8. Modifiche all&apos;informativa</h3>
      <p>
        Il titolare si riserva il diritto di aggiornare la presente informativa.
        Eventuali modifiche saranno pubblicate su questa pagina con indicazione
        della data di aggiornamento.
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
