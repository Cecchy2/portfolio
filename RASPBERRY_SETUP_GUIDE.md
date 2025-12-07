# Guida Completa: Hostare Portfolio su Raspberry Pi 5

## 📋 COSA TI SERVE

### Hardware:

- Raspberry Pi 5
- MicroSD card (minimo 16GB, consigliato 32GB)
- Alimentatore ufficiale Raspberry Pi 5 (USB-C, 5V/5A)
- Cavo Ethernet (consigliato) oppure WiFi
- (Opzionale) Monitor, tastiera, mouse per la prima configurazione

### Software da scaricare sul tuo Mac:

- **Raspberry Pi Imager**: https://www.raspberrypi.com/software/

---

## 🚀 FASE 1: PREPARAZIONE DELLA MICROSD (sul tuo Mac)

### Step 1.1: Installare Raspberry Pi Imager

1. Vai su https://www.raspberrypi.com/software/
2. Scarica "Raspberry Pi Imager for macOS"
3. Apri il file .dmg scaricato
4. Trascina l'app nella cartella Applicazioni
5. Apri "Raspberry Pi Imager"

### Step 1.2: Inserire la MicroSD nel Mac

1. Inserisci la MicroSD nel lettore di schede del Mac (o usa un adattatore USB)
2. Aspetta che appaia sul desktop

### Step 1.3: Installare il Sistema Operativo

1. **Apri Raspberry Pi Imager**
2. Clicca su **"Scegli dispositivo"** → seleziona **"Raspberry Pi 5"**
3. Clicca su **"Scegli SO"** → seleziona **"Raspberry Pi OS (64-bit)"** (la prima opzione, quella consigliata)
4. Clicca su **"Scegli l'archiviazione"** → seleziona la tua MicroSD

### Step 1.4: IMPORTANTE - Configurazione Iniziale

1. Clicca sull'icona dell'**ingranaggio** ⚙️ in basso a destra (o clicca "Modifica impostazioni")
2. Compila questi campi:

   **Scheda GENERALE:**

   - ✅ Imposta nome host: `raspberry-portfolio` (o il nome che preferisci)
   - ✅ Imposta nome utente e password:
     - Nome utente: `pi` (o quello che preferisci)
     - Password: `[SCEGLINE UNA SICURA]` **ANNOTALA!**
   - ✅ Configura LAN wireless (se non usi il cavo Ethernet):
     - SSID: nome della tua rete WiFi
     - Password: password del WiFi
     - Paese wireless: `IT`
   - ✅ Imposta impostazioni internazionali:
     - Fuso orario: `Europe/Rome`
     - Layout tastiera: `it`

   **Scheda SERVIZI:**

   - ✅ Abilita SSH
   - Seleziona "Usa autenticazione con password"

3. Clicca **"Salva"**
4. Clicca **"SÌ"** quando chiede di applicare le impostazioni
5. Clicca **"SÌ"** quando avverte che tutti i dati sulla SD saranno cancellati
6. Inserisci la password del tuo Mac se richiesta
7. **Aspetta che finisca** (circa 5-10 minuti) - vedrai:
   - "Scrittura in corso..."
   - "Verifica in corso..."
   - "Scrittura completata" ✅

### Step 1.5: Rimuovere la MicroSD

1. Clicca su **"Continua"**
2. Espelli la MicroSD dal Mac (trascinala nel cestino o clicca "Espelli")
3. Rimuovi fisicamente la MicroSD

---

## 🔌 FASE 2: PRIMO AVVIO DEL RASPBERRY PI

### Step 2.1: Assemblaggio

1. Inserisci la MicroSD nel Raspberry Pi (lo slot è sotto)
2. Collega il cavo Ethernet al Raspberry e al tuo router (se non usi WiFi)
3. **NON collegare ancora l'alimentatore**

### Step 2.2: Prima Accensione

1. **Collega l'alimentatore** al Raspberry Pi
2. Si accenderà automaticamente
3. Aspetta **2-3 minuti** - vedrai LED rosso (alimentazione) e LED verde lampeggiante (attività)

### Step 2.3: Trovare l'indirizzo IP del Raspberry

**Opzione A - Se hai collegato monitor e tastiera:**

1. Dopo il boot, login:
   - Username: `pi` (o quello che hai scelto)
   - Password: quella che hai impostato
2. Digita: `hostname -I`
3. **ANNOTA l'indirizzo IP** (es: 192.168.1.100)

**Opzione B - Senza monitor (consigliato):**

1. Sul tuo Mac, apri il **Terminale** (cerca "Terminale" in Spotlight)
2. Digita questo comando:
   ```bash
   arp -a | grep -i "b8:27:eb\|dc:a6:32\|e4:5f:01"
   ```
3. Oppure accedi al tuo router:
   - Apri il browser
   - Vai all'IP del router (di solito `192.168.1.22`)
   - Login (credenziali sul router)
   - Cerca "Dispositivi connessi" o "DHCP"
   - Trova "raspberry-portfolio" e **ANNOTA l'IP**

---

## 💻 FASE 3: COLLEGARSI AL RASPBERRY PI DA REMOTO (SSH)

