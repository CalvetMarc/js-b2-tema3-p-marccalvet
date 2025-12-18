// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

function getItems(){
    return items = [...document.querySelectorAll(".js-item")].map(item => ({ id: item.dataset.id,  es: item.dataset.es, en: item.dataset.en}));
}

function emptyList(){
    const list = document.querySelector(".js-list");
    [...list.children].forEach((child) => list.removeChild(child));
}

function renderList(itemList, lang){
    emptyList();

    const list = document.querySelector(".js-list");
    itemList.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("js-item");
        li.dataset.id = item.id;
        li.dataset.es = item.es;
        li.dataset.en = item.en;
        li.textContent = item[lang];

        list.appendChild(li);
    })
}

function updateItemStyle(idItem){
    const li = document.querySelector(`.js-item[data-id="${idItem}"]`);
    li.classList.add("highlight");
}

const words = getItems();
renderList(words, "en");
updateItemStyle(2);
updateItemStyle(4);