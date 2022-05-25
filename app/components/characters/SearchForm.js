import {changeHash} from "../../helpers/change-hash.js";
import pagination from "../../helpers/pagination.js";

// Componente para crear el formulario de busqueda de la sección "Characters", y aplicación de los distintos eventos para su buen funcionamiento.
export function SearchForm(container) {
	const d = document,
		$div = d.createElement("div");
	$div.classList.add("search-form", container);

	/*Evento para controlar las acciones en el SearchForm */
	d.addEventListener("click", (e) => {
		if (e.target.matches(".search-form__filters span")) {
			//Si el click es dado en el boton de "Filters" del SearchForm: Abre y cierra ventana de filtros (Si la ventana de filtros esta abierta y se clickea otro lado de la pantalla se cierra tambien)
			d.querySelector(".filters").classList.toggle("active");
		} else d.querySelector(".filters").classList.contains("active") ? d.querySelector(".filters").classList.remove("active") : "";

		if (e.target.matches(".filters span i")) {
			//		Si el click es dado en algún icono de la ventana de filtros: Modifica los datos de la paginación en base al filtro seleccionado y aplica un ChangeHash() para recargar la url con los nuevos datos.
			localStorage.clear("lastHash");
			if (e.target.dataset.gender) {
				pagination.character.gender = e.target.dataset.gender;
				pagination.PAGE = 1;
			} else if (e.target.dataset.status) {
				pagination.character.status = e.target.dataset.status;
				pagination.PAGE = 1;
			}
			changeHash();
		}

		if (e.target.matches(".filters button")) {
			// 	Si el click es dado en el boton RESET de los filtros: Reinicia los datos de la paginacion y aplica un ChangeHash() para recargar la url sin datos
			pagination.character.gender = null;
			pagination.character.status = null;
			pagination.PAGE = 1;
			changeHash();

			d.querySelectorAll(".filters span i").forEach((el) => el.classList.remove("active"));
		}

		if (e.target.matches(".search-form__form > i")) {
			// Si el click es dado en el boton de busqueda :activa el submit del formulario.

			d.getElementById("search-form").submit();
		}
	});

	/*Submit de SearchForm : Modifica la paginación con los datos escritos en el form y aplica un ChangeHash()*/
	d.addEventListener("submit", (e) => {
		if (e.target.matches(".search-form__form")) {
			e.preventDefault();
			pagination.PAGE = 1;
			pagination.NAME = d.getElementById("search-form").search.value;
			localStorage.clear("lastHash");
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
