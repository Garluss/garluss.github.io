let nisse = {x: 300, y: 200, v_x: 0, v_y: 0, speed: 5, h: 100, w: 100};
let nisse_div = document.getElementById("nisse");

let d = document.getElementById("sprettboks").getBoundingClientRect();
let boks = {t:d.top,b:d.bottom,l:d.left,r:d.right,h:d.height,w:d.width};

const klang = new Audio("bjelleklang.mp3");
klang.loop = true;
klang.playbackRate = 0.5;

const hohoho = new Audio("hohoho.mp3");

function init() {
    nisse_div.style.position = "absolute";
    nisse_div.style.top = `${nisse.y}px`;
    nisse_div.style.left = `${nisse.x}px`;
    nisse_div.setAttribute("height",`${nisse.h}px`);
    nisse_div.setAttribute("width",`${nisse.w}px`);
    let element = document.createElement("img");
    element.setAttribute("src","nisse.png");
    element.setAttribute("height",`${nisse.h}px`);
    element.setAttribute("width",`${nisse.w}px`);
    element.setAttribute("draggable","false");
    nisse_div.appendChild(element);
}

function flytt() {
    if (nisse.x + nisse.w + nisse.v_x * nisse.speed> boks.w || nisse.x + nisse.v_x * nisse.speed< 0) {
        nisse.v_x = -nisse.v_x;
    }
    if (nisse.y + nisse.h + nisse.v_y * nisse.speed > boks.h || nisse.y + nisse.v_y * nisse.speed< 0) {
        nisse.v_y = -nisse.v_y
    }
    nisse.x += nisse.v_x * nisse.speed
    nisse.y += nisse.v_y * nisse.speed
}
function oppdater() {
    nisse_div.style.top = `${nisse.y}px`;
    nisse_div.style.left = `${nisse.x}px`;
}

document.addEventListener("keydown", function(event) {
    if (event.key == "t") {
        fortsett = false;
        console.log("Session terminated.");
    }
});
nisse_div.addEventListener("click", function() {
    klikk += 1;
    document.getElementById("klikk").innerText = `Antall klikk: ${klikk}`
    nisse.speed += 0.5;
    hohoho.play();
    klang.playbackRate += 0.02;
});

const FPS = 30; //Påvirker nissens hastighet
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let telle = 0;
let sekund = 0;
let tid = document.getElementById("tid");
let fortsett = true;
let klikk = 0;
async function start() {
    klang.play()
    init();
    let rad = Math.floor(Math.random()*360) * Math.PI/180;
    nisse.v_x = Math.cos(rad);
    nisse.v_y = Math.sin(rad);
    while (fortsett == true) {
        flytt();
        oppdater();
        if (telle == FPS) {
            sekund += 1;
            telle = 0;
            if (sekund == 80) {
                fortsett = false;
                klang.pause();
                if (klikk >= 50) {
                    document.getElementById("tittel").innerText = "Du kom på snille-listen!";
                } else {
                    document.getElementById("tittel").innerText = "Du kom på slemme-listen.";
                }
            }
        }
        telle += 1;
        tid.innerText = `Tid igjen: ${80-sekund} s`
        await sleep(1000/FPS);
    }
}

start();