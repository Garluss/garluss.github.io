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
function generateCells() {
    let cells = [];
    for (let iy = 0; iy < grid.y/2-1; iy++) {
        cells[iy] = [];
        for (let ix = 0; ix < grid.x/2-1; ix++) {
            let cell = {x:ix*2+1,y:iy*2+1,visited:false};
            cells[iy][ix]= cell;
        }
    }
    return cells;
}
function checkAvailability(x,y,pattern) {
    let list = [[y,x+1],[y,x-1],[y+1,x],[y-1,x]];
    let final = [];
    list.forEach(coord => {
        if (pattern[coord[0]][coord[1]].visited == false) {
            final.push(pattern[coord[0]][coord[1]]);
        }
    });
    return final;
}
function generateMaze(start_x,start_y) {
    let current = {x:start_x,y:start_y};
    let pattern = generateCells(); // Husk at x og y-coordinatene er motsatt. pattern[y][x] gir element på (x,y)
    let generating = true;
    while (generating) {
        pattern[current.y][current.x].visited = true; //setter den nåværende som "besøkt"
        available_cells = checkAvailability(current.x,current.y,pattern); // leter etter tilgjengelige plasser, returnerer en liste av objektene som representerer cellene
        if (available_cells != []) {
            let rnd = Math.floor(Math.random()*available_cells.length); //finner tilfeldig fra de ledige
            let x = available_cells[rnd].x;
            let y = available_cells[rnd].y;
            // ny posisjon for den nåværende
            current.x = x; 
            current.y = y;
        } else {
            // skriv inn greier slik at den går tilbake på samme sti
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
        element.style.backgroundColor = "black";
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
        console.log("Session terminated.");
    }
});

let sprites = [];

let player = {x:16,y:10,color:"green"};

const grid = {
    x: 33,
    y: 21,
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
    console.log(generateCells());
    while (playing == true) {
        clean();
        sprites.forEach(sprite => {
            drawSprite(sprite);
        });
        await sleep(1000/FPS);
    }
}

run();