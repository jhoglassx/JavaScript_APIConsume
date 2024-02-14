import { publicKey, privateKey } from '../data/keysApi.js';
const ts = Math.floor(Date.now()/1000);
const hash = CryptoJS.MD5(ts+privateKey+publicKey);
const queryString = `&ts=${ ts }&apikey=${ publicKey }&hash=${ hash }`
console.log(queryString);

const baseUrl = "https://gateway.marvel.com/v1/public/"

export async function fetchJSON(url,method, currentPage) {
    const offset = currentPage*20
    const request = new Request(baseUrl+url+"?offset="+offset+queryString, {
        headers: {

        },
        method:method
    });

    const response = await fetch(request)
        .then(response => response.json());
    console.log("fetchJSON", response);
    return response.data;
}