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


app.listen(port, () => console.log(`Running on ${port}`));
app.get("/hentMeldinger", (req, res) => {
    const row = db.prepare("SELECT * FROM melding").all();
    res.json(row);
});