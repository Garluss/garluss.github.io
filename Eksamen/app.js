const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const database = "arranet.db";

const Database = require("better-sqlite3");
const db = new Database(database);

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/arrangement.html");
});
app.get("/arrangoerer", (req,res) => {
    res.sendFile(__dirname + "/public/arrangoerer.html");
});

//API-er
app.get("/api/arrangement_data", (req,res) => {
    const rows = db.prepare(`
        SELECT 
            Arrangement.Navn, 
            Arrangement.Beskrivelse, 
            Arrangement.Kategori, 
            Arrangement.Dato, 
            Arrangement.Tid, 
            Arrangement.Aldersgrense, 
            Arrangement.Bilde,
            Sted.Navn AS Stedsnavn,
            Sted.Postnummer,
            BillettInfo.Pris 
        FROM Arrangement 
        LEFT JOIN Sted 
            ON Arrangement.StedID = Sted.StedID
        LEFT JOIN BillettInfo 
            ON Arrangement.BillettID = BillettInfo.BillettID;
    `).all();
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(`Server åpen på port ${PORT}`);
});