import pagination from "./pagination.js";

/*Funcion de ayuda para modificación de HASH,
al ser una SPA que funciona pintando la información en base a los cambios de HASH,
cuando es llamada esta función ayuda a cambiar el Hash en  base a los datos de paginación otorgados*/
export function changeHash() {
	if (location.hash.includes("#/characters"))
		location.hash = `#/characters/?page=${pagination.PAGE}${pagination.NAME ? `&name=${pagination.NAME}` : ""}${pagination.character.gender ? `&gender=${pagination.character.gender}` : ""}${pagination.character.status ? `&status=${pagination.character.status}` : ""}${
			pagination.ID ? `/ID=${pagination.ID}` : ""
		}`;

	if (location.hash.includes("#/episodes")) location.hash = `#/episodes/?page=${pagination.PAGE}${pagination.NAME ? `&name=${pagination.NAME}` : ""}${pagination.ID ? `/ID=${pagination.ID}` : ""}`;
}
