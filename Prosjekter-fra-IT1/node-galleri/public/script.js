//legg til get og give greier her og i app.js slik at han kan hente bildene og sende bilder

async function hentData() {
    const response = await fetch("/api/bilder", { method: "GET" });
    const data = await response.json();

    main(data);
}
function main(data) {
    const bilder = data;
    const knappN = document.querySelector("#neste");
    const knappF = document.querySelector("#forrige");

    let bilde_indeks = 0;

    knappN.addEventListener("click", (event) => {
        if (bilde_indeks+1 >= Object.keys(bilder).length) {
            bilde_indeks = 0;
        } else {
            bilde_indeks += 1;
        }
        visBilde(bilder[bilde_indeks]);
    });
    knappF.addEventListener("click", (event) => {
        if (bilde_indeks-1 < 0) {
            bilde_indeks = Object.keys(bilder).length-1;
        } else {
            bilde_indeks += -1;
        }
        visBilde(bilder[bilde_indeks]);
    });
    visBilde(bilder[bilde_indeks]);
}
function visBilde(bilde) {
    const ramme = document.querySelector("#visning");
    ramme.setAttribute("src","/bilder/"+bilde);
}
hentData();