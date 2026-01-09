async function hentData(){
    let response = await fetch("https://api.chucknorris.io/jokes/random");
    let data = await response.json();
    console.log("Alle data:");
    console.log(data);
    console.log("\nBare vitsen:");
    console.log(data.value)
}

hentData();