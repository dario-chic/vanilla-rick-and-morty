import pagination from "./pagination.js";

export function filtersDetection() {
	const d = document;
	if (location.hash.includes("#/characters")) {
		d.querySelectorAll(".filters__gender i").forEach((el) => (pagination.character.gender == el.dataset.gender ? el.classList.add("active") : el.classList.remove("active")));
		d.querySelectorAll(".filters__status i").forEach((el) => (pagination.character.status == el.dataset.status ? el.classList.add("active") : el.classList.remove("active")));
	}
}
