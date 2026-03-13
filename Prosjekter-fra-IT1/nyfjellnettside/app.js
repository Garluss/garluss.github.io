const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");

// CORS slik at andre kan bruke API
const cors = require("cors");
app.use(cors());

app.use(express.static('public'));

app.get('/api/fjell_info', (req, res) => {
    const rows = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
    res.json(rows);
});
app.get('/api/fjell_omraade', (req,res) => {
    const rows = db.prepare("SELECT fjell.fjellnavn, omraade.navn AS omraade FROM fjell LEFT JOIN omraade ON fjell.omraade_id = omraade.id").all();
    res.json(rows);
});
app.get("/api/alle_brukere", (req, res) => {
    const rows = db.prepare("SELECT * FROM person").all();
    res.json(rows);
})
app.get("/api/alle_turer", (req, res) => {
    const rows = db.prepare("SELECT * FROM fjelltur").all();
    res.json(rows);
});
app.get("/api/brukere/:brukernavn", (req,res) => {
    const bnavn = req.params.brukernavn;
    const rows = db.prepare("SELECT * FROM person WHERE brukernavn = ?").all(bnavn);
    res.json(rows);
})
app.get("/api/fjell/:fjellnavn", (req,res) => {
    const fnavn = req.params.fjellnavn;
    const rows = db.prepare("SELECT * FROM fjell WHERE fjellnavn = ?").all(fnavn);
    res.json(rows);
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/brukere", (req, res) => {
    res.sendFile(path.join(__dirname, "public/brukere.html"));
});


app.post("/nyTur", express.json(), (req,res) => {
    try {
        let {bruker,fjell,dato,varighet,beskrivelse} = req.body;

        bruker = bruker.toString().trim();
        fjell = fjell.toString().trim();
        dato = dato.toString().trim();
        varighet = varighet.toString().trim();
        beskrivelse = beskrivelse.toString().trim();

        const rows = db.prepare("SELECT * FROM fjelltur").all();
        const tur_id = rows.length+1;
        const rows2 = db.prepare("SELECT fjell_id FROM fjell WHERE fjellnavn = ?").all(fjell);
        const fjell_id = rows2[0].fjell_id;

        db.prepare("INSERT INTO fjelltur (fjelltur_id, tidspunkt, varighet, beskrivelse, brukernavn, fjell_id) VALUES (?, ?, ?, ?, ?, ?)").run(tur_id,dato,varighet,beskrivelse,bruker,fjell_id);
        console.log("Lagt til tur på bruker " + bruker);

        return res.sendStatus(201);
    } catch (err) {
        console.log("Feil ved innsending.");
        return res.status(500).json({ error: 'Tur kunne ikke lagres.' });
    }
});



app.listen(PORT, function() { console.log("Starter server.") });