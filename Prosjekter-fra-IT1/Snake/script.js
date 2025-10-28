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
}
function clean() {
    let allDivs = document.querySelectorAll(".block");
    allDivs.forEach(function(element) {
        element.style.backgroundColor = "white";
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
        createBlot("black",player.x,player.y);
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createBlot(color,x,y) {
    let blot = {"color":color,"x":x,"y":y};
    sprites.push(blot);
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