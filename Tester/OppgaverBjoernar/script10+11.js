let spoers = [["Hvilken frukt liker du?","vannmelon","Jeg og!"],["Hvor kommer du fra?","somalia","Det er morsomt, jeg og."]];
let rnd = Math.floor(Math.random()*2);
let utskrift = document.querySelector("#btw");

let svar = prompt(spoers[rnd][0]);
if (spoers[rnd][1].includes(svar.toLowerCase()) != false) {
    alert(spoers[rnd][2]);
}
else {
    alert("Wow.");
}

utskrift.innerText = `Bredde: ${window.screen.width}, Høyde: ${window.screen.height}, userAgent: ${window.navigator.userAgent}, Lokasjon: ${window.location.href}`;
