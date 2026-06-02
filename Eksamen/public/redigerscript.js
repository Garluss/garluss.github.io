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

const dd = document.querySelector("#velg-input");
dd.addEventListener("change", (event) => {
    const verdi = dd.value
    document.querySelectorAll(".skjema").forEach(element => { element.style.display = "none" });
    document.querySelector(`#skjema-${verdi.toLowerCase()}`).style.display = "flex";
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
}

kjør();