### Step 3.1: Collegamento SSH dal Mac

1. Apri il **Terminale** sul Mac
2. Digita (sostituisci con il TUO IP):
   ```bash
   ssh pi@192.168.1.22
   ```
3. Se chiede "Are you sure you want to continue connecting?" → scrivi `yes` e premi Invio
4. Inserisci la password che hai scelto
5. **SEI DENTRO!** Vedrai qualcosa tipo: `pi@raspberry-portfolio:~ $`

---

## 🔧 FASE 4: CONFIGURAZIONE INIZIALE DEL RASPBERRY

### Step 4.1: Aggiornare il Sistema

Copia e incolla questi comandi uno alla volta nel terminale SSH:

```bash
sudo apt update
```

Aspetta che finisca (circa 30 secondi)

```bash
sudo apt upgrade -y
```

Aspetta che finisca (circa 5-10 minuti) - scarica e installa tutti gli aggiornamenti

### Step 4.2: Riavvio (opzionale ma consigliato)

```bash
sudo reboot
```

Aspetta 1-2 minuti, poi riconnettiti:

```bash
ssh pi@192.168.1.22
```

---

## 📦 FASE 5: INSTALLARE NODE.JS

### Step 5.1: Installare Node.js versione 20 (LTS)

Copia questi comandi uno alla volta:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

Aspetta che finisca (circa 1 minuto)

```bash
sudo apt install -y nodejs
```

Aspetta che finisca (circa 2-3 minuti)

### Step 5.2: Verificare l'installazione

```bash
node -v
```

Dovrebbe mostrare qualcosa tipo: `v20.x.x`

```bash
npm -v
```

Dovrebbe mostrare qualcosa tipo: `10.x.x`

✅ **Se vedi le versioni, Node.js è installato correttamente!**

---

## 🏗️ FASE 6: PREPARARE L'APPLICAZIONE (sul tuo Mac)

### Step 6.1: Build del progetto

1. Sul tuo Mac, apri il Terminale
2. Vai nella cartella del progetto:

   ```bash
   cd /Users/dariocecchinato/Desktop/WebDev/portfolio
   ```

