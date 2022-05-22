import pagination from "./pagination.js";

export function filtersDetection() {
	const d = document;

	if (pagination.character.gender) {
		console.log(pagination.character.gender);
		d.querySelectorAll(".filters__gender i").forEach((el) => (pagination.character.gender == el.dataset.gender ? el.classList.add("active") : el.classList.remove("active")));
	}

	if (pagination.character.status) {
		d.querySelectorAll(".filters__status i").forEach((el) => (pagination.character.status == el.dataset.status ? el.classList.add("active") : el.classList.remove("active")));
	}
}
