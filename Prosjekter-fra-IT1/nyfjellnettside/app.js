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

app.get("/api/goon", (req,res) => {
    const goon = [];
    for (let i = 0; i < 10000; i++) {
        goon.push("goon");
    }
    res.json(goon);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.listen(PORT, function() { console.log("Starter server.") });