function skap(event) {
    const formData = new FormData(form);
    const greie1 = document.createElement("div");
    greie1.innerText = formData.get("i1");
    document.body.appendChild(greie1);
    form.reset();
    event.preventDefault();
}

const form = document.querySelector("#form");
form.addEventListener("submit",skap);