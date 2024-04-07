import { ACCESS_TOKEN } from "./token.js"

// guardo en una variable el trozo de url que se comparte con todos los endpoints
const API = "https://api.themoviedb.org/3/"

const language = "?language=es-ES"

// funcion que llama a la API
// recibe como parametro path > la parte de la url que falta para crear el endpoint
export const get = (path) => {
    // fetch pide informacion a la api.
    // recibe dos parametros: url de la api y credenciales (Token de acceso de lectura a la API)
    return fetch(API+path + language, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json;charset=utf-8"
        }
    // guardo lo que me devuelve la api en la variable results y lo convierto a json
    }).then((results)=>results.json())
}

