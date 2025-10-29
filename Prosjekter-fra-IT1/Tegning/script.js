/*
TO DO
- legg til å endre størrelse på boksene utifra grid størrelse
width og height kan være (800/n)px

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
    });
}
function attemptMove(sprite,dx,dy) {
    if (sprite.x + dx < grid.x && sprite.x + dx > -1) {
        sprite.x += dx;
    }
    if (sprite.y + dy < grid.y && sprite.y + dy > -1) {
        sprite.y += dy;
    }
}

function getSpriteByPos(x,y) {
    for (const object of sprites) {
        if (object.x == x && object.y == y) {
            console.log(object);
            return object;
        }
    }
    return null;
}
function createBlot(color,x,y) {
    let object = getSpriteByPos(x,y);
    if (object != null) {
        removeBlot(x,y);
    }
    let blot = {"color":color,"x":x,"y":y};
    sprites.unshift(blot);
}
function removeBlot(x,y) {
    let object = getSpriteByPos(x,y);
    if (object != player && object != null) {
        sprites.splice(sprites.indexOf(object),1);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight") {
        attemptMove(player,1,0);
    } else if (event.key == "ArrowLeft") {
        attemptMove(player,-1,0);
    } else if (event.key == "ArrowUp") {
        attemptMove(player,0,-1);
    } else if (event.key == "ArrowDown") {
        attemptMove(player,0,1);
    } else if (event.key == " ") {
        createBlot(player.color,player.x,player.y);
    } else if (event.key == "b") {
        player.color = "black";
    } else if (event.key == "w") {
        player.color = "white";
    } else if (event.key == "g") {
        player.color = "green";
    } else if (event.key == "e") {
        removeBlot(player.x,player.y);
        console.log(sprites);
    }
});

let sprites = [];

let player = {"color":"black","x":0,"y":0};
sprites.push(player);

const grid = {
    x: 9, 
    y: 9,
    generate: function() {generateDivs(this.x,this.y);}
};

const FPS = 30

async function run() {
    grid.generate()

    while (true) {
        clean();
        sprites.forEach(sprite => {
            drawSprite(sprite);
        });
        await sleep(1000/FPS);
    }
}

run();