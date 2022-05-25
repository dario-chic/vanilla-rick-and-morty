import {extractParameter} from "./extract-parameter.js";
import pagination from "./pagination.js";

/*Función muy útil que sirve para reparar URLs erroneas, esta función detecta cuando hay datos o texto en una URL que no deberian existir 
y los elimina, de esta forma el usuario siempre tendra una URL 100% útil, real y útil, y tambien hace que siempre se vea bien escrita. Por ejemplo:

- La url : https://dario-chic.github.io/rick-and-morty/#/characters/ERROR?page=1/  <-- (En esta función la palabra "ERROR" es un parametro que no debería existir y no cumple ninguna función en la url)

Esta función detecta ese error, lo arregla y devolvería: https://dario-chic.github.io/rick-and-morty/#/characters/?page=1/ */

export function fixUrl() {
	let {hash} = location,
		page = extractParameter(hash, "page") || 1,
		name = extractParameter(hash, "name") || "",
		gender = extractParameter(hash, "gender") || "",
		status = extractParameter(hash, "status") || "",
		ID = extractParameter(hash, "ID");

	if (hash === "#/" || !hash) location.hash = `#/${ID ? `/ID=${ID}/` : ""}`;

	if (hash === "#/characters" || hash.includes(`#/characters`)) location.hash = `#/characters/?page=${page}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}${ID ? `/ID=${ID}/` : ""}`;

	if (hash === "#/episodes" || hash.includes(`#/episodes`)) location.hash = `#/episodes/?page=${page}${name ? `&name=${name}` : ""}${ID ? `/ID=${ID}/` : ""}`;

	hash.includes("#/characters") ? (document.getElementById("search-form").search.value = pagination.NAME) : false;
	hash.includes("#/episodes") ? (document.getElementById("search-episode").search.value = pagination.NAME) : false;
}
