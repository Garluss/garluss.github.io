const ut = document.querySelector("#arrangliste");

async function hentData() {
    const res = await fetch("/api/arrangement_data");
    const data = await res.json();
    return data;
}

/* Forslag til mulig slette-funksjon
async function slett(event) {
    const knapp = event.target;
    if (knapp.innerText != "Sikker?") {
        knapp.innerText  = "Sikker?";
    } else {
        const res = await fetch("/api/slett", {method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({"id":knapp.id})});
    }
}
*/

// I denne funksjon henter vi informasjon om alle de mulige valgene dropdownene kan ha.
// De gjenspeiler informasjonen fra databasen
async function oppdaterDropdowns() {
    let res = await fetch("/api/personer");
    const personer = await res.json();
    personer.forEach(person => {
        let option = document.createElement("option");
        option.setAttribute("value",person.PersonID);
        option.innerText = person.Fornavn + " " + person.Etternavn;
        document.querySelector("#kontaktperson").appendChild(option);
    });
    res = await fetch("/api/arrangoerer");
    const arrangører = await res.json();
    arrangører.forEach(arrangør => {
        let option = document.createElement("option");
        option.setAttribute("value",arrangør.ArrangørID);
        option.innerText = arrangør.Navn;
        document.querySelector("#arrangør").appendChild(option);
    });
    res = await fetch("/api/arrangement_data");
    const arrangement = await res.json();
    arrangement.forEach(arrangement => {
        let option = document.createElement("option");
        option.setAttribute("value",arrangement.ArrangementID);
        option.innerText = arrangement.Navn;
        document.querySelector("#arrangement").appendChild(option);
    });
    personer.forEach(person => {
        let option = document.createElement("option");
        option.setAttribute("value",person.PersonID);
        option.innerText = person.Fornavn + " " + person.Etternavn;
        document.querySelector("#person").appendChild(option);
    });
}

// Viser det skjemaet som velges med select-elementet
const dd = document.querySelector("#velg-input");
dd.addEventListener("change", (event) => {
    const verdi = dd.value
    if (verdi != "") {
        document.querySelectorAll(".skjema").forEach(element => { element.style.display = "none" });
        document.querySelector(`#skjema-${verdi.toLowerCase()}`).style.display = "flex";
    }
});

// Event-listener som sender info til backend om lagring av en person
document.querySelector("#skjema-person").addEventListener("submit", async (event) => {
    event.preventDefault();
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const epost = document.getElementById("epost").value;
    const tlf = document.getElementById("tlf").value;
    document.querySelector("#skjema-arrangør").reset();
    const res = await fetch("/api/lagreperson", {method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({fornavn,etternavn,epost,tlf})});
});

// Event-listener som sender informasjon om lagring av en arrangør
document.querySelector("#skjema-arrangør").addEventListener("submit", async (event) => {
    event.preventDefault();
    const navn = document.getElementById("aø-navn").value;
    const type = document.getElementById("type").value;
    const beskrivelse = document.getElementById("aø-beskrivelse").value;
    const kontaktperson = document.getElementById("kontaktperson").value;
    document.querySelector("#skjema-arrangør").reset();
    const res = await fetch("/api/lagrearrangoer", {method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({navn,type,beskrivelse,kontaktperson})});
});

// Event-listener som gjør sender info til backend om lagring av arrangement
document.querySelector("#skjema-arrangement").addEventListener("submit", async (event) => {
    event.preventDefault();
    const navn = document.getElementById("at-navn").value;
    let arrangør = document.getElementById("arrangør").value;
    console.log(arrangør)
    const kategori = document.getElementById("kategori").value;
    const beskrivelse = document.getElementById("at-beskrivelse").value;
    const dato = document.getElementById("dato").value;
    const tid = document.getElementById("tid").value;
    const stedsnavn = document.getElementById("stedsnavn").value;
    const postnummer = document.getElementById("postnummer").value;
    const pris = document.getElementById("pris").value;
    const antall = document.getElementById("antall").value;
    let alder = document.getElementById("alder").value;
    const bilde = document.getElementById("bilde").files[0]; // hent filen
    const alttekst = document.getElementById("alttekst").value;

    // Vi bruker formdata slik at vi kan laste opp bilde
    const formData = new FormData();
    formData.append("navn", navn);
    formData.append("arrangoerID", arrangør);
    formData.append("kategori", kategori);
    formData.append("beskrivelse", beskrivelse);
    formData.append("dato", dato);
    formData.append("tid", tid);
    formData.append("stedsnavn", stedsnavn);
    formData.append("postnummer", postnummer);
    formData.append("pris", pris);
    formData.append("antall", antall);
    formData.append("alder", alder);
    console.log(formData);
    formData.append("bilde", bilde); // legg til bildet
    formData.append("alttekst",alttekst);

    document.querySelector("#skjema-arrangør").reset();
    const res = await fetch("/api/lagrearrangement", {
        method: "POST",
        body: formData, // ingen headers, ingen JSON.stringify
    });
});




async function kjør() {
    data = await hentData();

    data.forEach(arrangement => {
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
        udiv.appendChild(p);
        p = document.createElement("p");
        p.innerText = `${arrangement.Stedsnavn}, ${arrangement.Postnummer}`;
        udiv.appendChild(p);

        p = document.createElement("p");
        p.innerText = `Aldersgrense: ${arrangement.Aldersgrense} +`;
        udiv.appendChild(p);
        div.appendChild(udiv);
        /*p = document.createElement("button");
        p.innerText = "Slett";
        p.setAttribute("id",arrangement.ArrangementID);
        p.addEventListener("click",slett);
        div.appendChild(p);*/
        ut.appendChild(div);
    });
    //Setter minimum tid
    const idag = new Date().toISOString().split("T")[0];
    document.querySelector("#dato").setAttribute("min",idag);

    oppdaterDropdowns();

    //Lager popup
    const popup = document.querySelector("#popup");
    let info = document.createElement("h3");
    info.innerText = "Sensitiv informasjon";
    popup.appendChild(info);
    info = document.createElement("p");
    info.innerText = `
    Denne siden kan spørre om sensitiv informasjon da man skal lagre nye data på databasen. \n
    Dette inkluderer telefonnummer og epost. Det er valgfritt å oppgi denne informasjonen.
    `;
    popup.appendChild(info);
    let knapp = document.createElement("button");
    knapp.innerText = "Jeg forstår.";
    knapp.addEventListener("click", (event) => { popup.innerHTML = ""; document.querySelector("#splitt").style.display = "grid"; });
    popup.appendChild(knapp);
}

kjør();