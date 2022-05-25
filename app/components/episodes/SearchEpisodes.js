import {changeHash} from "../../helpers/change-hash.js";
import pagination from "../../helpers/pagination.js";

/* Debido a algunos inconvenientes a los que no encontré una solución optima, cree otro componente de SearchForm para la sección de Episodes, este funciona
exactamente igual que el original, pero no tiene aplicado los filtros (ya que esta sección no los usa)*/
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
			d.getElementById("search-episode").submit();
		}
	});

	d.addEventListener("submit", (e) => {
		if (e.target.matches(".search-episode")) {
			e.preventDefault();
			pagination.PAGE = 1;
			pagination.NAME = d.getElementById("search-episode").search.value;
			localStorage.clear("lastHash");
			changeHash();
		}
	});

	return $div;
}
