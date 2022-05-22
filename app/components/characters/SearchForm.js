import {changeHash} from "../../helpers/change-hash.js";
import pagination from "../../helpers/pagination.js";

export function SearchForm() {
	const d = document,
		$div = d.createElement("div");
	$div.classList.add("search-form", "characters");

	// With this Listener change the hash depending which filter was activated
	d.addEventListener("click", (e) => {
		if (e.target.matches(".filters span i")) {
			if (e.target.dataset.gender) {
				pagination.character.gender = e.target.dataset.gender;
				pagination.character.page = 1;
				changeHash();
			} else if (e.target.dataset.status) {
				pagination.character.status = e.target.dataset.status;
				pagination.character.page = 1;
				changeHash();
			}
		}

		if (e.target.matches(".search-form__filters span")) {
			d.querySelector(".filters").classList.toggle("active");
		} else d.querySelector(".filters").classList.contains("active") ? d.querySelector(".filters").classList.remove("active") : "";

		if (e.target.matches(".filters button")) {
			pagination.character.gender = null;
			pagination.character.status = null;
			pagination.character.page = 1;
			changeHash();

			d.querySelectorAll(".filters span i").forEach((el) => el.classList.remove("active"));
		}

		if (e.target.matches(".search-form__form > i")) {
			d.getElementById("search-form").submit();
		}
	});

	d.addEventListener("submit", (e) => {
		if (e.target.matches(".search-form__form")) {
			e.preventDefault();
			pagination.character.name = e.target.search.value;
			changeHash();
		}
	});

	$div.innerHTML = `
  <form class="search-form__form" id="search-form">
  <input type="search" name="search" placeholder="Search...">
  <button class="submit"><i class="fa-solid fa-magnifying-glass" ></i></button>

  <div class="search-form__filters">
  <span>Filters<i class="fa-solid fa-angle-down"></i></span>
  <div class="filters">
  <div class="triangle"></div>

  <span class="filters__gender">
  GENDER
  <i class="fa-solid fa-mars man" data-gender="male"></i> 
  <i class="fa-solid fa-venus woman" data-gender="female"></i>
  <i class="fa-solid fa-genderless genderless" data-gender="genderless"></i>
  <i class="fa-solid fa-question unknown" data-gender="unknown"></i>
  </span>

  <span class="filters__status">
  STATUS    
  <i class="fa-solid fa-skull skull" data-status="dead"></i>
  <i class="fa-solid fa-heart heart" data-status="alive"></i>
  <i class="fa-solid fa-question unknown" data-status="unknown"></i>
  </span>

  <button class="filters__reset">RESET</button>
  </div>
  </div>


  </form>

  `;
	return $div;
}
