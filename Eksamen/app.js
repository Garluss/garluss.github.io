const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const database = "arranet.db";

// Kobler til database
const Database = require("better-sqlite3");
const db = new Database(database);

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));


const multer = require('multer');
const uploadsDir = path.join(__dirname, 'public', 'bilder');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir); // cb er callback-funksjonen som tar (error, path) som argumenter - her, ingen feil, og path er uploadsDir.
    },
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
        cb(null, uniqueName); // cb er callback-funksjonen som tar (error, filename) som argumenter - her, ingen feil, og filename er det unike navnet vi genererer.
    }
});

const upload = multer({ storage });

// Grunnside
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/arrangement.html");
});

// Side for å vise en liste av arrangører
app.get("/arrangoerer", (req,res) => {
    res.sendFile(__dirname + "/public/arrangoerer.html");
});

// Side for å få opp detaljer om et visst arrangement med id ID
app.get("/arrangement/:ID", (req,res) => {
    res.sendFile(__dirname + "/public/utvid.html");
});

// Side for å redigere arrangementene
app.get("/rediger", (req,res) => {
    res.sendFile(__dirname + "/public/rediger.html");
});

//API-er
// API for å hente inn data om arrangementer
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
            Arrangement.Alttekst,
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

// API for å hente all data om visst arrangement. Dette er satt opp i tre individuelle SQL-kommandoer for ryddighet
app.get("/api/arrangement/:ID", (req,res) => { // Henter info om arrangementet
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
    `).all(ID); // Henter info om arrangøren og kontaktpersonen til arrangøren
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
    `).all(ID); // Henter info om roller
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

// Liste av personene
app.get("/api/personer", (req,res) => {
    const rows = db.prepare("SELECT * FROM Person").all();
    res.json(rows);
});

// Liste av arrangører
app.get("/api/arrangoerer", (req,res) => {
    const rows = db.prepare("SELECT * FROM Arrangør").all();
    res.json(rows);
});

// POST-rute for å lagre informasjon om en person i d.b.
app.post("/api/lagreperson", express.json(), async function (req,res) {
    const {fornavn,etternavn,epost,tlf} = req.body;
    db.prepare(`
        INSERT INTO 
            Person (Fornavn, Etternavn, Epost, Telefonnummer) 
        VALUES (?,?,?,?)
    `).run(fornavn,etternavn,epost,tlf);
    res.sendStatus(200);
});

// POST-rute for å lagre informasjon om arrangøren.
app.post("/api/lagrearrangoer", express.json(), async function (req,res) {
    let {navn,type,beskrivelse,kontaktperson} = req.body;
    if (kontaktperson == "") { kontaktperson = null};
    db.prepare(`
        INSERT INTO 
            Arrangør (Navn, Beskrivelse, Type, Kontaktperson)
        VALUES (?,?,?,?)
    `).run(navn,beskrivelse,type,kontaktperson);
    res.sendStatus(200);
});

// POST-rute for å lagre informasjon om arrangementet.
app.post("/api/lagrearrangement", upload.single('bilde'), async function (req,res) {
    const {navn,arrangoerID,kategori,beskrivelse,dato,tid,stedsnavn,postnummer,pris,antall,alder,alttekst} = req.body;
    const stedInsert = db.prepare(`
        INSERT INTO 
            Sted (Navn, Postnummer) 
        VALUES (?,?)
    `).run(stedsnavn, postnummer);
    const billettInsert = db.prepare(`
        INSERT INTO 
            BillettInfo (Pris, AntallTilgjengelig)
        VALUES (?,?)
    `).run(pris,antall);
    const { originalname, filename } = req.file;
    const bildenavn = filename;
    db.prepare(`
        INSERT INTO
            Arrangement (ArrangørID,Navn,Beskrivelse,Kategori,Dato,Tid,StedID,BillettID,Aldersgrense,Bilde,Alttekst)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `).run(Number(arrangoerID),navn,beskrivelse,kategori,dato,tid,stedInsert.lastInsertRowid,billettInsert.lastInsertRowid,alder,bildenavn,alttekst);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server åpen på port ${PORT}`);
});