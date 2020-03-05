# KITTENWARS

## Requisiti

-   [Node](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)

Server web per l'applicativo web e mobile di Kittenwars.

-   Prima installazione: `npm install`
-   Compilazione: `npm run build`
-   Avvio: `npm start`
    -   Server in ascolto sulla porta `3000`

Il progetto comprende solo il server. I file statici del [front-end](https://github.com/loribonna/kittenwars-client.git) vanno compilati e posti nella cartella `statics`.
Il server usa MongoDB come DBMS. Assicurarsi di avere una versione di mongodb installata e in ascolto sulla porta di default.
Il server necessita di un file di ambiente (`.env`) comprensivo di:

-   `EXPRESS_SECRET`: stringa casuale per sessione di express,
-   `GOOGLE_OAUTH_CLIENT_ID` e `GOOGLE_OAUTH_CLIENT_SECRET`: per accesso a google dal client web,
-   `GOOGLE_APP_CLIENT_ID`: per accesso a google del client mobile,
-   `JWT_SECRET_KEY`: stringa casuale per token JWT.
    Il file `.env` deve essere posto nella cartella `src`.

Test:

-   `npm run test`
-   La maggior parte dei componenti effettuano operazioni CRUD basiche. L'unico test effettuato si trova in `dto.spec.ts` per verificare il funzionamento dei DTO.

## Note

È possibile visionare l'applicativo all'indirizzo https://kittenwars-awm.herokuapp.com/ grazie all'hosting gratuito di Heroku.
Dato che è stata usata la versione gratuita si hanno pesanti rallentamenti, per cui è opportuno caricare solo immagini di piccola dimensione.
L'hosting gratuito di heroku elimina ogni file locale quando, dopo qualche minuto di inattività, entra in modalità sospensione.

Per avviare localmente l'applicativo è necessario dotarsi del file di ambiente `.env`.
Accertarsi che la cartella `statics` contenga i file statici del front-end prima di avviare l'applicativo.

Ogni immagine caricata deve essere convalidata da un utente amministratore. L'unico modo per assegnare diritti di amministrazione ad un utente richiede l'accesso al database.
Per assegnare diritti di amministratore:
- Accedere al database `kittens` e alla collection `users`. Cambiare il valore `isAdmin` del documento corrispondente all'utente richiesto a `true`.
- Si consiglia l'uso di client mongodb come [Robomongo](https://robomongo.org/)

## Traccia concordata

Tecnologie:

-   Backend realizzato tramite il framework NestJS. Questa scelta è motivata dal fatto che ho già utilizzato Django per una tesina progettuale, per cui vorrei utilizzare un framework diverso.
-   App mobile realizzata tramite React Native.
-   Interfaccia Web realizzata tramite React. Gli utenti amministratori avranno funzionalità avanzate tramite questa.

Funzionalità:

-   Autenticazione tramite i principali OAuth provider, sfruttando la libreria PassportJS.
-   All’utente autenticato viene permesso di:
-   Votare le immagini, selezionando tra due proposte.
-   Inserire nuove immagini -> scatto foto. Queste verranno proposte ad un amministratore prima di venire inserite nel sistema di votazione.
-   Vedere il proprio punteggio.
-   Vedere una classifica di punteggi e la propria posizione in essa.
-   Visualizzare le immagini più votate e meno votate.
-   All’utente non autenticato viene permesso solo di visualizzare le immagini più votate e meno votate.
