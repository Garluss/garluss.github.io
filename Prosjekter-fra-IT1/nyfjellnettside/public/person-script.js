const dd1 = document.querySelector("#alle-brukere");
const ddfjell = document.querySelector("#fjell");
const skjema = document.querySelector("#skjema");

dd1.addEventListener("change", settOppBruker);

skjema.addEventListener("submit", sendInn);

async function sendInn(event) {
    event.preventDefault();
    const bruker = dd1.value;
    const fjell = document.querySelector("#fjell").value;
    const dato = document.querySelector("#dato").value;
    const varighet = document.querySelector("#varighet").value;
    const beskrivelse = document.querySelector("#beskrivelse").value;

    console.log(bruker,fjell,dato,varighet,beskrivelse);

    const res = await fetch("/nyTur", {method:"POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({bruker,fjell,dato,varighet,beskrivelse})});
}


async function hent() {
    const res = await fetch("/api/alle_brukere");
    const data = await res.json();

    const resfjell = await fetch("/api/fjell_info");
    const datafjell = await resfjell.json();

    return [data, datafjell];
}
async function settOppBruker(event) {
    try {
        const res = await fetch("/api/brukere/" + event.target.value);
        const data = await res.json();

        const info = document.querySelector("#info");
        info.innerHTML = "";
        skjema.style.display = "flex";
        Object.keys(data[0]).forEach(key => {
            let p = document.createElement("p");
            p.innerText = `${key}: ${data[0][key]}`;
            info.appendChild(p);
        });

    } catch(e) {
        if (e instanceof SyntaxError) {
            document.querySelector("#info").innerHTML = "";
            skjema.style.display = "none";
        }
    }
}

async function kjør() {
    const [data, fjelldata] = await hent();

    data.forEach(bruker => {
        let op = document.createElement("option");
        op.setAttribute("value",bruker.brukernavn);
        op.innerText = bruker.brukernavn;
        op.setAttribute("class","dropdown-objekt");
        dd1.appendChild(op);
    });
    fjelldata.forEach(fjell => {
        let op = document.createElement("option");
        op.setAttribute("value",fjell.fjellnavn);
        op.innerText = fjell.fjellnavn;
        ddfjell.appendChild(op);
    });
}

kjør();