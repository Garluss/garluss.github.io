let lys = true;
document.getElementById("knapp").addEventListener("click",lysPåAv);
function lysPåAv() {
    if (lys == true) {
        document.getElementById('stylelink').setAttribute('href',"dark.css");
        document.getElementById("knapp").innerText = "Lys på";
        lys = false;
    } 
    else {
        document.getElementById('stylelink').setAttribute('href',"light.css");
        document.getElementById("knapp").innerText = "Lys av";
        lys = true;
    }
}