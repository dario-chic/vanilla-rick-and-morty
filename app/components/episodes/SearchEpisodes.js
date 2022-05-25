import {changeHash} from "../../helpers/change-hash.js";
import pagination from "../../helpers/pagination.js";

export function SearchEpisodes() {
	const d = document,
		$div = d.createElement("div");
	$div.classList.add("search-episodes", "episodes");

	$div.innerHTML = `  <form class="search-episode" id="search-episode">
<input type="search" name="search" placeholder="Search...">
<button class="submit-episode"><i class="fa-solid fa-magnifying-glass" ></i></button>
`;

	d.addEventListener("click", (e) => {
		if (e.target.matches(".submit-episode > i")) {
			e.preventDefault();
			console.log(e.target);
			d.getElementById("search-episode").submit();
		}
	});

	d.addEventListener("submit", (e) => {
		if (e.target.matches(".search-episode")) {
			e.preventDefault();
			pagination.episodes.page = 1;
			pagination.episodes.name = d.getElementById("search-episode").search.value;
			console.log(pagination.episodes);
			localStorage.clear("lastHash");
			changeHash();
		}
	});

	return $div;
}
