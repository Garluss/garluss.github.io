const express = require('express');
const app = express();
const port = 8080;

const fs = require("fs");

app.use(express.static(__dirname + '/public'));

app.get("/api/bilder", (req,res) => {
    fs.readdir(__dirname + "/public/bilder", (_,filer) => {
        res.json(filer);
    });
});

app.post("/api/opplast", (req, res) => {
    console.log(req.body.bildeFil);
});


app.listen(port, () => console.log(`Running on ${port}`));

