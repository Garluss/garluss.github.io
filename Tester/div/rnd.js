function rand(max) {
    return Math.floor(Math.random()*max);
}

function pull_random(list,amount) {
    let ny = [];
    let n;
    for (let i = 0; i < amount; i++) {
        n = list.splice(rand(list.length),1);
        ny.push(n);
    }
    return ny;
}

let liste = [
    "Tone",
    "Per",
    "Lars",
    "Mons",
    "Sverre",
    "Laura",
    "Jan",
    "Josefine",
    "Mons L.",
    "Ane"
];

console.log(liste);
let ut = pull_random(liste,2);
console.log(ut[0],ut[1]);