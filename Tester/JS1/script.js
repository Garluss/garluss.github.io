// Dette er en kommentar
// Variabler
let nummer = 4.45323;
let tekst = "Hallo";
let ja = true;
const Gud = true;

let avstand = 50;

let liste = ["funny1.png","icons/icon.ico"];

// Utskrift
console.log(`${avstand}m`);

console.warn("!!! -- Advarsel -- !!!");
console.error("Error 601: ");

//alert("Bøøøøøø!");

//Bedre å bruke .innerText i dette tilfellet
const elementUt = document.getElementById("js-utskrift");
elementUt.innerHTML = "<p>Meg: Hva er din alder?</p>";

let input = prompt("Hva er din alder?");
elementUt.innerHTML += `<p> Du: ${input} </p>`;

let årstall = new Date().getFullYear();
elementUt.innerHTML += `<p> Meg: Da er du født i ${Number(årstall) - Number(input)}</p>`;