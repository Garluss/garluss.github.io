const ID = window.location.pathname.split("/")[2];

async function hentData() {
    const res = await fetch("/api/arrangement/" + ID);
    const data = await res.json();
    console.log(data);
    return data;
}

async function kjør() {
    const data = await hentData();
}

kjør();