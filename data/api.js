import {fetchJSON} from '../data/fetchJSON.js';
export async function getCharacters(currentPage) {
    const url = "characters";

    const result = await fetchJSON(url, "GET", currentPage);
    console.log("Api getCharacters", result);
    return result;
}

export async function getComicsByCharactersId(characterId,currentPage) {

    const url = "characters/"+characterId+"/comics";

    const result = await fetchJSON(url, "GET", currentPage);
    console.log("Api getComicsByCharactersId", result);
    return result;
}

export async function getEventsByCharactersId(characterId, currentPage) {
    const url = "characters/"+characterId+"/events";

    const result = await fetchJSON(url, "GET" ,currentPage);
    console.log("Api getEventsByCharactersId", result);
    return result;
}

export async function getComics() {
    const url = "comics";

    const result = await fetchJSON(url, "GET", currentPage);
    console.log("Api getComics", result, currentPage);
    return result;
}