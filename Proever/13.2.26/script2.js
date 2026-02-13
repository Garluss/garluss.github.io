const liste = document.querySelector("#liste");

//henter info fra siden og gir data til vis()
async function hent() {
    const res = await fetch("https://anapioficeandfire.com/api/books");
    const data = await res.json();

    vis(data);
}

//viser data ved å gå gjennom bøkene og lage elementer for dem
function vis(data) {
    for (let i = 0; i < data.length; i++) {
        let bok = data[i];
        let inst = document.createElement("div");
        inst.setAttribute("class","bok");
        let tittel = document.createElement("button"); //lager knapp for dropdown
        tittel.innerText = bok.name;
        tittel.addEventListener("click", klikk);
        inst.appendChild(tittel);
        let ddcontent = document.createElement("div"); //div som gjøres display: none og display: block for å skjule og vise info
        let dato = document.createElement("p");
        let sider = document.createElement("p");
        dato.innerText = "Utgitt: " + bok.released.slice(0, 10);
        sider.innerText = "Antall sider: " + bok.numberOfPages;
        ddcontent.appendChild(dato);
        ddcontent.appendChild(sider);
        ddcontent.style.display = "none"; //skuler info til å begynne med
        tittel.appendChild(ddcontent);
        liste.appendChild(inst);
    }
}

function klikk(event) {
    let ddcontent = event.target.firstElementChild; //gir første barn til knapp-elementet
    if (ddcontent.getAttribute("style") == "display: none;") {
        ddcontent.style.display = "block";
    } else {
        ddcontent.style.display = "none";
    }
}

hent();
