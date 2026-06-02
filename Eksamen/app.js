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

app.get("/arrangement/:ID", (req,res) => {
    res.sendFile(__dirname + "/public/utvid.html");
});

app.get("/rediger", (req,res) => {
    res.sendFile(__dirname + "/public/rediger.html");
});

//API-er
app.get("/api/arrangement_data", (req,res) => {
    const rows = db.prepare(`
        SELECT
            Arrangement.ArrangementID,
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

app.get("/api/arrangement/:ID", (req,res) => {
    const ID = req.params.ID;
    const rows1 = db.prepare(`
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
            BillettInfo.Pris,
            BillettInfo.AntallTilgjengelig
        FROM Arrangement 
        LEFT JOIN Sted 
            ON Arrangement.StedID = Sted.StedID
        LEFT JOIN BillettInfo 
            ON Arrangement.BillettID = BillettInfo.BillettID
        WHERE Arrangement.ArrangementID = ?;
    `).all(ID);
    const rows2 = db.prepare(`
        SELECT
            Arrangør.ArrangørID,
            Arrangør.Navn,
            Arrangør.Beskrivelse,
            Arrangør.Type,
            Person.Fornavn AS KontaktpersonFornavn,
            Person.Etternavn AS KontaktpersonEtternavn,
            Person.Epost AS KontaktpersonEpost,
            Person.Telefonnummer AS KontaktpersonTlf
        FROM Arrangement
        LEFT JOIN Arrangør
            ON Arrangement.ArrangørID = Arrangør.ArrangørID
        JOIN Person
            ON Arrangør.Kontaktperson = Person.PersonID
        WHERE Arrangement.ArrangementID = ?;
    `).all(ID);
    const rows3 = db.prepare(`
        SELECT
            Person.Fornavn,
            Person.Etternavn,
            Person.Epost,
            Person.Telefonnummer,
            ArrangementPerson.Rolle
        FROM Arrangement
        LEFT JOIN ArrangementPerson
            ON Arrangement.ArrangementID = ArrangementPerson.ArrangementID
        JOIN Person
            ON ArrangementPerson.PersonID = Person.PersonID
        WHERE Arrangement.ArrangementID = ?;
    `).all(ID);
    res.json([rows1,rows2,rows3]);
});

app.listen(PORT, () => {
    console.log(`Server åpen på port ${PORT}`);
});