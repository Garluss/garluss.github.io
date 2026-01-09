function rand(max) {
    return Math.floor(Math.random()*max);
}

async function vers() {
    let kapittel_nr = rand(114)+1;
    let respons = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem/${kapittel_nr}.json`);
    let data = await respons.json();
    let vers = await data["chapter"][rand(data["chapter"].length)];
    console.log(`Leser av sure ${vers["chapter"]} vers ${vers["verse"]} (engelsk):`);
    console.log(vers["text"]);
}

vers();