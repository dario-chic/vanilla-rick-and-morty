import {changeHash} from "./change-hash.js";
import pagination from "./pagination.js";

export function changePage() {
	document.addEventListener("click", (e) => {
		if (e.target.matches(".next-and-prev-buttons .next i")) {
			location.hash.includes("#/characters") ? pagination.character.page++ : location.hash.includes("#/episodes") ? pagination.episodes.page++ : false;
			changeHash();
		}

		if (e.target.matches(".next-and-prev-buttons .prev i")) {
			location.hash.includes("#/characters") ? pagination.character.page-- : location.hash.includes("#/episodes") ? pagination.episodes.page-- : false;
			changeHash();
		}
	});
}
