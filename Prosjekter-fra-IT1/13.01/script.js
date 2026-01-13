let ut = document.querySelector("#ut");
let skjema = document.querySelector("#skjema");
skjema.addEventListener("submit",start);

const klikk = new Audio("clipempty_rifle.wav");
const skyt = new Audio("awp_01.wav");

document.querySelector("#ord").addEventListener("input", function(event) {
    const soundClone = klikk.cloneNode(true);
    soundClone.play();
});

function start(event) {
    skyt.play();
    event.preventDefault();
    let inn = document.querySelector("#ord").value;
    hentDef(inn);
}

async function hentDef(ord) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${ord}`);
    if (!res.ok) {
        ut.innerHTML = "";
        return;
    }
    let data = await res.json();
        
    data = data[0]["meanings"];
    let div_sup = document.createElement("div");
    data.forEach(meaning => {
        let div = document.createElement("div");
        div.setAttribute("class","mening");
        let p = document.createElement("h3");
        p.innerText = meaning.partOfSpeech;
        div.appendChild(p);
        meaning.definitions.forEach(def => {
            p = document.createElement("p");
            p.innerText = def.definition;
            div.appendChild(p);
        });
        div_sup.appendChild(div);
    });

    vis(div_sup);
}

function vis(div_s) {
    ut.innerHTML = "";
    ut.appendChild(div_s);
}