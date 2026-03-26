# Portfolio Redesign — Changelog

Registro dettagliato di tutte le modifiche apportate al portfolio durante la sessione di redesign.

---

## 1. Dipendenze e configurazione

### `package.json`
- Aggiunta libreria **Three.js** per il background particellare 3D.

### `vite.config.ts`
- Aggiunta opzione `build.rollupOptions.output.manualChunks` per separare Three.js in un chunk indipendente (`three`), evitando che i ~488 KB della libreria appesantiscano il bundle principale.

---

## 2. Background particellare — `src/components/ParticlesBackground.tsx`

File creato da zero. È il cuore visivo del redesign.

**Cosa fa:**
- Renderizza un canvas Three.js in `position: fixed` a `z-index: -1`, visibile dietro tutte le sezioni.
- Genera **17.000 particelle** (punti) animate in modo fluido, con effetto fumo.

**Tecniche implementate:**

| Tecnica | Scopo |
|---|---|
| `THREE.Points` + `PointsMaterial` | Render particelle come puntini, niente linee o triangoli |
| Sprite canvas (radial gradient) | Bordo morbido per ogni punto, evita pixel duri |
| Perlin gradient noise (2D classico, tabella di permutazioni) | Base del campo di flusso |
| Fractional Brownian Motion (fBm, 4 ottave) | Turbolenza multi-scala per movimento organico |
| Curl noise (divergenza zero via differenze finite) | Flusso privo di sorgenti/pozzi → fumo realistico |
| Flow grid 72×40 con interpolazione bilineare | Performance: il campo viene calcolato 2.880 volte/frame anziché 17.000 |
| Diffusione browniana (`DIFFUSION = 0.055`) | Rompe i pattern a righe dei campi sinusoidali |
| Due clock indipendenti (`t` per il flusso, `tc` per i colori) | Il flusso evolve lentamente (~0.003/frame), i colori ciclano più velocemente |
| Colori HSL per vertice basati sull'angolo di posizione + `tc` | Zone di colore che cambiano nel tempo |
| Repulsione mouse | Lieve ondulazione al passaggio del cursore senza creare buchi |

**Parametri principali:**
```
N           = 17.000   particelle
CURL_FORCE  = 5        intensità del campo di flusso
DAMPING     = 0.968    smorzamento velocità (movimento fluido)
DIFFUSION   = 0.055    rumore browniano
MOUSE_R     = 70px     raggio di influenza del mouse
str         = 0.38     forza di repulsione mouse (molto attenuata)
```

**Tuning eseguito durante la sessione:**
1. Rimosso sistema `LineSegments` (mostrava triangoli) → sostituito con soli `Points`.
2. Campo di flusso cambiato da seno-onda (creava strisce) → Perlin + fBm + curl noise.
3. Velocità dimezzata (`t += 0.003` invece di `0.006`).
4. Aggiunto clock separato `tc` per i colori (prima i colori non cambiavano perché il ciclo durava ~7 minuti).
5. Raggio mouse ridotto da 150 → 70px, forza da 0.55 → 0.38.

---

## 3. App principale — `src/App.tsx`

- Aggiunto `<ParticlesBackground />` come primo elemento, prima della navbar, con `position: fixed` — visibile su tutte le sezioni.

---

## 4. Homepage — `src/components/HomePage.tsx`

- Aggiunto wrapper `FadeSection` che usa il hook `useSectionFade` per il fade-in/fade-out continuo di ogni sezione durante lo scroll.
- Ogni sezione (AboutMe, TechSection, ProjectsSections, FormSection, Footer) è avvolta in `FadeSection`.

---

## 5. Hooks

### `src/hooks/useScrollReveal.ts` — creato
- Usa `IntersectionObserver` per aggiungere la classe `sr-visible` quando un elemento entra nel viewport.
- Animazione one-shot (si attiva una volta sola, non si ripete).

### `src/hooks/useSectionFade.ts` — creato
- Listener continuo su `scroll` che traccia la posizione dell'elemento rispetto al viewport.
- Calcola un'opacità 0→1 mentre la sezione entra dal basso e 1→0 mentre esce dall'alto.
- Fade zone = 28% dell'altezza del viewport.

---

## 6. Hero Section — `src/components/FirstSection.tsx`

**Modifiche:**
- Rimosso approccio `position: fixed` per l'immagine di sfondo.
- Layout: `min-height: 100vh`, sfondo trasparente (i particles sono visibili dietro).
- Aggiunta classe `hero-name` all'`<h1>` per il testo gradiente bianco→ambra.
- Aggiunta classe `hero-icon-link` per le icone social con hover ambra.
- La sezione non usa `useScrollReveal` (è la prima, sempre visibile).

---

## 7. About Me — `src/components/AboutMe.tsx`

**Modifiche:**
- Rimosso: header con nome (ripetitivo rispetto alla Hero), lista tecnologie (già presente nel carosello).
- Rimossa costante `SKILLS` non più usata.
- **Mantenuto:** 3 stat card (`3+` anni, `15+` progetti, `20+` tecnologie).
- **Mantenuto + stilizzato:** 4 bio card con icone (`FaCode`, `FaServer`, `FaLightbulb`, `FaComments`).
- Aggiunto `useScrollReveal` per l'animazione d'ingresso.

---

