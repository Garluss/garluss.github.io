const ut = document.querySelector("#arrangliste");

async function hentData() {
    const res = await fetch("/api/arrangement_data");
    const data = await res.json();
    return data;
}

function utvid(event) {
    window.location.pathname = "/arrangement/" + event.target.id;
}

// Viser det skjemaet som velges med select-elementet
const dd = document.querySelector("#kategori-select");
dd.addEventListener("change", (event) => {
    const verdi = dd.value
    console.log(verdi);
    oppdaterListe(verdi);
});

async function kjør() {
    let data = await hentData();
    let kategorier = []
    document.querySelector("#kategori-select").innerHTML = "<option value=''></option>"
    data.forEach(arrangement => {
        if (kategorier.includes(arrangement.Kategori) == false) {
            kategorier.push(arrangement.Kategori);
        }
    });
    kategorier.forEach(kategori => {
        let option = document.createElement("option");
        option.value = kategori;
        option.innerText = kategori;
        document.querySelector("#kategori-select").appendChild(option)
    });
    oppdaterListe("");
}

async function oppdaterListe(filter) {
    let data = await hentData();
    ut.innerHTML = "";
    data.forEach(arrangement => {
        if (arrangement.Kategori != filter && filter != "") {
            return;
        }
        let div = document.createElement("div");
        div.setAttribute("class","arrang");

        let udiv = document.createElement("div");
        udiv.setAttribute("class","a-o");

        let p = document.createElement("h2");
        p.innerText = arrangement.Navn;
        udiv.appendChild(p);

        p = document.createElement("p");
        p.setAttribute("class","a-kat");
        p.innerText = arrangement.Kategori;
        udiv.appendChild(p);

        div.appendChild(udiv);
        let img = document.createElement("img");
        img.setAttribute("src","/bilder/" + arrangement.Bilde);
        img.setAttribute("alt",arrangement.Alttekst);
        div.appendChild(img);

        p = document.createElement("p");
        p.innerText = arrangement.Beskrivelse;
        p.setAttribute("class","a-bes");
        div.appendChild(p);

        udiv = document.createElement("div");
        udiv.setAttribute("class","a-u");
        p = document.createElement("p");
        p.innerText = `${arrangement.Dato} / ${arrangement.Tid}`;
        udiv.appendChild(p);

        p = document.createElement("p");
        p.innerText = `Bilettpris: ${arrangement.Pris},-`;
        if (arrangement.Pris == 0 || arrangement.Pris == "") { p.innerText = "Gratis." }
        udiv.appendChild(p);

        p = document.createElement("p");
        p.innerText = `${arrangement.Stedsnavn}, ${arrangement.Postnummer}`;
        udiv.appendChild(p);

        p = document.createElement("p");
        p.innerText = `Aldersgrense: ${arrangement.Aldersgrense} +`;
        if (arrangement.Aldersgrense == 0 || arrangement.Aldersgrense == "") { p.innerText = "Ingen aldersgrense." }
        udiv.appendChild(p);
        div.appendChild(udiv);

        p = document.createElement("button");
        p.innerText = "Utforsk";
        p.setAttribute("id",arrangement.ArrangementID);
        p.addEventListener("click",utvid);
        div.appendChild(p);

        ut.appendChild(div);
    });
}

kjør();