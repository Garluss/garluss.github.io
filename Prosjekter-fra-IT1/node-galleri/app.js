const express = require('express');
const multer = require("multer");
const app = express();
const port = 8080;

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/png", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Kun .png og .jpg filer er tillatt"), false);
  }
}

const upload = multer({storage, fileFilter});

const fs = require("fs");
const path = require("path");

app.use(express.static(__dirname + '/public'));

app.get("/api/bilder", (req,res) => {
    fs.readdir(__dirname + "/public/bilder", (_,filer) => {
        res.json(filer);
    });
});

app.post("/api/opplast", upload.single("bildeFil"), (req, res) => {
    if (!req.file) {
    return res.status(400).json({ error: "Ingen fil lastet opp eller filtype ikke tillatt" });
    }
    const lagreSti = path.join(__dirname, "public/bilder", req.file.originalname);
    fs.writeFile(lagreSti, req.file.buffer, (error) => {
        if (error) {
            console.error("Error, kan ikke lagre fil:", error);
            return res.status(500).send("Feilet å lagre fil");
        }
        console.log("Fil lagret til:", lagreSti);
        res.status(200).json({ success: true });
    })
});


app.listen(port, () => console.log(`Running on ${port}`));