## 8. Tech Section — `src/components/TechSection.tsx`

**Modifiche:**
- Aggiunto header con eyebrow "Stack & competenze" + titolo gradiente + barra ambra.
- Array `MAIN_TECHS` (JS, TS, React, Java, Spring) trasformato in card con overlay hover.
- Layout card: `clamp(130px, 16vw, 190px)` larghezza + etichetta sotto.
- Fix immagine React: `object-fit: contain; padding: 10%` (prima veniva ritagliata con `cover`).
- Lista tecnologie ripristinata nel formato pipe-separated originale (`.tech-list-text`).
- Caroselli mantenuti in fondo.

---

## 9. Projects Section — `src/components/ProjectsSections.tsx`

**Completamente riscritto.** Prima il componente mostrava le card in modo non strutturato.

**Nuovo design:**
- Array `PROJECTS` centralizzato con tutti e 5 i progetti (nome, logo, immagine, link, descrizione, tag, classe CSS).
- Componente `ProjectCard` riutilizzabile con layout a griglia orizzontale **immagine | info**.
- Alternanza sinistra/destra (`proj-card--rev`) su ogni card dispari.
- **Immagine:** overlay scuro + icona `FiExternalLink` on-hover, click apre il link.
- **Info:** logo progetto, titolo, descrizione, tag tecnologie con stile pill ambra, link "Visita il progetto".
- Header sezione: eyebrow "Portfolio" + titolo gradiente + barra ambra.
- Ogni card ha un bordo sinistro colorato per progetto:
  - Sicily Fresh → ambra
  - Smartwage → blu
  - Ristonic → verde
  - Tech Quiz → viola
  - Meteo → ciano

---

## 10. Form Section — `src/components/FormSection.tsx`

**Completamente riscritto.** Rimosso Bootstrap completamente.

**Nuovo design:**
- Header coerente: eyebrow "Contatti" + titolo gradiente "Parliamoci" + barra ambra.
- **Layout due colonne:**
  - Sinistra: testo introduttivo + 3 link-card (Email, LinkedIn, GitHub) con hover slide.
  - Destra: form in glass card.
- **Form:** inputs nativi senza Bootstrap, dark glass, focus ambra.
- Nome e cognome affiancati su due colonne.
- Bottone invio ambra con icona `FiSend`.
- Logica backend invariata (POST a `koyeb.app/messaggi`).
- Aggiunto `useScrollReveal` per l'animazione d'ingresso.

---

## 11. Footer — `src/components/Footer.tsx`

**Completamente riscritto.** Rimosso Bootstrap completamente.

**Nuovo design — 3 colonne:**
1. **Brand:** nome con gradiente bianco→ambra, ruolo, icone social (Email, LinkedIn, GitHub) in cerchi con hover ambra.
2. **Navigazione:** link ancora a tutte le sezioni, hover con color + indent slide.
3. **Stack:** lista tecnologie usate nel portfolio.
- **Bottom bar:** copyright separato da un bordo sottile.
- Responsive su mobile: 2 colonne, brand full-width sopra.

---

## 12. CSS globale — `src/App.css`

Modifiche massicce. Panoramica per sezione:

| Classe/Blocco | Modifica |
|---|---|
| `body` | `background-color: #06080f` — sfondo scuro unificato |
| `.navbarIndex` | Glass morphism: `rgba(6,8,18,0.72)` + `backdrop-filter: blur(14px)` |
| `.bordiImage` | Bordo ambra (#f59e0b), glow, animazione fluida a 18 keyframe (22s) |
| `.hero-name` | Gradiente bianco→ambra con `background-clip: text` |
| `.hero-icon-link` | Hover ambra per icone social Hero |
| `.about-section` | Glass card con `backdrop-filter`, border-radius 2rem |
| `.about-stat-card` | Card stat con amber per il valore, hover lift |
| `.about-bio-card` | Card bio con glass e hover |
| `.tech-section-wrapper` | Glass morphism, header eyebrow/titolo/barra |
| `.tech-card-item` | `clamp(130px, 16vw, 190px)` larghezza |
| `.tech-image` | `object-fit: contain; padding: 10%` |
| `.tech-list-text` | Lista pipe-separated, colore attenuato |
| `.proj-*` | Tutte le classi per il nuovo sistema card progetti |
| `.contact-*` | Tutte le classi per il nuovo form contatti |
| `.footer-*` | Tutte le classi per il nuovo footer |
| `.sr-hidden` / `.sr-visible` | Animazione scroll reveal (opacity + translateY) |

---

## Riepilogo file toccati

| File | Tipo modifica |
|---|---|
| `src/components/ParticlesBackground.tsx` | Creato |
| `src/hooks/useScrollReveal.ts` | Creato |
| `src/hooks/useSectionFade.ts` | Creato |
| `src/App.tsx` | Modificato |
| `src/components/HomePage.tsx` | Modificato |
| `src/components/FirstSection.tsx` | Modificato |
| `src/components/AboutMe.tsx` | Riscritto |
| `src/components/TechSection.tsx` | Riscritto |
| `src/components/ProjectsSections.tsx` | Riscritto |
| `src/components/FormSection.tsx` | Riscritto |
| `src/components/Footer.tsx` | Riscritto |
| `src/App.css` | Modificato massicciamente |
| `vite.config.ts` | Modificato |
