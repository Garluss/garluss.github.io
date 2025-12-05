const skjema = document.querySelector("#skjema");

skjema.addEventListener("submit", function(event) {
    event.preventDefault();

    const navn = document.getElementById("navn");
    const epost = document.getElementById("epost");
    const tlf = document.getElementById("tlf");
    const gate = document.getElementById("gate");
    const postnummer = document.getElementById("postnummer");
    const by = document.getElementById("by");
    const billett = document.getElementById("billett");
    const dato = document.getElementById("dato");

    console.log(billett.value, by.value, epost.value, dato.value);
});