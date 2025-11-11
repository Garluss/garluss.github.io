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
}

function clean() {
    let allDivs = document.querySelectorAll(".block");
    allDivs.forEach(function(element) {
        element.style.backgroundColor = "white";
        element.style.borderColor = "black";
        element.style.height = `${600/grid.y}px`;
        element.style.width = `${900/grid.x}px`;
    });
}
function getSpriteByPos(x,y) {
    for (const object of sprites) {
        if (object.x == x && object.y == y) {
            return object;
        }
    }
    return null;
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
    } else if (event.key == "t") {
        playing = false;
    }
});

let sprites = [];

let player = {x:15,y:10,color:"green"};

const grid = {
    x: 30, 
    y: 20,
    generate: function() {generateDivs(this.x,this.y);}
};

sprites.push(player);


let playing = true;
const FPS = 30;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    grid.generate();

    while (playing == true) {
        clean();
        sprites.forEach(sprite => {
            drawSprite(sprite);
        });
        await sleep(1000/FPS);
    }
}

run();