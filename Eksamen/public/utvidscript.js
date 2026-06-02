const ID = window.location.pathname.split("/")[2];

async function hentData() {
    const res = await fetch("/api/arrangement/" + ID);
    const data = await res.json();
    return data;
}

async function kjør() {
    const data = await hentData();

    const arrangement = data[0][0];
    const arrangør = data[1][0];
    const roller = data[2];

    //Setter inn for arrangement:
    Object.keys(arrangement).forEach(nøkkel => {
        try {
            let text = document.querySelector(`#${nøkkel.toLowerCase()}`).innerText;
            let ps = text.split("/");
            if (ps.length > 0 && ps[0] != "") {
                document.querySelector(`#${nøkkel.toLowerCase()}`).innerText = ps[0] + arrangement[nøkkel] + ps[1];
            } else {
                document.querySelector(`#${nøkkel.toLowerCase()}`).innerText = arrangement[nøkkel];
            }
        } catch { }
    });
    //Setter inn for arrangøren:
    document.querySelector("#arg-navn").innerText = arrangør.Navn;
    document.querySelector("#arg-type").innerText = arrangør.Type;
    document.querySelector("#arg-beskrivelse").innerText = arrangør.Beskrivelse;
    document.querySelector("#arg-kontaktnavn").innerText = `Kontaktperson: ${arrangør.KontaktpersonFornavn + " " + arrangør.KontaktpersonEtternavn}`;
    document.querySelector("#arg-kontaktpersonepost").innerText = arrangør.KontaktpersonEpost;
    document.querySelector("#arg-kontaktpersontlf").innerText = "Tlf.: " + arrangør.KontaktpersonTlf;

    //Setter inn for roller:
    console.log(roller);
    if (roller.length > 0) {
        document.querySelector("#tittel-roller").innerText = "Andre relaterte personer";
        const ut = document.querySelector("#rolleliste");
        roller.forEach(person => {
            let div = document.createElement("div");
            let p = document.createElement("h3");
            p.innerText = person.Fornavn + " " + person.Etternavn;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerText = person.Rolle;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerText = "Epost: " + person.Epost;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerText = person.Telefonnummer;
            div.appendChild(p);
            ut.appendChild(div);
        });
    }
}

kjør();