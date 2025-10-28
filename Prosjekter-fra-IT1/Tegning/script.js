/*
TO DO
- lag erase knapp
- legg til å endre row og columns for grid
slik at man kan lage andre størrelse ok ikke kun 8-8

*/

function generateDivs(x,y) {
    for (let iy = 0; iy < y; iy++) {
        for (let ix = 0; ix < x; ix++) {
            let block = document.createElement("div");
            block.setAttribute("class","block");
            block.setAttribute("id",`x${ix} y${iy}`);
            document.querySelector("#grid").appendChild(block);
        }
    }
}

function drawSprite(sprite) {
    pos = document.getElementById(`x${sprite.x} y${sprite.y}`);
    pos.setAttribute("occupied",sprite);
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
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createBlot(color,x,y) {
    let blot = {"color":color,"x":x,"y":y};
    sprites.unshift(blot);
}

let sprites = [];

let player = {"color":"black","x":0,"y":0};
sprites.push(player);

const grid = {
    x: 8, 
    y: 8,
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