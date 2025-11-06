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
    const opplastForm = document.querySelector("#opplastForm");

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
    opplastForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const res = await fetch("/api/opplast", {method: "POST",body: formData});

        if (res.ok) {
            window.location.reload();
        } else {
            console.error("Feilet opplastning");
        }
    });
}
function visBilde(bilde) {
    const ramme = document.querySelector("#visning");
    ramme.setAttribute("src","/bilder/"+bilde);
}
hentData();