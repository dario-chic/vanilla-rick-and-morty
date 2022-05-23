// import {filtersDetection} from "./filters-detection.js";
import pagination from "./pagination.js";

export function changeHash() {
	if (location.hash.includes("#/characters")) {
		pagination.character.filters = `?page=${pagination.character.page}${pagination.character.name ? `&name=${pagination.character.name}` : ""}${pagination.character.gender ? `&gender=${pagination.character.gender}` : ""}${pagination.character.status ? `&status=${pagination.character.status}` : ""}`;

		location.hash = `#/characters/${pagination.character.filters}/`;
		// document.querySelector(".nav__links-characters").href = `#/characters/${pagination.character.filters}`;
	}

	if (location.hash.includes("#/episodes")) {
		// localStorage.setItem("lastHash", JSON.stringify(location.hash));

		pagination.episodes.filters = `?page=${pagination.episodes.page}${pagination.episodes.name ? `&name=${pagination.episodes.name}` : ""}`;

		location.hash = `#/episodes/${pagination.episodes.filters}/`;
	}

	// filtersDetection();
	// console.log(pagination.character);
}
