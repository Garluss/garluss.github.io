const skjema = document.querySelector("#skjema");
const ut = document.querySelector("#ut");

let koder = ["12345", "99983", "23342"];

skjema.addEventListener("submit", function(event) {
    event.preventDefault();

    const fnavn = document.querySelector("#fornavn").value;
    let tekst = `Takk for din registrering, ${fnavn}!`;

    const kode = document.querySelector("#rabatt").value;
    if (koder.includes(kode)) {
        tekst = tekst + `\nDu har oppgitt en rabattkode og får en rabattert pris`;
    }
    ut.innerText = tekst;
});