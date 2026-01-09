async function hent() {
    let res = await fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json");
    let data = await res.json();

    console.log(data["insult"]);
}

hent();