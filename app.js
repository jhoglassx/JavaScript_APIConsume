import { getCharacters, getComicsByCharactersId } from '../data/api.js';

let currentPage = 0;
const limit = 20;

async function load(characterId = "", page = 0) { 
    console.log("page",page);
    const div_characters = document.getElementById("characters");
    div_characters.innerHTML = ""
    const items = characterId != "" ? await getComicsByCharactersId(characterId, currentPage) : await getCharacters(currentPage);
    console.log("items",items.results);
    const isCharacterList = !characterId;
    createList(items, div_characters, isCharacterList, load);
    createPagination(div_characters, items.total, load, characterId);
}

function createList(items, container, isCharacterList, clickCallback) {
    const ul = document.createElement("ul");

    items.results.forEach((item, i) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = item.thumbnail.path + "." + item.thumbnail.extension;
        const textNode = document.createTextNode(isCharacterList ? item.name : item.title);
        const span = document.createElement("span");
        span.appendChild(textNode);
        li.appendChild(span);
        li.appendChild(img);
        ul.appendChild(li);

        li.addEventListener('click', function() {
            console.log('Você clicou no item', isCharacterList ? item.name : item.title);
            history.pushState(null, null, (isCharacterList ? '?'+item.name : "index.html"));
            clickCallback(isCharacterList ? item.id : "");
        });
    });

    container.appendChild(ul);
}

function createPagination(container, totalItems, callback, characterId) {
    const pages = Math.ceil(totalItems / limit);
    const pagination = document.createElement("div");

    if (currentPage > 0) {
        const prevLink = document.createElement("a");
        prevLink.href = "#";
        prevLink.innerText = "Anterior";
        prevLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage--;
            callback(characterId, currentPage);
        });
        pagination.appendChild(prevLink);
    }

    for(let i = Math.max(0, currentPage - 1); i < Math.min(pages, currentPage + 2); i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.innerText = i + 1;
        pageLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage = i;
            callback(characterId, i);
        });
        
        if(i === currentPage) {
            pageLink.style.fontWeight = 'bold';
        }
        
            pagination.appendChild(pageLink);
    }

    if (currentPage < pages - 1) {
        const nextLink = document.createElement("a");
        nextLink.href = "#";
        nextLink.innerText = "Próximo";
        nextLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage++;
            callback(characterId, currentPage);
        });
        pagination.appendChild(nextLink);
    }

    container.appendChild(pagination);
}

load().catch(error => console.error(error));