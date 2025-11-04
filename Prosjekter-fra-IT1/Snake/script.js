/*
TO DO
- finn en lurer måte å gi blokkene riktig størrelse enn i clean() funksjonen

*/

function generateDivs(x,y) {
    const doc_grid = document.querySelector("#grid");
    doc_grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    doc_grid.style.gridTemplateRows = `repeat(${y}, 1fr)`;
    for (let iy = 0; iy < y; iy++) {
        for (let ix = 0; ix < x; ix++) {
            let block = document.createElement("div");
            block.setAttribute("class","block");
            block.setAttribute("id",`x${ix} y${iy}`);
            doc_grid.appendChild(block);
        }
    }
}

function drawSprite(sprite) {
    pos = document.getElementById(`x${sprite.x} y${sprite.y}`);
    pos.style.backgroundColor = sprite.color;
    pos.style.borderColor = sprite.color;
}
function clean() {
    let allDivs = document.querySelectorAll(".block");
    allDivs.forEach(function(element) {
        element.style.backgroundColor = "white";
        element.style.borderColor = "black";
        element.style.height = `${800/grid.y}px`;
        element.style.width = `${800/grid.x}px`;
    });
}
function attemptMove(sprite,dx,dy) {
    if (sprite.x + dx < grid.x && sprite.x + dx > -1 && joints.includes(getSpriteByPos(sprite.x + dx, sprite.y)) == false){
        sprite.prevx = sprite.x;
        sprite.x += dx;
    } else { triggerEnd(); }
    if (sprite.y + dy < grid.y && sprite.y + dy > -1 && joints.includes(getSpriteByPos(sprite.x, sprite.y + dy)) == false) {
        sprite.prevy = sprite.y;
        sprite.y += dy;
    } else { triggerEnd(); }
}

function getSpriteByPos(x,y) {
    for (const object of sprites) {
        if (object.x == x && object.y == y) {
            return object;
        }
    }
    return null;
}
function generateBlot() {
    for (sprite of sprites) {
        if (sprite["type"] == "apple") {
            return;
        }
    }
    while (victory != true || playing == true) {
        x = Math.floor(Math.random()*grid.x);
        y = Math.floor(Math.random()*grid.y);
        if (getSpriteByPos(x,y) == null) {
            break;
        }
    }
    createBlot("apple","green",x,y);
}
function createBlot(type,color,x,y) {
    let object = getSpriteByPos(x,y);
    if (object != null) {
        removeBlot(x,y);
    }
    let blot = {"type":type,"color":color,"x":x,"y":y};
    sprites.unshift(blot);
}
function removeBlot(x,y) {
    let object = getSpriteByPos(x,y);
    if (object != player && object != null) {
        sprites.splice(sprites.indexOf(object),1);
    }
}
function checkPointed(sprite) {
    if (sprite != player) {
        if (sprite.x == player.x && sprite.y == player.y) {
            removeBlot(sprite.x,sprite.y);
            points += 1;
            generatePart();
        }
    }
}
function generatePart() {
    let part = {"type":"part","color":player.color,"x":player.x-player.vx,"y":player.y-player.vy,"prevx":0,"prevy":0};
    sprites.unshift(part);
    joints.push(part);
}
function trailParts() {
    for (part of joints) {
        if (joints.indexOf(part) == 0) {
            part.prevx = part.x;
            part.prevy = part.y;
            part.x = player.prevx;
            part.y = player.prevy;
        } else {
            part.prevx = part.x;
            part.prevy = part.y;
            part.x = joints[joints.indexOf(part)-1].prevx;
            part.y = joints[joints.indexOf(part)-1].prevy;
        }
    }
}

function triggerEnd() {
    console.log("Game end");
    playing = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight") {
        if (points != 0 && player.prevx-player.x > 0) {
            return
        }
        player.vx = 1;
        player.vy = 0;
    } else if (event.key == "ArrowLeft") {
        if (points != 0 && player.prevx-player.x < 0) {
            return
        }
        player.vx = -1;
        player.vy = 0;
    } else if (event.key == "ArrowUp") {
        if (points != 0 && player.prevy-player.y < 0) {
            return
        }
        player.vx = 0;
        player.vy = -1;
    } else if (event.key == "ArrowDown") {
        if (points != 0 && player.prevy-player.y > 0) {
            return
        }
        player.vx = 0;
        player.vy = 1;
    }
});

let sprites = [];
let joints = [];

let player = {"type":"player","color":"black","x":0,"y":0,"vx":1,"vy":0,"prevx":0,"prevy":0};
sprites.push(player);

let points = 0;
let victory = false;

const grid = {
    x: 13, 
    y: 13,
    generate: function() {generateDivs(this.x,this.y);}
};

let playing = true;
const FPS = 6;

async function run() {
    grid.generate()

    while (playing == true) {
        clean();
        attemptMove(player,player.vx,player.vy);
        trailParts();
        generateBlot();
        sprites.forEach(sprite => {
            drawSprite(sprite);
            checkPointed(sprite);
        });
        await sleep(1000/FPS);
    }
}

run();