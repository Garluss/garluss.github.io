//To Do:
// Ordne fiende oppførsel
// Vis kostnad på upgrade
// Fullfør victory-condition på exitMaze()
//  Legg til kort/abilities



function rand(max) {
    // returnerer tilfeldig fra og med 0 til max
    return Math.floor(Math.random()*max);
}
function normalize(int) {
    if (int != 0) {
        return int/Math.abs(int);
    }
    return 0;
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
        let copy = Object.assign({},sprite_type);;
        console.log(copy, sprite_type);
        // finner mulige posisjoner, prøver kun 400 ganger
        for (let i = 0; i < 400; i++) {
            let rand_coords = open_positions[rand(open_positions.length)];
            let r_x = rand_coords[0];
            let r_y = rand_coords[1];
            let dist = Math.sqrt((player.x-r_x)**2+(player.y-r_y)**2);
            if (sprites.find(sprite => sprite.x == r_x && sprite.y == r_y) != undefined) { continue; } // Sjekker om en annen sprite er på posisjonen
            if (dist > min_dist) {
                copy.x = r_x;
                copy.y = r_y;
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
    while (raycasts.length > 0) {
        raycasts.forEach(raycast => {
            if (open_positions.some(innerArr => innerArr[0] === raycast.x+raycast.vx && innerArr[1] === raycast.y+raycast.vy) == true) {
                raycast.x += raycast.vx;
                raycast.y += raycast.vy;
                let position = [raycast.x,raycast.y];
                if (previously_seen.some(innerArr => innerArr[0] === raycast.x && innerArr[1] === raycast.y) == false) { previously_seen.push(position); }
                let pos = document.getElementById(`x${position[0]} y${position[1]}`);
                pos.style.backgroundColor = "white";
                sprites.forEach(sprite => {
                    if (sprite.x == raycast.x && sprite.y == raycast.y) {
                        drawSprite(sprite);
                        if (sprite.hasOwnProperty("objective")) {
                            sprite.objective = [player.x,player.y];
                        }
                    }
                });
            } else {
                raycasts.splice(raycasts.indexOf(raycast),1);
            }
        }); 
    }
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
        } else if (event.key == "e") {
            exitMaze();
        } else if (event.key == "c") {
            getCard("health");
        } else if (event.key == "m") {
            coins += 1;
        } 
        isActionActive = true;
    }
});
document.addEventListener('keyup', function(event) {
    isActionActive = false;
});


function initBars () {
    let bar = document.querySelector("#progress");
    bar.innerHTML = "";
    bar.style.gridTemplateColumns = `repeat(${20}, 1fr)`;
    for (let i = 0; i < 20; i++) {
        let part = document.createElement("div");
        part.setAttribute("id",`p${i}`);
        bar.appendChild(part);
    }
    bar = document.querySelector("#health");
    bar.innerHTML = "";
    bar.style.gridTemplateColumns = `repeat(${player.max_health}, 1fr)`;
    for (let i = 0; i < player.max_health; i++) {
        let part = document.createElement("div");
        part.setAttribute("id",`h${i}`);
        part.style.backgroundColor = "green";
        bar.appendChild(part);
    }
}
function updateBars() {
    let percent = previously_seen.length/open_positions.length;
    let amount = Math.floor(percent*30); //Enkel ordning, ikke optimalt
    for (let i = 0; i < amount; i++) {
        let part = document.querySelector(`#p${i}`);
        part.style.backgroundColor = "darkslategrey";
    }
    let previous_health = player.max_health;
    let health = player.health;
    if (health < previous_health) {
        for (let i = 0; i < player.max_health; i++) {
            let part = document.querySelector(`#h${i}`);
            part.style.backgroundColor = "white";
        }
        for (let i = 0; i < player.health; i++) {
            let part = document.querySelector(`#h${i}`);
            part.style.backgroundColor = "green";
        }
        if (health == 0) {
            death();
        }
    }
    document.querySelector("#coins").innerText = `Coins ${coins}`;
    previous_health = health
}
function activateCards() {
    reset = {color:"green",max_health:2};
    Object.assign(player, reset);
    cards.forEach(card => {
        card.ability();
    });
    console.log(player.max_health);
}
function updateCards() {
    const parent = document.querySelector("#cards");
    parent.innerHTML = "";
    cards.forEach(card => {
        let card_div = document.createElement("div");
        card_div.setAttribute("class","card");
        card_div.innerHTML = "";
        card_div.style.position = "relative";
        let element = document.createElement("img");
        element.setAttribute("src",card.img);
        element.setAttribute("height","220px");
        element.setAttribute("width","130px");
        element.style.imageRendering = "pixelated";
        element.style.position = "absolute";
        element.style.top = "20px";
        card_div.appendChild(element);
        element = document.createElement("img");
        element.setAttribute("src",`bilder/number_${card.level}.png`);
        element.setAttribute("height","220px");
        element.setAttribute("width","130px");
        element.style.imageRendering = "pixelated";
        element.style.position = "absolute";
        element.style.top = "20px";
        card_div.appendChild(element);
        element = document.createElement("p");
        element.innerText = card.description;
        element.style.position = "absolute";
        element.style.bottom = "15px";
        card_div.appendChild(element);
        let button = document.createElement("button");
        button.setAttribute("id",`button-card${cards.indexOf(card)}`);
        button.style.position = "absolute";
        button.style.bottom = "10px";
        button.innerText = "Upgrade";
        button.addEventListener("click", function(event) {
            const id = event.target.id;
            upgradeCard(id[id.length-1]);
        });
        card_div.appendChild(button);
        parent.appendChild(card_div);
    });
    activateCards();
}

