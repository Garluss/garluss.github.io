const knapp = document.querySelector("#knapp");
const inn = document.querySelector("#inn");
const resultat = document.querySelector("#resultat");
const fors = document.querySelector("#antall");
let x = 0;
let gjettet = [];
const tall = Math.floor(Math.random()*11);
knapp.addEventListener("click", () => {
    if (gjettet.includes(inn.value)) {
        fors.innerText = `Antall forsøk: ${x}. Du har gjettet dette allerede.`;
    }
    else {
        x += 1;
        gjettet.push(inn.value);
        fors.innerText = `Antall forsøk: ${x}.`;
    }
    if (inn.value == tall) {
        resultat.innerText = "Du gjettet riktig!";
    }
    else if (x > 2 && tall > inn.value) {
        resultat.innerText = "Feil. Prøv et høyere tall."
    }
    else if (x > 2 && tall < inn.value) {
        resultat.innerText = "Feil. Prøv et lavere tall."
    }
    else {
        resultat.innerText = "Feil. Prøv på nytt.";
    }
    console.log(tall);
});