//To Do:
//  Legg til slik at look() renderer sprites (kanskje en anne metode enn forEach, kanskje .some?)
//  Legg til fiende
//  Du vinner om du går gjennom hele labyrinten
//  Legg til kort/abilities
//  Legg til progressbar

function rand(max) {
    // returnerer tilfeldig fra og med 0 til max
    return Math.floor(Math.random()*max);
}

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
            let cell = [ix*2+1,iy*2+1];
            cells[iy][ix]= cell;
        }
    }
    return cells;
}
function checkAvailability(x,y,pattern,visit_list) {
    let list = [[y,x+1],[y,x-1],[y+1,x],[y-1,x]];
    let final = [];
    list.forEach(coord => {
        if (pattern.hasOwnProperty(coord[0])) { // Denne er egentlig brukt for objekter, sjekk om noe alternativt går
            if (pattern[coord[0]].hasOwnProperty(coord[1])) {
                if (visit_list.includes(pattern[coord[0]][coord[1]]) == false) {
                    final.push(pattern[coord[0]][coord[1]]);
                }
            }
        }
    });
    return final;
}
function generateMaze(start_x,start_y) {
    let current = {x:start_x,y:start_y};
    let pattern = generateCells(); // Husk at x og y-coordinatene er motsatt. pattern[y][x] gir element på (x,y)
    console.log(pattern);
    let generating = true;
    let path = [];
    let open_positions = [];
    let visit_list = [];
    while (generating) {
        // konverterer x og y slik at de passer med pattern
        let fit_x = (current.x-1)/2;
        let fit_y = (current.y-1)/2;
        open_positions.push([current.x,current.y]);
        visit_list.push(pattern[fit_y][fit_x]); //setter den nåværende som "besøkt"
        available_cells = checkAvailability(fit_x,fit_y,pattern,visit_list); // leter etter tilgjengelige plasser, returnerer en liste av objektene som representerer cellene
        if (available_cells.length != 0) {
            //console.log(available_cells, current.x, current.y);
            let rnd = rand(available_cells.length); //finner tilfeldig fra de ledige
            let x = available_cells[rnd][0];
            let y = available_cells[rnd][1];
            path.push([current.x,current.y]);
            open_positions.push([(current.x+x)/2,(current.y+y)/2]);
            // ny posisjon for den nåværende
            current.x = x; 
            current.y = y;
        } else {
            if (current.x == start_x && current.y == start_y) {
                console.log("Generating done.");
                return open_positions;
            }
            const to = path.pop();
            //console.log(`Backtrack to: ${to}`);
            current.x = to[0];
            current.y = to[1];
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

// Lager kopier og plasserer dem tilfeldig rundt, mengde og minimum distanse til spiller er også med
function spawnSpritesOfType(sprite_type,amount,min_dist) {
    for (let i = 0; i < amount; i++) {
        let copy = sprite_type;
        // finner mulige posisjoner, prøver kun 400 ganger
        for (let i = 0; i < 400; i++) {
            let rand_coords = open_positions[rand(open_positions.length)];
            let x = rand_coords[0];
            let y = rand_coords[1];
            let dist = Math.sqrt((player.x-x)**2+(player.y-y)**2);
            if (dist > min_dist) {
                copy.x = x;
                copy.y = y;
                sprites.unshift(copy);
                break;
            }
        }
    }
}




function look(from_x,from_y) {
    let raycasts = [];
    for (let i = 0; i < 4; i++) {
        let directions = [[1,0],[-1,0],[0,1],[0,-1]];
        let raycast = {x:from_x,y:from_y,vx:directions[i][0],vy:directions[i][1]};
        raycasts.push(raycast);
    }
    let visible_positions = [];
    while (raycasts.length > 0) {
        raycasts.forEach(raycast => {
            if (open_positions.some(innerArr => innerArr[0] === raycast.x+raycast.vx && innerArr[1] === raycast.y+raycast.vy) == true) {
                raycast.x += raycast.vx;
                raycast.y += raycast.vy;
                visible_positions.push([raycast.x,raycast.y]);
            } else {
                raycasts.splice(raycasts.indexOf(raycast),1);
            }
        });
    }
    return visible_positions;
}

function attemptMove(sprite,dx,dy) {
    if (sprite.x + dx < grid.x && sprite.x + dx > -1 && open_positions.some(innerArr => innerArr[0] === sprite.x+dx && innerArr[1] === sprite.y) == true) {
        sprite.x += dx;
    }
    if (sprite.y + dy < grid.y && sprite.y + dy > -1 && open_positions.some(innerArr => innerArr[0] === sprite.x && innerArr[1] === sprite.y+dy) == true) {
        sprite.y += dy;
    }
}
let isActionActive = false;
document.addEventListener("keydown", function(event) {
    if (!isActionActive) {
        if (event.key == "ArrowRight" || event.key == "d") {
            attemptMove(player,1,0);
        } else if (event.key == "ArrowLeft" || event.key == "a") {
            attemptMove(player,-1,0);
        } else if (event.key == "ArrowUp" || event.key == "w") {
            attemptMove(player,0,-1);
        } else if (event.key == "ArrowDown" || event.key == "s") {
            attemptMove(player,0,1);
        } else if (event.key == "t") {
            playing = false;
            console.log("Session terminated.");
        }
        isActionActive = true;
    }
});
document.addEventListener('keyup', function(event) {
    isActionActive = false;
});

let sprites = [];

let player = {x:15,y:11,color:"green"}; //spiller MÅ starte på en celle definert av generateCells()
let coin = {x:0,y:0,color:"yellow"};

const grid = {
    x: 33,
    y: 21,
    generate: function() {generateDivs(this.x,this.y);}
};

sprites.push(player);


let playing = true;
const FPS = 10;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let open_positions = generateMaze(player.x,player.y);
let previously_seen = [];

// spawning av ting her
spawnSpritesOfType(coin,1,5);
console.log(sprites);

async function run() {
    grid.generate();
    //console.log(open_positions);
    while (playing == true) {
        // mulig å effektivisere slik at kun bevegende ting blir renset opp i, mye færre operasjoner da
        clean();
        // Denne delen må effektiviseres en god del.
        // Kan kombienre ting inn i look-funksjonen. Slik at det hindrer så mye forEach.
        previously_seen.forEach(pos => {
            pos = document.getElementById(`x${pos[0]} y${pos[1]}`);
            pos.style.backgroundColor = "gray";
        })
        look(player.x,player.y).forEach(pos => {
            if (previously_seen.includes(pos) == false) { previously_seen.push(pos); }
            pos = document.getElementById(`x${pos[0]} y${pos[1]}`);
            pos.style.backgroundColor = "white";
        });
        drawSprite(player);
        await sleep(1000/FPS);
    }
}

run();