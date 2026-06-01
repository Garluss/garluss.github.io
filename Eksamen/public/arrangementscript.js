const ut = document.querySelector("#arrangliste");

async function hentData() {
    const res = await fetch("/api/arrangement_data");
    const data = await res.json();
    console.log(data);
    return data;
}

async function kjør() {
    data = await hentData();
    console.log(data);

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
        p.innerText = arrangement.Pris;
        udiv.appendChild(p);
        p = document.createElement("p");
        p.innerText = `${arrangement.Stedsnavn}, ${arrangement.Postnummer}`;
        udiv.appendChild(p);
        p = document.createElement("p");
        p.innerText = arrangement.Aldersgrense;
        udiv.appendChild(p);
        div.appendChild(udiv);
        ut.appendChild(div);
    });
}

kjør();