async function hentData() {
    const fch = await fetch('http://localhost:3000/api/fjell_info');
    const data = await fch.json();

    return data;
}

async function kjør() {
    const liste = document.querySelector("#liste-fjell");

    const data = await hentData();

    for (let i = 0; i < data.length; i++) {
        let fjell = data[i];
        let div = document.createElement("div");
        let tittel = document.createElement("p");
        let hoyde = document.createElement("p");
        let beskrivelse = document.createElement("p");
        let bilde = document.createElement("img");
        div.setAttribute("class","fjell");
        tittel.style.fontWeight = "bold";
        tittel.innerText = fjell["fjellnavn"];
        hoyde.innerText = fjell["hoyde"] + " m.";
        beskrivelse.innerText = fjell["beskrivelse"];
        bilde.setAttribute("src","/foto/" + fjell["foto"]);
        div.appendChild(tittel);
        div.appendChild(hoyde);
        div.appendChild(beskrivelse);
        div.appendChild(bilde);
        liste.appendChild(div);
    }
}

kjør();