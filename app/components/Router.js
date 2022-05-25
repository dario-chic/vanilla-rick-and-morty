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
import pagination from "../helpers/pagination.js";
import {ArrowContainer} from "./ArrowContainer.js";
import {SearchEpisodes} from "./episodes/SearchEpisodes.js";
import {Episode} from "./episodes/Episode.js";

export async function Router() {
	const d = document,
		$main = d.getElementById("root");

	let {hash} = location;

	if (!hash || hash === "#/" || hash.includes("#/ID=")) {
		d.querySelector(".nav__links-home").classList.add("active");

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
		} else {
		}

		d.querySelectorAll(".home").forEach((el) => (el.style.display = ""));
	} else {
		d.querySelector(".nav__links-home").classList.remove("active");
		d.querySelectorAll(".home").forEach((el) => (el.style.display = "none"));
	}

	if (hash === "#/characters" || hash.includes("#/characters")) {
		d.querySelector(".nav__links-characters").classList.add("active");

		if (!d.querySelector(".characters")) {
			const $Characters = Container("characters"),
				$SearchForm = SearchForm(),
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
			d.querySelectorAll(".next-and-prev-buttons").forEach((el) => el.classList.add("off"));

			$CharactersLoader.classList.remove("off");
			$Characters.innerHTML = null;

			let characterPage = extractParameter(hash, "page") || 1,
				name = extractParameter(hash, "name") || "",
				gender = extractParameter(hash, "gender") || "",
				status = extractParameter(hash, "status") || "",
				filters = `?page=${characterPage}${name ? `&name=${name}` : ""}${gender ? `&gender=${gender}` : ""}${status ? `&status=${status}` : ""}`;
			const $fragment = d.createDocumentFragment();

			ajax({
				url: `https://rickandmortyapi.com/api/character/${filters}`,
				cbSuccess: (json) => {
					json.results.forEach((el) => {
						$fragment.appendChild(Character(el, "characters"));
					});

					d.querySelectorAll(".next-and-prev-buttons.characters").forEach((el) => (el.innerHTML = null));
					d.querySelectorAll(".next-and-prev-buttons.characters").forEach((el) => (el.innerHTML = Arrows(json)));
					d.querySelectorAll(".next-and-prev-buttons.characters").forEach((el) => el.classList.remove("off"));

					$CharactersLoader.classList.add("off");
					$Characters.appendChild($fragment);
				},
				cbError: (err) => {
					console.log(err);
					$main.style.minHeight = "calc(100vh - 193.55px)";
					d.querySelectorAll(".next-and-prev-buttons").forEach((el) => (el.innerHTML = null));

					let statusText = err.statusText || "An error has occurred.  ";

					$Characters.innerHTML = `
		<div class="error-container">
				<h3 class="error-message">Error: ${err.status} <br> ${statusText}</h3>
				<p>There are no results for this request or something else is going wrong</p>
				<button class="go-back">Go back</button>
				</div> 
				`;
					$CharactersLoader.classList.add("off");
				},
			});
		}

		d.querySelectorAll(".characters").forEach((el) => (el.style.display = ""));
	} else {
		d.querySelectorAll(".characters").forEach((el) => (el.style.display = "none"));
		d.querySelector(".nav__links-characters").classList.remove("active");

		pagination.character.gender = null;
		pagination.character.status = null;
		pagination.character.name = null;
		pagination.character.page = 1;
	}

	if (hash === "#/episodes" || hash.includes("#/episodes")) {
		d.querySelector(".nav__links-episodes").classList.add("active");

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

			let page = extractParameter(hash, "page") || 1,
				nombre = extractParameter(hash, "name") || "",
				episodeFilters = `?page=${page}${nombre ? `&name=${nombre}` : ""}`;
			const $fragment = document.createDocumentFragment();

			ajax({
				url: `https://rickandmortyapi.com/api/episode/${episodeFilters}`,
				cbSuccess: (json) => {
					$Episodes.innerHTML = null;

					json.results.forEach((el) => {
						let episodeAndSeason = [...el.episode.matchAll(/\d+/gi)],
							info = {season: episodeAndSeason[0][0], episode: episodeAndSeason[1][0]};

						ajax({
							url: `https://api.tvmaze.com/shows/216/episodebynumber?season=${info.season}&number=${info.episode}`,
							cbSuccess: (episode) => {
								// console.log(json);
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
								<button class="go-back">Go back</button>
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
					<button class="go-back">Go back</button>
					</div> 
					`;
					$EpisodesLoader.classList.add("off");
				},
			});
		}

		d.querySelectorAll(".episodes").forEach((el) => (el.style.display = ""));
	} else {
		d.querySelector(".nav__links-episodes").classList.remove("active");
		d.querySelectorAll(".episodes").forEach((el) => (el.style.display = "none"));

		pagination.episodes.page = 1;
		pagination.episodes.name = null;
	}

	if (hash.includes("#/") && hash !== "#/" && !hash.includes("#/ID=") && !hash.includes("#/characters") && !hash.includes("#/episodes")) {
		console.log($main);
		// $main.innerHTML = `<div class="error-container" id='bad-url'>
		// <h3 class="error-message" >ERROR</h3>
		// <p>There are no results for this request or something else is going wrong</p>
		// <button class="go-home" onclick="this.parentElement.parentElement.removeChild(document.getElementById('bad-url')); location.hash='#/'">Go Home</button>
		// </div>
		// `;

		location.hash = "#/";
	}
}
