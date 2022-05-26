import {ajax} from "../helpers/ajax.js";
import slider from "../helpers/header-slide.js";
import {Loader} from "./Loader.js";
import {CuriositiesHeader} from "./home/CuriositiesHeader.js";
import {MainHeader} from "./home/MainHeader.js";
import {Description} from "./home/Description.js";
import {MainCharacters} from "./home/MainCharacters.js";
import {Character} from "./Character.js";
import {SearchForm} from "./characters/SearchForm.js";
import {Container} from "./Container.js";
import {Arrows} from "./Arrows.js";
import {extractParameter} from "../helpers/extract-parameter.js";
import {ArrowContainer} from "./ArrowContainer.js";
import {SearchEpisodes} from "./episodes/SearchEpisodes.js";
import {Episode} from "./episodes/Episode.js";
import pagination from "../helpers/pagination.js";

// Este es el corazón de la aplicación, esta función es la encargada de pintar la información correspondiente de las distintas secciones en base al HASH..
export async function Router() {
	let {hash} = location;

	const d = document,
		$main = d.getElementById("root");

	if (!hash || hash === "#/" || hash.includes("#/ID=")) {
		d.querySelector(".nav__links-home").classList.add("active");
		d.querySelectorAll(".home").forEach((el) => (el.style.display = ""));

		const $header = d.querySelector("header");

		if (!d.querySelector(".header__main-content")) {
			const $mainHeader = MainHeader(),
				$headerLoader = Loader("header__loader");

			$header.appendChild($mainHeader);
			$mainHeader.appendChild($headerLoader);

			ajax({
				url: "app/assets/rickandmorty.json",
				cbSuccess: (json) => {
					let html = "";

					json.curiosities.forEach((el) => (html += CuriositiesHeader(el, json.curiosities)));

					html += `
        <div class="slider-btns">
        <i class="fa-solid fa-angle-left slider-btn prev"></i>
        <i class="fa-solid fa-angle-right slider-btn next"></i></div>
        `;

					$mainHeader.innerHTML = html;
				},
				cbError: () => {},
			});
			setTimeout(() => {
				slider(".slider-btns .next", ".slider-btns .prev", ".header__main");
			}, 1000);
		} else {
		}

		if (!d.querySelector(".description")) {
			const $description = Description(),
				$descriptionLoader = Loader("description__loader");
			$description.appendChild($descriptionLoader);
			$main.appendChild($description);

			ajax({
				url: "app/assets/rickandmorty.json",
				cbSuccess: (json) => {
					$description.innerHTML = `
					<div class="description__info">
					<img src="app/assets/Rick-And-Morty-Logo.png" alt="">
					<p>${json.description.info}</p>
					</div>
					<div class="description__img"><img src="app/assets/rickandmoryprofile.jpg" alt=""></div>
					`;
				},
				cbError: () => {},
			});
		} else {
		}

		if (!d.querySelector(".main-characters")) {
			const $MainCharacters = MainCharacters("characters"),
				$Characters = d.createElement("div"),
				$mainCharactersLoader = Loader("main-characters__loader");

			$Characters.classList.add("main-characters__characters");
			$MainCharacters.appendChild($Characters);
			$MainCharacters.appendChild($mainCharactersLoader);

			$main.appendChild($MainCharacters);

			ajax({
				url: "https://rickandmortyapi.com/api/character/1,2,3,4,5",
				cbSuccess: (json) => {
					json.forEach((el) => {
						$Characters.appendChild(Character(el, "main-characters"));
					});
					$MainCharacters.removeChild($mainCharactersLoader);

					const $moreButton = d.createElement("a");
					$moreButton.classList.add("main-characters__more");
					$moreButton.href = "#/characters";
					$moreButton.innerHTML = `See More...`;
					$MainCharacters.appendChild($moreButton);
				},
				cbError: () => {},
			});
		}
	} else {
		d.querySelector(".nav__links-home").classList.remove("active");
		d.querySelectorAll(".home").forEach((el) => (el.style.display = "none"));
	}

	if (hash === "#/characters" || hash.includes("#/characters")) {
		d.querySelector(".nav__links-characters").classList.add("active");
		d.querySelectorAll(".characters").forEach((el) => (el.style.display = ""));

		if (!d.querySelector(".characters")) {
			// Este condicional verifica si ya los elementos de esta sección fueron pintados anteriormente, si no es así, los crea y los agrega y si ya existen lo ignora y pasa a lo siguiente.
			const $Characters = Container("characters"),
				$SearchForm = SearchForm("characters"),
				$CharactersLoader = Loader("main-characters__loader", "off");

			$main.appendChild($SearchForm);
			$main.appendChild($CharactersLoader);
			$main.appendChild($Characters);
			$main.appendChild(ArrowContainer("characters"));
		}
		const $Characters = d.querySelector(".container.characters"),
			$CharactersLoader = d.querySelector(".main-characters__loader");

		let lastUrl = JSON.parse(localStorage.getItem("lastHash")) || "";

		if ((!hash.includes("ID=") && !lastUrl.includes("ID=")) || lastUrl == null || $Characters.innerHTML === "" || !lastUrl.includes("#/characters")) {
			/*Este condicional a simple vista es dificil entenderlo, pero lo que hace es verificar ciertos parametros, si alguno de ellos da True, entonces entra al bloque  y actualiza y pinta de nuevo la información con los datos de los cambios dados en la URL, si todos dan false, lo ignora y todo se mantiene igual.
			
			La idea es no hacer peticiones Ajax y actualización de información innecesaria en cada cambio de Hash (es decir, volver a pintar lo que ya esta en pantalla)
			sino hacerlo solo cuando sea realmente necesaria la petición y actualización de información*/

			d.querySelectorAll(".next-and-prev-buttons").forEach((el) => el.classList.add("off"));

			$CharactersLoader.classList.remove("off");
			$Characters.innerHTML = null;

			const $fragment = d.createDocumentFragment();
			ajax({
				url: `https://rickandmortyapi.com/api/character/${pagination.FILTER}`,
				cbSuccess: (json) => {
					json.results.forEach((el) => {
						$fragment.appendChild(Character(el, "characters"));
					});

					d.querySelector(".next-and-prev-buttons.characters").innerHTML = null;
					d.querySelector(".next-and-prev-buttons.characters").innerHTML = Arrows(json);
					d.querySelector(".next-and-prev-buttons.characters").classList.remove("off");

					$CharactersLoader.classList.add("off");
					$Characters.appendChild($fragment);
				},
				cbError: (err) => {
					$main.style.minHeight = "calc(100vh - 193.55px)";
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$Characters.innerHTML = `
		<div class="error-container">
				<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
				<p>There are no results for this request or something else is going wrong</p>
				<button class="go-back">Go back</button><br><button class="go-home" onclick="window.location.reload()" >Reload</button>
				</div> 
				`;
					$CharactersLoader.classList.add("off");
				},
			});
		}
	} else {
		d.querySelectorAll(".characters").forEach((el) => (el.style.display = "none"));
		d.querySelector(".nav__links-characters").classList.remove("active");
	}

	if (hash === "#/episodes" || hash.includes("#/episodes")) {
		/*Este condicional funciona exactamente igual que el de characters */
		d.querySelector(".nav__links-episodes").classList.add("active");
		d.querySelectorAll(".episodes").forEach((el) => (el.style.display = ""));

		if (!d.querySelector(".episodes")) {
			const $Episodes = Container("episodes"),
				$SearchEpisodes = SearchEpisodes(),
				$EpisodesLoader = Loader("main-episodes__loader", "off");
			$EpisodesLoader.classList.add("off");

			$main.appendChild($SearchEpisodes);
			$main.appendChild($EpisodesLoader);
			$main.appendChild($Episodes);
			$main.appendChild(ArrowContainer("episodes"));
		}
		const $Episodes = d.querySelector(".container.episodes"),
			$EpisodesLoader = d.querySelector(".main-episodes__loader");

		let lastUrl = JSON.parse(localStorage.getItem("lastHash")) || "";

		if ((!hash.includes("ID=") && !lastUrl.includes("ID=")) || lastUrl == null || $Episodes.innerHTML === "" || !lastUrl.includes("#/episodes")) {
			d.querySelectorAll(".next-and-prev-buttons").forEach((el) => el.classList.add("off"));

			$Episodes.innerHTML = null;
			$EpisodesLoader.classList.remove("off");

			const $fragment = document.createDocumentFragment();

			ajax({
				url: `https://rickandmortyapi.com/api/episode/${pagination.FILTER}`,
				cbSuccess: (json) => {
					$Episodes.innerHTML = null;

					json.results.forEach((el) => {
						let episodeAndSeason = [...el.episode.matchAll(/\d+/gi)],
							info = {season: episodeAndSeason[0][0], episode: episodeAndSeason[1][0]};

						ajax({
							url: `https://api.tvmaze.com/shows/216/episodebynumber?season=${info.season}&number=${info.episode}`,
							cbSuccess: (episode) => {
								$fragment.appendChild(Episode(episode, "episodes"));
								if (el === json.results[json.results.length - 1]) {
									$Episodes.appendChild($fragment);
									$EpisodesLoader.classList.add("off");
								}
							},
							cbError: (err) => {
								console.log(err);
								$main.style.minHeight = "calc(100vh - 193.55px)";
								d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

								let statusText = err.statusText || "An error has occurred.  ";

								$Episodes.innerHTML = `
						<div class="error-container">
								<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
								<p>There are no results for this request or something else is going wrong</p>
								<button class="go-back">Go back</button><br><button class="go-home" onclick="window.location.reload()" >Reload</button>
								</div> 
								`;
								$EpisodesLoader.classList.add("off");
							},
						});
					});

					d.querySelector(".next-and-prev-buttons.episodes").innerHTML = null;
					d.querySelector(".next-and-prev-buttons.episodes").innerHTML = Arrows(json);
					d.querySelector(".next-and-prev-buttons.episodes").classList.remove("off");
				},
				cbError: (err) => {
					console.log(err);
					$main.style.minHeight = "calc(100vh - 193.55px)";
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$Episodes.innerHTML = `
			<div class="error-container">
					<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
					<p>There are no results for this request or something else is going wrong</p>
					<button class="go-back">Go back</button><br><button class="go-home" onclick="window.location.reload()" >Reload</button>
					</div> 
					`;
					$EpisodesLoader.classList.add("off");
				},
			});
		}
	} else {
		d.querySelector(".nav__links-episodes").classList.remove("active");
		d.querySelectorAll(".episodes").forEach((el) => (el.style.display = "none"));
	}

	if (hash.includes("#/") && hash !== "#/" && !hash.includes("#/ID=") && !hash.includes("#/characters") && !hash.includes("#/episodes")) {
		console.log($main);
		$main.innerHTML = `<div class="error-container" id='bad-url'>
		<h3 class="error-message" >ERROR</h3>
		<p>There are no results for this request or something else is going wrong</p>
		<button class="go-home" onclick="this.parentElement.parentElement.removeChild(document.getElementById('bad-url')); location.hash='#/'">Go Home</button>
		</div>
		`;

		location.hash = "#/";
	}
}
