import {fetchJSON} from '../data/fetchJSON.js';
export async function getCharacters() {
    const url = "characters"

    const result = await fetchJSON(url, "GET")
    console.log(result);
    return result
}

export async function getComicsByCharactersId(characterId) {
    const url = "characters/"+characterId+"/comics"

    const result = await fetchJSON(url, "GET")
    console.log(result);
    return result
}

export async function getEventsByCharactersId(characterId) {
    const url = "characters/"+characterId+"/events"

    const result = await fetchJSON(url, "GET")
    console.log(result);
    return result
}

export async function getComics() {
    const url = "comics"

    const result = await fetchJSON(url, "GET")
    console.log(result);
    return result
}