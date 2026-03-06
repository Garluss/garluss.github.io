//NESTE
//      Legg til send mleding unksjon greier

const express = require('express');
const app = express();
const port = 3000;

const Database = require('better-sqlite3');
const db = new Database("logs.db");

app.use(express.static('public'));

//Ka E DETTE FOR NO
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/",(req,res) => {
    res.sendFile(__dirname__ + "/public/index.html");
});

app.get("/hentMeldinger", (req, res) => {
    const row = db.prepare("SELECT * FROM melding").all();
    res.json(row);
});

app.post("/sendMelding",(req,res) => {
    try {
        let {navn, melding, tid} = req.body;

        navn = navn.toString().trim();
        melding = melding.toString().trim();
        tid = tid.toString().trim();
        console.log(navn,melding,tid);

        db.prepare("INSERT INTO melding (navn, melding, dato) VALUES (?, ?, ?)").run(navn,melding,tid);
        return res.sendStatus(201);
    } catch (err) {
        console.log("Feil ved innsending.");
        return res.status(500).json({ error: 'Melding kunne ikke lagres.' });
    }
})

app.listen(port, () => console.log(`Running on ${port}`));