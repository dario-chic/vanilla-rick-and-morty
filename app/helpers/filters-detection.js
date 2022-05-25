import {extractParameter} from "./extract-parameter.js";
// import pagination from "./pagination.js";

/*Función que ayuda a detectar los filtros que se encuentran en la URL y en base a estos, activa o desactiva las clases de los iconos para los filtros correspondientes*/
export function filtersDetection() {
	const d = document,
		gender = extractParameter(location.hash, "gender") || "",
		status = extractParameter(location.hash, "status") || "";

	if (location.hash.includes("#/characters")) {
		d.querySelectorAll(".filters__gender i").forEach((el) => (gender == el.dataset.gender ? el.classList.add("active") : el.classList.remove("active")));
		d.querySelectorAll(".filters__status i").forEach((el) => (status == el.dataset.status ? el.classList.add("active") : el.classList.remove("active")));
	}
}
