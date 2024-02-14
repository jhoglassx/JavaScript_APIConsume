import {publicKey, privateKey } from '../data/keysApi.js';
const ts = Math.floor(Date.now()/1000);
const hash = CryptoJS.MD5(ts+privateKey+publicKey);
const queryString = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`
console.log(hash);

const baseUrl = "https://gateway.marvel.com/v1/public/"

export async function fetchJSON(url,method) {

    const request = new Request(baseUrl+url+queryString, {
        headers:{

        },
        method:method
    })

    const response = await fetch(request);
    const result = await response.json();
    return result.data.results;
}