3. Installa le dipendenze (se non l'hai già fatto):

   ```bash
   npm install
   ```

4. Crea la build di produzione:
   ```bash
   npm run build
   ```
   Aspetta che finisca - verrà creata una cartella chiamata `dist`

### Step 6.2: Verificare la build

```bash
ls dist
```

Dovresti vedere file tipo `index.html`, `assets/`, ecc.

---

## 📤 FASE 7: TRASFERIRE I FILE SUL RASPBERRY PI

### Step 7.1: Creare la cartella sul Raspberry

Nel terminale SSH connesso al Raspberry:

```bash
mkdir -p /home/pi/portfolio
```

### Step 7.2: Trasferire i file (dal Mac)

Sul tuo Mac, apri un **nuovo Terminale** (non quello SSH) e digita:

```bash
cd /Users/dariocecchinato/Desktop/WebDev/portfolio
scp -r dist/* pi@192.168.1.22:/home/pi/portfolio/
```

Inserisci la password del Raspberry quando richiesta.
Aspetta che finisca il trasferimento (circa 1-2 minuti)

### Step 7.3: Verificare il trasferimento

Torna nel terminale SSH del Raspberry e digita:

```bash
ls /home/pi/portfolio
```

Dovresti vedere: `index.html`, `assets/`, ecc.

---

## 🌐 FASE 8: INSTALLARE E CONFIGURARE NGINX (Web Server)

### Step 8.1: Installare Nginx

Nel terminale SSH del Raspberry:

```bash
sudo apt install -y nginx
```

Aspetta che finisca (circa 1 minuto)

### Step 8.2: Verificare che Nginx funzioni

```bash
sudo systemctl status nginx
```

Dovresti vedere "active (running)" in verde.
Premi `q` per uscire.

### Step 8.3: Testare nel browser

Sul tuo Mac, apri il browser e vai a:

```
http://192.168.1.22
```

Dovresti vedere la pagina di benvenuto di Nginx! 🎉

### Step 8.4: Configurare Nginx per servire la tua app

Nel terminale SSH del Raspberry:

1. Crea un nuovo file di configurazione:

   ```bash
   sudo nano /etc/nginx/sites-available/portfolio
   ```

2. Si aprirà un editor di testo. **Copia e incolla** questo:

   ```nginx
   server {
       listen 80;
       listen [::]:80;

       server_name _;

       root /home/pi/portfolio;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Ottimizzazioni per asset statici
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. Salva e esci:
   - Premi `Ctrl + O` (salva)
   - Premi `Invio` (conferma)
   - Premi `Ctrl + X` (esci)

### Step 8.5: Attivare la configurazione

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
```

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Step 8.6: Testare la configurazione

```bash
sudo nginx -t
```

Dovresti vedere: "syntax is ok" e "test is successful" ✅

### Step 8.7: Riavviare Nginx

```bash
sudo systemctl restart nginx
```

### Step 8.8: Rendere Nginx automatico all'avvio

```bash
sudo systemctl enable nginx
```

---

## 🎉 FASE 9: TESTARE L'APPLICAZIONE

### Step 9.1: Aprire nel browser

Sul tuo Mac (o qualsiasi dispositivo sulla stessa rete):

```
http://192.168.1.22
```

✅ **Dovresti vedere il tuo portfolio funzionante!**

---

## 🔒 FASE 10: CONFIGURAZIONI OPZIONALI (AVANZATE)

### Opzione A: Assegnare un IP statico al Raspberry

1. SSH nel Raspberry
2. Edita il file di configurazione:

   ```bash
   sudo nano /etc/dhcpcd.conf
   ```

3. Aggiungi in fondo (modifica con i TUOI valori):

   ```
   interface eth0
   static ip_address=192.168.1.100/24
   static routers=192.168.1.1
   static domain_name_servers=8.8.8.8 8.8.4.4
   ```

4. Salva (`Ctrl+O`, `Invio`, `Ctrl+X`)
5. Riavvia:
   ```bash
   sudo reboot
   ```

### Opzione B: Accedere dall'esterno (Internet)

**Metodo 1 - Port Forwarding (più complesso):**

1. Accedi al tuo router
2. Trova "Port Forwarding" o "Virtual Server"
3. Crea una regola:
   - Porta esterna: 80
   - Porta interna: 80
   - IP: 192.168.1.100
   - Protocollo: TCP
4. Trova il tuo IP pubblico: https://whatismyipaddress.com/
5. Accedi da fuori con: `http://TUO_IP_PUBBLICO`

**Metodo 2 - DNS Dinamico (consigliato):**

1. Registrati su DuckDNS: https://www.duckdns.org/
2. Crea un dominio gratuito (es: `tuoportfolio.duckdns.org`)
3. Sul Raspberry, installa il client DuckDNS
4. Configura port forwarding come sopra
5. Accedi con: `http://tuoportfolio.duckdns.org`

### Opzione C: HTTPS con certificato SSL (sicurezza)

**Prima completa l'Opzione B!**

1. Installa Certbot:

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. Ottieni certificato (sostituisci con il tuo dominio):

   ```bash
   sudo certbot --nginx -d tuoportfolio.duckdns.org
   ```

3. Segui le istruzioni (inserisci email, accetta termini)
4. Certbot configurerà automaticamente HTTPS!
5. Accedi con: `https://tuoportfolio.duckdns.org` 🔒

---

## 🔄 AGGIORNARE L'APPLICAZIONE

Quando fai modifiche al codice:

1. Sul Mac, rebuild:

   ```bash
   cd /Users/dariocecchinato/Desktop/WebDev/portfolio
   npm run build
   ```

2. Trasferisci i nuovi file:

   ```bash
   scp -r dist/* pi@192.168.1.122:/home/pi/portfolio/
   ```

3. Fatto! Ricarica la pagina nel browser (Ctrl+Shift+R per forzare)

---

## 🆘 RISOLUZIONE PROBLEMI

### Non riesco a connettermi via SSH

- Verifica che il Raspberry sia acceso (LED rosso)
- Verifica l'IP: potrebbe essere cambiato
- Riprova il comando arp o controlla il router

### La pagina non si carica

```bash
sudo systemctl status nginx
```

Se non è "active", riavvia:

```bash
sudo systemctl restart nginx
```

### Errore 403 Forbidden

Controlla i permessi:

```bash
sudo chmod -R 755 /home/pi/portfolio
```

### Il Raspberry è lento

- Usa una MicroSD veloce (Classe 10, A2)
- Monitora risorse: `htop` (installa con `sudo apt install htop`)

---

## 📊 COMANDI UTILI

```bash
# Vedere i log di Nginx
sudo tail -f /var/log/nginx/error.log

# Riavviare Nginx
sudo systemctl restart nginx

# Vedere lo spazio disco
df -h

# Vedere la memoria RAM
free -h

# Spegnere il Raspberry
sudo shutdown -h now

# Riavviare il Raspberry
sudo reboot

# Vedere tutti i servizi attivi
sudo systemctl list-units --type=service --state=running
```

---

## ✅ CHECKLIST FINALE

- [ ] MicroSD preparata con Raspberry Pi Imager
- [ ] SSH abilitato e funzionante
- [ ] Sistema aggiornato (`apt update && upgrade`)
- [ ] Node.js installato e verificato
- [ ] Build creata (`npm run build`)
- [ ] File trasferiti sul Raspberry
- [ ] Nginx installato e configurato
- [ ] Portfolio visibile nel browser
- [ ] (Opzionale) IP statico configurato
- [ ] (Opzionale) Accessibile dall'esterno
- [ ] (Opzionale) HTTPS configurato

---

**🎓 NOTA FINALE:**
Questa guida ti porta da zero a un'applicazione web funzionante su Raspberry Pi.
Ogni step è stato testato e spiegato nel dettaglio.

Se qualcosa non funziona, **rileggi attentamente lo step** e verifica di aver seguito tutti i passaggi.

**Buon lavoro! 🚀**
