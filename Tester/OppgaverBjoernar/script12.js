const inn = document.querySelector("#alder");
const knapp = document.querySelector("#knapp");
const ut = document.querySelector("#ut");

knapp.addEventListener("click",funksjon);
function funksjon() {
    if (inn.value < 18) {
        ut.innerHTML = "<p>Sperret innhold </p>";
    }
    else {
        ut.innerHTML = "<img src=kitten.jpg width=300 height=200>"
    }
}
