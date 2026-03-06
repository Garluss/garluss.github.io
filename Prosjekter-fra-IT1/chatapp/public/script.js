const ut = document.querySelector("#meldinger");
const skjema = document.querySelector("#skjema");
skjema.addEventListener("submit",send);

async function hent() {
    const res = await fetch("/hentMeldinger");
    const data = await res.json();
    ut.innerHTML = "";

    for (let i = data.length-1; i > data.length-10 && i > -1; i--) {
        console.log(i);
        console.log(data[i]);
        let div = document.createElement("div");
        div.setAttribute("class","meld-div");
        let p = document.createElement("p");
        let m = document.createElement("p");
        m.innerText = `${data[i].melding}`;
        p.innerText = `${data[i].navn} [${data[i].dato}]`;
        div.appendChild(p);
        div.appendChild(m);
        ut.appendChild(div);
    }
}

async function send(event) {
    event.preventDefault();
    const navn = document.querySelector("#navn").value.trim();
    const melding = document.querySelector("#melding").value.trim();
    let tid = new Date().toISOString();
    console.log(JSON.stringify({navn, melding, tid}));

    const res = await fetch("/sendMelding", {method:"POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({navn,melding,tid})});

    hent();
    document.querySelector("#melding").value = "";
}

hent();