function upgradeCard(card_id) {
    let cost = Math.ceil(1/2*cards[card_id].level**2+1);
    if (coins >= cost && cards[card_id].level < 9) {
        coins = coins - cost
        cards[card_id].level += 1;
        updateCards();
    }
}

function getCard(type) {
    let card = {"type":type,level:1};
    switch (card["type"]) { // gir kortet en funksjon basert på type
        case "health":
            card["description"] = "Increases the player's health.";
            card["img"] = "bilder/health_card.png";
            card.ability = function() {
                player.max_health = player.max_health + card.level;
                initBars();
            }
            break;
        default:
            return null;
    }
    cards.push(card);
    console.log(cards);
    updateCards();
}

function enemyMove(sprite) {
    if (sprite.objective.length == 0 || sprite.x == sprite.objective[0] && sprite.y == sprite.objective[1]) {
        let directions = [[1,0],[-1,0],[0,1],[0,-1]];
        for(let i = 0; i < 20; i++) {
            let check = directions[rand(4)];
            if (sprite.x+check[0] == sprite.prev_x && sprite.y+check[1] == sprite.prev_y && i > 10) {
                continue
            }
            if (open_positions.some(innerArr => innerArr[0] === sprite.x+check[0] && innerArr[1] === sprite.y+check[1]) == true) {
                sprite.objective[0] = sprite.x+check[0];
                sprite.objective[1] = sprite.y+check[1];
                break;
            }
        }
    }
    sprite.x += normalize(sprite.objective[0]-sprite.x);
    sprite.y += normalize(sprite.objective[1]-sprite.y);
}




function exitMaze() {
    sprites = [];
    playing = false;
    const doc_grid = document.querySelector("#grid");
    doc_grid.innerHTML = "";
    // Fullfør her
    playing = true;
    run();
}
function death() {
    sprites = [];
    playing = false
    const doc_grid = document.querySelector("#grid");
    doc_grid.innerHTML = "<p>Game Over<p>";
}



let sprites = [];

let coins = 0;
let cards = [];

let player = {x:15,y:11,color:"green",max_health: 2, health:2}; //spiller MÅ starte på en celle definert av generateCells()

const coin = {
    x: 0,
    y: 0,
    color:"yellow",
    onCollision: function() {
        sprites.splice(sprites.indexOf(this),1);
        coins += 1;
    }
};
const trap = {
    x: 0,
    y: 0,
    color:"darkred",
    onCollision: function() {
        sprites.splice(sprites.indexOf(this),1);
        if (rand(3) != 2) {
            player.health += -2;
        }
    }
};
const exit = {
    x: 0,
    y: 0,
    color:"blue",
    onCollision: function() {
        exitMaze();
    }
}
const enemy = {
    x:0,
    y:0,
    prev_x:0,
    prev_y:0,
    color: "red",
    onCollision: function() {
        sprites.splice(sprites.indexOf(this),1);
        player.health += -1;
    },
    update: function() {
        if (this.frames_since_move > 5) {
            this.frames_since_move = 0;
            enemyMove(this);
        }
        this.frames_since_move += 1;
    },
    frames_since_move: 0,
    objective: []
};

const grid = {
    x: 33,
    y: 21,
    generate: function() {generateDivs(this.x,this.y);}
};

let playing = true;
const FPS = 10;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let open_positions = [];
let previously_seen = [];

// spawning av ting her
console.log(sprites);

async function run() {
    open_positions = generateMaze(player.x,player.y);
    previously_seen = [];
    spawnSpritesOfType(coin,10,5);
    spawnSpritesOfType(trap,2,10);
    spawnSpritesOfType(exit,1,8);
    spawnSpritesOfType(enemy,1,5);
    grid.generate();
    initBars();
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
        look(player.x,player.y);
        sprites.forEach(sprite => {
            if (sprite.x == player.x && sprite.y == player.y) { // Kollisjon med spilleren av sprite
                sprite.onCollision();
            }
            if ('update' in sprite) {
                sprite.update();
                drawSprite(sprite);
            }
        })
        drawSprite(player);
        updateBars();
        await sleep(1000/FPS);
    }
}

run();